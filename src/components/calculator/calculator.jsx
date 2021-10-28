import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import './calculator.scss'
import { KeyFormDates } from '../../const'
import { customStyles } from '../../styles'
import PropTypes from "prop-types"
import { connect } from 'react-redux'
import ActionCreator from '../../store/actions'
import { formatedNumber, prependZeros } from '../../utils'

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
    interest_rate1: 9.4,   
    interest_rate2: 8.4,
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
    interest_rate1: 16,    
    interest_rate2: 15,
    interest_rate3: 8.5,    
    interest_rate4: 3.5,
    percent_income: 45,
    text1: "автокредита",
    text2: "авто"
  },
]

const options = [
  { value: 'mortgage', label: 'Ипотечное кредитование', id: 0 },
  { value: 'car_loan', label: 'Автомобильное кредитование', id: 1 },
]

const Calculator = (props) => {  
  const dates = Object.entries(KeyFormDates)
  const [selectedOption, setSelectedOption] = useState(null)
  const [visibleSectionThree, setVisibleThree] = useState(false)
  const [form, changeForm] = useState({  
    id: prependZeros(10),
    purpose: "",
    sum: 2000000,
    contribution: 200000,
    percent: null,
    term: null,
    discount1: false,
    discount2: false,
  })

  const [proposal, changeProposal] = useState({
    loan_amount: null,
    interest_rate: null,
    monthly_payment: null,
    required_income: null
  })

  const [personal_data, changePersonalData] = useState({
    name: localStorage.getItem('name') ? localStorage.getItem('name') : '',
    phone: localStorage.getItem('phone') ? localStorage.getItem('phone') : '',
    email: localStorage.getItem('email') ? localStorage.getItem('email') : '',
  })

  //useEffect(() => {calculateProposal(selectedOption.id)}, [form])
   
  const handleNameChange = (evt) => {
    evt.preventDefault()   
    changePersonalData({
      ...personal_data,
      name: evt.target.value 
    })
  }
  
  const handlePhoneChange = (evt) => {
    evt.preventDefault()   
    changePersonalData({
      ...personal_data,
      phone: evt.target.value 
    })
  }

  const handleEmailChange = (evt) => {
    evt.preventDefault()   
    changePersonalData({
      ...personal_data,
      email: evt.target.value 
    })
  }
  
  const setLocalStorage = () => {
    localStorage.setItem('name', personal_data.name)
    localStorage.setItem('phone', personal_data.phone)
    localStorage.setItem('email', personal_data.email)
  }

  const calculateProposal = (id) => {
    if (selectedOption) {      
      const loan_amount = form.sum - form.contribution - (id === 0 ? +form.discount1 * creditOptions[id].checkboxes[0].sum : 0)
      let interest_rate = null
      console.log(form.percent)
      id === 0 
      ? (form.percent < 15
      ? interest_rate = creditOptions[id].interest_rate1
      : interest_rate = creditOptions[id].interest_rate2)
      : form.discount1 && form.discount2
      ? interest_rate = creditOptions[id].interest_rate4
      : form.discount1 || form.discount2
      ? interest_rate = creditOptions[id].interest_rate3
      : form.sum >= 2000000 
      ? interest_rate = creditOptions[id].interest_rate2
      : interest_rate = creditOptions[id].interest_rate1      
      const percent_mounth = interest_rate / (12 * 100)
      const periods = form.term * 12
      const monthly_payment = loan_amount * (percent_mounth + percent_mounth / (Math.pow(1 + percent_mounth, periods) - 1))
      const required_income = monthly_payment * 100 / creditOptions[id].percent_income 
      console.log(form.term)
      changeProposal({
        ...proposal,      
        loan_amount: loan_amount,
        interest_rate: interest_rate,
        monthly_payment: Math.round(monthly_payment),
        required_income: Math.round(required_income),
      })
    }
  }

  const handleSelectedOption = (evt) => {
    return Promise.resolve()
      .then(setSelectedOption(evt))
      .then(changeForm({
        ...form,
        purpose: creditOptions[evt.id].title,
        percent: creditOptions[evt.id].percent.min,      
        contribution: (form.sum * creditOptions[evt.id].percent.min / 100),
        term: creditOptions[evt.id].term.min,
        discount1: creditOptions[evt.id].checkboxes[0].checked,        
      }))
      .then(() => console.log(evt))
      .then(calculateProposal(evt.id));
  }

  const handleSumChange = (evt) => {
    evt.preventDefault()
    const sum = Number(evt.target.value.replace(/[a-zа-яё\s]/gi, ''))
    if(sum >= creditOptions[selectedOption.id].sum.min && sum <= creditOptions[selectedOption.id].sum.max) {
      evt.target.classList.remove('calculator__input--error')
    } else {
      evt.target.classList.add('calculator__input--error')
    }
    changeForm({
      ...form,
      sum: sum,      
      contribution: (sum * form.percent / 100) 
    })
    calculateProposal(selectedOption.id) 
  }

  const handleSumVary = (evt) => {
    evt.preventDefault()
    const input_sum = document.querySelector('.calculator__input--sum')
    const sum = form.sum + (evt.target.id === "plus" ? +1 : -1) * creditOptions[selectedOption.id].sum.step
    if(sum >= creditOptions[selectedOption.id].sum.min && sum <= creditOptions[selectedOption.id].sum.max) {
      input_sum.classList.remove('calculator__input--error')
    } else {
      input_sum.classList.add('calculator__input--error')
    }
    changeForm({
      ...form,
      sum: sum,
      contribution: (sum * form.percent / 100) 
    })
    calculateProposal(selectedOption.id)
  }

  const handleContributionChange = (evt) => {
    evt.preventDefault()
    const contribution = Number(evt.target.value.replace(/[a-zа-яё\s]/gi, ''))
    if(contribution >= (creditOptions[selectedOption.id].sum.min * form.percent / 100) && contribution <= (creditOptions[selectedOption.id].sum.max * form.percent / 100)) {
      evt.target.classList.remove('calculator__input--error')
    } else {
      evt.target.classList.add('calculator__input--error')
    }
    changeForm({
      ...form,
      contribution: contribution,
      percent: (contribution * 100 / form.sum)
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
    var term = Number(evt.target.value.replace(/[a-zа-яё\s]/gi, ''))
    changeForm({
      ...form,
      term: term
    })
    calculateProposal(selectedOption.id)
  }

  const handleTermOut = (evt) => {
    evt.preventDefault()   
    var term = form.term
    if(term < creditOptions[selectedOption.id].term.min) {
      term = creditOptions[selectedOption.id].term.min
    } else if (term > creditOptions[selectedOption.id].term.max) {
      term = creditOptions[selectedOption.id].term.max
    }
    changeForm({
      ...form,
      term: term
    })
    calculateProposal(selectedOption.id)
  }
  
  const handleDiscount1Change = () => {
    changeForm(prevForm => ({
      ...prevForm,
      discount1: !prevForm.discount1
    }))
    calculateProposal(selectedOption.id)
  }

  const handleDiscount2Change = () => {
    changeForm(prevForm => ({
      ...prevForm,
      discount2: !prevForm.discount2
    }))
    calculateProposal(selectedOption.id)
  }

  const handleSendForm = (evt) => {
    evt.preventDefault() 
    const nameInput = document.querySelector('.calculator__personal--name')
    const phoneInput = document.querySelector('.calculator__personal--phone')
    const emailInput = document.querySelector('.calculator__personal--email')
    if (personal_data.name.trim() === '') {
      nameInput.classList.add('calculator__personal--error')
    } else {
      nameInput.classList.remove('calculator__personal--error')
    }

    if (personal_data.phone.trim() === '') {
      phoneInput.classList.add('calculator__personal--error')
    } else {
      phoneInput.classList.remove('calculator__personal--error')
    }

    if (personal_data.email.trim() === '') {
      emailInput.classList.add('calculator__personal--error')
    } else {
      emailInput.classList.remove('calculator__personal--error')
    }

    if ((personal_data.email.trim() !== '') && (personal_data.phone.trim() !== '') && (personal_data.name.trim() !== '')) {
      setLocalStorage()
      props.onPopupInfoOpen()
    }
  }
  console.log(String(form.sum).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, '$1 '))

  return (
    <div className="calculator">
      <div className="container">
        <h2 id="calculator" className="calculator__title">Кредитный калькулятор</h2>
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
                    <button  
                      className="calculator__svg calculator__svg--minus" 
                      id="minus" 
                      aria-label="Минус" 
                      onClick={handleSumVary}>                      
                    </button>
                    <input 
                      className="calculator__input calculator__input--sum" id="sum" name="sum" type="text" value={formatedNumber(form.sum) + " рублей"} 
                      min={creditOptions[selectedOption.id].sum.min} 
                      max={creditOptions[selectedOption.id].sum.max} 
                      onChange={handleSumChange} />       
                    <button 
                      className="calculator__svg calculator__svg--plus" 
                      id="plus"  
                      aria-label="Плюс" 
                      onClick={handleSumVary}>
                    </button>
                  </div>
                  <span className="calculator__text-small">От {creditOptions[selectedOption.id].sum.min} до {creditOptions[selectedOption.id].sum.max} рублей</span>
                </div>
                <div className="calculator_contribution">
                  <label className="calculator__label" htmlFor="contribution">Первоначальный взнос</label>
                  <input className="calculator__input" id="contribution" name="contribution" type="text" value={formatedNumber(form.contribution) + " рублей"}  onChange={handleContributionChange} />
                  <input className="calculator__input calculator__input--range" id="contribution-range" name="contribution-range" type="range" min={creditOptions[selectedOption.id].percent.min} max="100" step={creditOptions[selectedOption.id].percent.step} value={form.percent}  onChange={handlePercentChange} />
                  <span className="calculator__text-small">{creditOptions[selectedOption.id].percent.min}%</span>
                </div>
                <div className="calculator_years">
                  <label className="calculator__label" htmlFor="years">Срок кредитования</label>
                  <input className="calculator__input" id="years" name="years" type="text" value={form.term + " лет"}  min={creditOptions[selectedOption.id].term.min} max={creditOptions[selectedOption.id].term.max}  onChange={handleTermChange} onBlur={handleTermOut} />
                  <input className="calculator__input calculator__input--range" id="years-range" name="years-range" type="range" min={creditOptions[selectedOption.id].term.min} max={creditOptions[selectedOption.id].term.max} step={creditOptions[selectedOption.id].term.step} value={form.term}  onChange={handleTermChange} />
                  <div>
                    <span className="calculator__text-small">{creditOptions[selectedOption.id].term.min} лет</span>                  
                    <span className="calculator__text-small">{creditOptions[selectedOption.id].term.max} лет</span>
                  </div>
                </div>
                <div>
                  <input className="calculator__checkbox visually-hidden" type="checkbox"  id="discount1" name="discount1" checked={form.discount1} onChange={handleDiscount1Change} />
                  <label className="calculator__label calculator__label--checkbox" htmlFor="discount1">{creditOptions[selectedOption.id].checkboxes[0].name}</label>
                  { selectedOption.id === 1 
                  ? <>
                      <input className="calculator__checkbox visually-hidden" type="checkbox"  id="discount2" name="discount2" checked={form.discount2} onChange={handleDiscount2Change} />
                      <label className="calculator__label calculator__label--checkbox" htmlFor="discount2">{creditOptions[selectedOption.id].checkboxes[1].name}</label>
                    </>
                  : " "
                  }
                </div>
              </div>
              : " "
            }
          </div>
          {selectedOption
            ? <div  className="calculator__section calculator__section--proposal">
              {proposal.loan_amount >= creditOptions[selectedOption.id].credit.min ? 
                <>                
                  <h3 className="calculator__section-name calculator__section-name--proposal">
                    Наше предложение
                  </h3>
                  <div className="calculator__proposal">
                    <div>
                      <p className="calculator__text-bold">{formatedNumber(proposal.loan_amount) + " рублей"}</p>
                      <span className="calculator__label">Сумма {creditOptions[selectedOption.id].text1}</span>
                    </div>
                    <div>
                      <p className="calculator__text-bold">{proposal.interest_rate + " %"}</p>
                      <span className="calculator__label">Процентная ставка</span>
                    </div>
                    <div>
                      <p className="calculator__text-bold">{formatedNumber(proposal.monthly_payment) + " рублей"}</p>
                      <span className="calculator__label">Ежемесячный платеж</span>
                    </div>
                    <div>
                      <p className="calculator__text-bold">{formatedNumber(proposal.required_income) + " рублей"}</p>
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
                    Наш банк не выдаёт {creditOptions[selectedOption.id].text2}кредиты меньше {formatedNumber(creditOptions[selectedOption.id].credit.min)} рублей.
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
                    <span className="calculator__text-bold">{formatedNumber(form[keys.toLowerCase()])}</span>
                  </li>
                ))}     
              </ul>
              <div className="calculator__personal-card">
                <label className="visually-hidden" htmlFor="name">Фамилия Имя Отчество</label>
                <input className="calculator__personal calculator__personal--name" id="name" name="name" type="text" placeholder="ФИО" value={personal_data.name} onChange={handleNameChange} />
                <label className="visually-hidden" htmlFor="phone">Телефон</label>
                <input className="calculator__personal calculator__personal--phone" id="phone" name="phone" type="tel" placeholder="Телефон" value={personal_data.phone} onChange={handlePhoneChange} />
                <label className="visually-hidden" htmlFor="email">E-mail</label>
                <input className="calculator__personal calculator__personal--email" id="email" name="email" type="email" placeholder="E-mail" value={personal_data.email} onChange={handleEmailChange} />
              </div>
              <button 
                className="calculator__button" 
                onClick={handleSendForm}>
                Отправить
              </button>
            </div>
            : " "
          }
        </form>
      </div>
    </div>
  )
}


Calculator.propTypes = {
  visibleInfo: PropTypes.bool.isRequired,
  onPopupInfoOpen: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
	return {
		visibleInfo: state.isPopupInfoVisible
	}
};

const mapDispatchToProps = (dispatch) => ({
  onPopupInfoOpen: () => {
    dispatch(ActionCreator.openPopupInfo());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Calculator)