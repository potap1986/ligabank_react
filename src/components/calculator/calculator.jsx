import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import './calculator.scss'
import { KeyFormDates } from '../../const'
import { customStyles } from '../../styles'

const creditOptions = [
  {
    title: "Ипотека",
    sum: {
      name: "Стоимость недвижимости",
      min: 1200000,
      max: 25000000,
      step: 100000
    },
    percent: {
      min: 10,
      step: 5
    },
    credit: {
      min: 500000
    },
    term: {
      min: 5,
      max: 30,
      step: 1
    },
    checkboxes: [
      {
        checked: false,
        name: "Использование материнского капитала",
        sum: 470000
      }
    ],
    interest_rate: 9.4,
    percent_income: 45,
    text1: "ипотеки",
    text2: "ипотечные "
  },
  {
    title: "Автокредит",
    sum: {
      name: "Стоимость автомобиля",
      min: 500000,
      max: 5000000,
      step: 50000
    },
    percent: {
      min: 20,
      step: 5
    },
    credit: {
      min: 200000
    },
    term: {
      min: 1,
      max: 5,
      step: 1
    },
    checkboxes: [
      {
        checked: false,
        name: "Оформить КАСКО в нашем банке",
        sum: 470000
      },
      {
        checked: false,
        name: "Оформить Страхование жизни в нашем банке",
        sum: 470000
      }
    ],
    interest_rate: 9.4,
    percent_income: 45,
    text1: "автокредита",
    text2: "авто"
  },
]

const options = [
  { value: 'mortgage', label: 'Ипотечное кредитование', id: 0 },
  { value: 'car_loan', label: 'Автомобильное кредитование', id: 1 },
]

const Calculator = () => {  
  const dates = Object.entries(KeyFormDates)
  const [selectedOption, setSelectedOption] = useState(null)
  const [visibleSectionThree, setVisibleThree] = useState(false)
  const [form, changeForm] = useState({  
    id: 10,
    purpose: "",
    sum: 2000000,
    contribution: 200000,
    percent: null,
    term: null,
    discount: null
  })

  const [proposal, changeProposal] = useState({
    loan_amount: null,
    interest_rate: null,
    monthly_payment: null,
    required_income: null
  })

  //useEffect(() => {calculateProposal(selectedOption.id)}, [form])

  const calculateProposal = (id) => {
    if (selectedOption) {      
      const loan_amount = form.sum - form.contribution - +form.discount * creditOptions[id].checkboxes[0].sum
      const persent_mounth = creditOptions[id].interest_rate / (12 * 100)
      const periods = form.term * 12
      const monthly_payment = loan_amount * (persent_mounth + persent_mounth / (Math.pow(1 + persent_mounth, periods) - 1))
      const required_income = monthly_payment * 100 / creditOptions[id].percent_income 
      console.log(form.term)
      changeProposal({
        ...proposal,      
        loan_amount: loan_amount,
        interest_rate: creditOptions[id].interest_rate,
        monthly_payment: Math.round(monthly_payment),
        required_income: Math.round(required_income)
      })
    }
  }

  const handleSelectedOption = (evt) => {
    setSelectedOption(evt)
    changeForm({
      ...form,
      purpose: creditOptions[evt.id].title,
      percent: creditOptions[evt.id].percent.min,      
      contribution: (form.sum * creditOptions[evt.id].percent.min / 100),
      term: creditOptions[evt.id].term.min,
      discount: creditOptions[evt.id].checkboxes[0].checked
    })
    calculateProposal(evt.id)
  }

  const handleSumChange = (evt) => {
    evt.preventDefault()
    changeForm({
      ...form,
      sum: evt.target.value,      
      contribution: (evt.target.value * form.percent / 100) 
    })
    calculateProposal(selectedOption.id)
  }

  const handleContributionChange = (evt) => {
    evt.preventDefault()
    changeForm({
      ...form,
      contribution: evt.target.value
    })
    calculateProposal(selectedOption.id)
  }

  const handlePercentChange = (evt) => {
    evt.preventDefault()
    changeForm({
      ...form,
      percent: evt.target.value,
      contribution: (form.sum * evt.target.value / 100) 
    })
    calculateProposal(selectedOption.id)
  }

  const handleTermChange = (evt) => {
    evt.preventDefault()
    changeForm({
      ...form,
      term: evt.target.value
    })
    calculateProposal(selectedOption.id)
  }

  const handleDiscountChange = () => {
    changeForm(prevForm => ({
      ...prevForm,
      discount: !prevForm.discount
    }))
    calculateProposal(selectedOption.id)
  }
  console.log(proposal)

  return (
    <div className="calculator">
      <div className="container">
        <h2 className="calculator__title">Кредитный калькулятор</h2>
        <form action="#" method="post"  className="calculator__form">
          <div className="calculator__partition">            
            <div className="calculator__section calculator__section--one">
              <h3 className="calculator__section-name">Шаг 1. Цель кредита</h3>
              <Select                
                classNamePrefix="calculator__select"
                styles={customStyles}
                placeholder="Выберите цель кредита"
                defaultValue={selectedOption}
                onChange={handleSelectedOption}
                options={options}
              />
            </div>
            {selectedOption 
              ? <div className="calculator__section calculator__section--two">
                <h3 className="calculator__section-name">Шаг 2. Введите параметры кредита</h3>
                <div className="calculator__sum">
                  <label className="calculator__label" htmlFor="sum">{creditOptions[selectedOption.id].sum.name}</label>
                  <div className="calculator__sum">       
                    <svg className="calculator__svg calculator__svg--minus" width="16" height="2">
                      <use xlinkHref="#minus"/>
                    </svg>
                    <input className="calculator__input" id="sum" name="sum" type="number" value={form.sum} min={creditOptions[selectedOption.id].sum.min} max={creditOptions[selectedOption.id].sum.max}  onChange={handleSumChange} />       
                    <svg className="calculator__svg calculator__svg--plus" width="16" height="16">
                      <use xlinkHref="#plus"/>
                    </svg>
                  </div>
                  <span className="calculator__text-small">От {creditOptions[selectedOption.id].sum.min} до {creditOptions[selectedOption.id].sum.max} рублей</span>
                </div>
                <div className="calculator_contribution">
                  <label className="calculator__label" htmlFor="contribution">Первоначальный взнос</label>
                  <input className="calculator__input" id="contribution" name="contribution" type="number" value={form.contribution}  onChange={handleContributionChange} />
                  <input className="calculator__input calculator__input--range" id="contribution-range" name="contribution-range" type="range" min={creditOptions[selectedOption.id].percent.min} max="100" step={creditOptions[selectedOption.id].percent.step} value={form.percent}  onChange={handlePercentChange} />
                  <span className="calculator__text-small">{creditOptions[selectedOption.id].percent.min}%</span>
                </div>
                <div className="calculator_years">
                  <label className="calculator__label" htmlFor="years">Срок кредитования</label>
                  <input className="calculator__input" id="years" name="years" type="number" value={form.term}  min={creditOptions[selectedOption.id].term.min} max={creditOptions[selectedOption.id].term.max}  onChange={handleTermChange} />
                  <input className="calculator__input calculator__input--range" id="years-range" name="years-range" type="range" min={creditOptions[selectedOption.id].term.min} max={creditOptions[selectedOption.id].term.max} step={creditOptions[selectedOption.id].term.step} value={form.term}  onChange={handleTermChange} />
                  <div>
                    <span className="calculator__text-small">{creditOptions[selectedOption.id].term.min} лет</span>                  
                    <span className="calculator__text-small">{creditOptions[selectedOption.id].term.max} лет</span>
                  </div>
                </div>
                <div>
                  <input className="calculator__checkbox visually-hidden" type="checkbox"  id="discount" name="discount" checked={form.discount} onChange={handleDiscountChange} />
                  <label className="calculator__label calculator__label--checkbox" htmlFor="discount">Использовать материнский капитал</label>
                </div>
              </div>
              : " "
            }
          </div>
          {selectedOption
            ? <div  className="calculator__section calculator__section--proposal">
              { form.sum >= creditOptions[selectedOption.id].credit.min ? 
                <>                
                  <h3 className="calculator__section-name calculator__section-name--proposal">
                    Наше предложение
                  </h3>
                  <div className="calculator__proposal">
                    <div>
                      <p className="calculator__text-bold">{proposal.loan_amount}</p>
                      <span className="calculator__label">Сумма {creditOptions[selectedOption.id].text1}</span>
                    </div>
                    <div>
                      <p className="calculator__text-bold">{proposal.interest_rate}</p>
                      <span className="calculator__label">Процентная ставка</span>
                    </div>
                    <div>
                      <p className="calculator__text-bold">{proposal.monthly_payment}</p>
                      <span className="calculator__label">Ежемесячный платеж</span>
                    </div>
                    <div>
                      <p className="calculator__text-bold">{proposal.required_income}</p>
                      <span className="calculator__label">Необходимый доход</span>
                    </div>
                  </div>
                  <button
                    className="calculator__button calculator__button--proposal"
                    onClick={(evt) => {
                      evt.preventDefault()
                      setVisibleThree(true)}}
                  >
                    Оформить заявку
                  </button>
                </>
                :
                <>                
                  <h3 className="calculator__section-name calculator__section-name--no-credit">
                    Наш банк не выдаёт {creditOptions[selectedOption.id].text2}кредиты меньше {creditOptions[selectedOption.id].credit.min} рублей.
                  </h3>
                  <p className="calculator__label calculator__label--no-credit">
                    Попробуйте использовать другие параметры&nbsp;для&nbsp;расчёта.
                  </p>                   
                </>
              }
            </div>
            : " "          
          }
          {visibleSectionThree
            ? <div className="calculator__section calculator__section--three">
              <h3 className="calculator__section-name calculator__section-name--three">Шаг 3. Оформление заявки</h3>
              <ul className="calculator__dates">              
                {dates.map(([keys, value], index) => (
                  <li
                    className="calculator__date"
                    key={keys + index}
                  >
                    <p className="calculator__label calculator__label--date">{value}</p>
                    <span className="calculator__text-bold">{form[keys.toLowerCase()]}</span>
                  </li>
                ))}     
              </ul>
              <div className="calculator__personal-card">
                <label className="visually-hidden" htmlFor="name">Фамилия Имя Отчество</label>
                <input className="calculator__personal" id="name" name="name" type="text" placeholder="ФИО" />
                <label className="visually-hidden" htmlFor="phone">Телефон</label>
                <input className="calculator__personal" id="phone" name="phone" type="tel" placeholder="Телефон" />
                <label className="visually-hidden" htmlFor="email">E-mail</label>
                <input className="calculator__personal" id="email" name="email" type="email" placeholder="E-mail" />
              </div>
              <button className="calculator__button">Отправить</button>
            </div>
            : " "
          }
        </form>
      </div>
    </div>
  )
}

export default Calculator