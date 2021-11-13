import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import './calculator.scss'
import { AmountLength, KeyFormDates, MONTH_IN_YEAR, PERCENT_LIMIT, PHONE_LENGTH } from '../../const'
import { customStyles } from '../../styles'
import PropTypes from "prop-types"
import { IMaskInput } from 'react-imask'
import { connect } from 'react-redux'
import ActionCreator from '../../store/actions'
import { formatedNumber, prependZeros, pluralize } from '../../utils'

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
        name: "Использовать материнский капитал",
        sum: 470000
      }
    ],
    interestRate1: 9.4,   
    interestRate2: 8.4,
    percentIncome: 45,
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
    threshold: 2000000, 
    interestRate1: 16,    
    interestRate2: 15,
    interestRate3: 8.5,    
    interestRate4: 3.5,
    percentIncome: 45,
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
    id: 10,
    purpose: "",
    sum: 2000000,
    contribution: 200000,
    percent: null,
    term: null,
    discount1: false,
    discount2: false,
    selectedOption: 0
  })

  const [proposal, changeProposal] = useState({
    loanAmount: null,
    interestRate: null,
    monthlyPayment: null,
    requiredIncome: null
  })

  const [personalData, changePersonalData] = useState({
    name: localStorage.getItem('name') ? localStorage.getItem('name') : '',
    phone: localStorage.getItem('phone') ? localStorage.getItem('phone') : '',
    email: localStorage.getItem('email') ? localStorage.getItem('email') : '',
  })

  useEffect(() => {
    const calculateProposal = (form) => {   
      const id = form.selectedOption
      const loanAmount = form.sum - form.contribution - (id === 0 ? +form.discount1 * creditOptions[id].checkboxes[0].sum : 0)
      let interestRate = null
      id === 0 
      ? (form.percent < PERCENT_LIMIT
      ? interestRate = creditOptions[id].interestRate1
      : interestRate = creditOptions[id].interestRate2)
      : form.discount1 && form.discount2
      ? interestRate = creditOptions[id].interestRate4
      : form.discount1 || form.discount2
      ? interestRate = creditOptions[id].interestRate3
      : form.sum >= creditOptions[1].threshold
      ? interestRate = creditOptions[id].interestRate2
      : interestRate = creditOptions[id].interestRate1      
      const percentMounth = interestRate / (MONTH_IN_YEAR * 100)
      const periods = form.term * MONTH_IN_YEAR
      const monthlyPayment = loanAmount * (percentMounth + percentMounth / (Math.pow(1 + percentMounth, periods) - 1))
      const requiredIncome = monthlyPayment * 100 / creditOptions[id].percentIncome 
      changeProposal((prevProposal) => ({
        ...prevProposal,      
        loanAmount: loanAmount,
        interestRate: interestRate,
        monthlyPayment: (monthlyPayment),
        requiredIncome: (requiredIncome),
      }))
    }
  
    calculateProposal(form)}, 
    [form]
  )
  
  const handleNameChange = (evt) => {
    evt.preventDefault()   
    const nameInput = document.querySelector('.calculator__personal--name')
    if (personalData.name.trim() !== '') {
      nameInput.classList.remove('calculator__personal--error')
    } 
    changePersonalData({
      ...personalData,
      name: evt.target.value 
    })
  }
  
  const handlePhoneChange = (evt) => {
    const phoneInput = document.querySelector('.calculator__personal--phone')
    if (personalData.phone.trim() === '') {
      phoneInput.classList.remove('calculator__personal--error')
    }
    changePersonalData({
      ...personalData,
      phone: evt
    })
  }

  const handleEmailChange = (evt) => {
    evt.preventDefault()   
    const emailInput = document.querySelector('.calculator__personal--email')
    if (personalData.email.trim() === '') {
      emailInput.classList.remove('calculator__personal--error')
    }
    changePersonalData({
      ...personalData,
      email: evt.target.value 
    })
  }
  
  const setLocalStorage = () => {
    localStorage.setItem('name', personalData.name)
    localStorage.setItem('phone', personalData.phone)
    localStorage.setItem('email', personalData.email)
  }

  const handleSelectedOption = (evt) => {
    setSelectedOption(evt)
    changeForm({
      ...form,
      purpose: creditOptions[evt.id].title,
      percent: creditOptions[evt.id].percent.min,      
      contribution: (form.sum * creditOptions[evt.id].percent.min / 100),
      term: creditOptions[evt.id].term.min,
      discount1: creditOptions[evt.id].checkboxes[0].checked,
      selectedOption: evt.id
    })
  }

  const handleSumChange = (value, mask) => {
    let sum = value;
    const inputWrapper = mask.el.input.closest('.calculator__input');
    if(sum >= creditOptions[selectedOption.id].sum.min && sum <= creditOptions[selectedOption.id].sum.max) {
      inputWrapper.classList.remove('calculator__input--error')
    } else {
      inputWrapper.classList.add('calculator__input--error')
      if (sum.toString().length > AmountLength.MAX) {
        sum = +sum.toString().substring(0, AmountLength.MAX); 
      } 
      if (sum.toString().length < AmountLength.MIN) {
        sum = form.sum 
      } 
    }
    changeForm({
      ...form,
      sum: sum,      
      contribution:  Math.round(sum * form.percent / 100) 
    })
  }

  
  const handleSumOut = () => {
    let sum = form.sum
    if(sum < creditOptions[selectedOption.id].sum.min) {
      sum = creditOptions[selectedOption.id].sum.min
    } 
    if(sum > creditOptions[selectedOption.id].sum.max) {
      sum = creditOptions[selectedOption.id].sum.max
    }
    changeForm({
      ...form,
      sum: sum,      
      contribution:  Math.round(sum * form.percent / 100) 
    })
  }

  const handleSumVary = (evt) => {
    evt.preventDefault()
    const inputSum = document.querySelector('.calculator__input--sum')
    let sum = +form.sum + (evt.target.id === "plus" ? 1 : -1) * creditOptions[selectedOption.id].sum.step
    if(sum >= creditOptions[selectedOption.id].sum.min && sum <= creditOptions[selectedOption.id].sum.max) {
      inputSum.classList.remove('calculator__input--error')
    } else {
      if (sum < creditOptions[selectedOption.id].sum.min) {
        sum = creditOptions[selectedOption.id].sum.min
      } else {
        sum = creditOptions[selectedOption.id].sum.max
      }
    }
    changeForm({
      ...form,
      sum: sum,
      contribution:  Math.round(sum * form.percent / 100) 
    })
  }

  const handleContributionChange = (value, mask) => {
    let contribution = value;
    const inputWrapper = mask.el.input.closest('.calculator__input');
    if(contribution >= (form.sum * creditOptions[selectedOption.id].percent.min / 100) && contribution <= (form.sum - creditOptions[selectedOption.id].credit.min)) {
      inputWrapper.classList.remove('calculator__input--error')
    } else {
      inputWrapper.classList.add('calculator__input--error')
    }
    changeForm({
      ...form,
      contribution: contribution,
      percent: (contribution * 100 / form.sum)
    })
  }

  const handleContributionOut = () => {
    let contribution = form.contribution
    if(contribution < (form.sum * creditOptions[selectedOption.id].percent.min / 100)) {
      contribution = (form.sum * creditOptions[selectedOption.id].percent.min / 100)
    } 
    if(contribution > (form.sum - creditOptions[selectedOption.id].credit.min)) {
      contribution = (form.sum - creditOptions[selectedOption.id].credit.min)
    }
    changeForm({
      ...form,
      contribution: Math.round(contribution),
      percent: (contribution * 100 / form.sum)
    })
  }

  const handlePercentChange = (evt) => {
    const contribution = Math.round(form.sum * evt.target.value / 100) 
    const inputContribution = document.querySelector('.calculator__input--contribution')
    if(contribution > (form.sum * creditOptions[selectedOption.id].percent.min / 100) && contribution < (form.sum - creditOptions[selectedOption.id].credit.min)) {
      inputContribution.classList.remove('calculator__input--error')
    }
    evt.preventDefault()
    changeForm({
      ...form,
      percent: evt.target.value,
      contribution: contribution
    })
  }

  const handleTermChange = (evt) => {
    evt.preventDefault()   
    var term = Number(evt.target.value.replace(/\D+/g,""))
    changeForm({
      ...form,
      term: term
    })
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
  }
  
  const handleDiscount1Change = () => {
    changeForm(prevForm => ({
      ...prevForm,
      discount1: !prevForm.discount1
    }))
  }

  const handleDiscount2Change = () => {
    changeForm(prevForm => ({
      ...prevForm,
      discount2: !prevForm.discount2
    }))
  }

  const handleSendForm = (evt) => {
    evt.preventDefault() 
    const nameInput = document.querySelector('.calculator__personal--name')
    const phoneInput = document.querySelector('.calculator__personal--phone')
    const emailInput = document.querySelector('.calculator__personal--email')
    if (personalData.name.trim() === '') {
      nameInput.classList.add('calculator__personal--error')
    } else {
      nameInput.classList.remove('calculator__personal--error')
    }

    if (personalData.phone.length < PHONE_LENGTH) {
      phoneInput.classList.add('calculator__personal--error')
    } else {
      phoneInput.classList.remove('calculator__personal--error')
    }

    if (personalData.email.trim() === '') {
      emailInput.classList.add('calculator__personal--error')
    } else {
      emailInput.classList.remove('calculator__personal--error')
    }

    if ((personalData.email.trim() !== '') && (personalData.phone.trim().length === PHONE_LENGTH) && (personalData.name.trim() !== '')) {
      setLocalStorage()
      
      setSelectedOption(null)
      setVisibleThree(false)
      changeForm({  
        id: form.id + 1,
        purpose: "",
        sum: 2000000,
        contribution: 200000,
        percent: null,
        term: null,
        discount1: false,
        discount2: false,
        selectedOption: 0
      })
      changeProposal({
        loanAmount: null,
        interestRate: null,
        monthlyPayment: null,
        requiredIncome: null
      })
      props.onPopupInfoOpen()
    }
  }

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
                onChange={(evt) => {handleSelectedOption(evt)}}
                options={options}
              />
            </div>
            {selectedOption 
              ? <div className="calculator__section calculator__section--two">
                <h3 className="calculator__section-name">Шаг 2. Введите параметры кредита</h3>
                <div className="calculator__sum">
                  <label className="calculator__label" htmlFor="sum">{creditOptions[selectedOption.id].sum.name}</label>
                  <div className="calculator__sum calculator__input-wrapper">       
                    <button                      
                      type="button"
                      className="calculator__svg calculator__svg--minus" 
                      id="minus" 
                      aria-label="Минус" 
                      onClick={handleSumVary}>                      
                    </button>
                    <IMaskInput className="calculator__input calculator__input--sum" id="sum" name="sum" type="text"
                      value={form.sum + " рублей"}  
                      onAccept={handleSumChange} 
                      onBlur={handleSumOut}
                      unmask={true}
                      mask={[
                        { mask: '' },
                        {
                          mask: 'num рублей',
                          lazy: false,
                          blocks: {
                            num: {
                                mask: Number,
                                thousandsSeparator: ' ',
                            }
                          }
                        }
                      ]}
                    />   
                    <span className="calculator__input-error">
                      Некорректное значение
                    </span>
                    <button                     
                      type="button"
                      className="calculator__svg calculator__svg--plus" 
                      id="plus"  
                      aria-label="Плюс" 
                      onClick={handleSumVary}>
                    </button>
                  </div>
                  <span className="calculator__text-small">От {formatedNumber(creditOptions[selectedOption.id].sum.min)} до {formatedNumber(creditOptions[selectedOption.id].sum.max)} рублей</span>
                </div>
                <div className="calculator__contribution">
                  <div className="calculator__input-wrapper">
                    <label className="calculator__label" htmlFor="contribution">Первоначальный взнос</label>
                    <IMaskInput className="calculator__input calculator__input--contribution" id="contribution" name="contribution" type="text" 
                      value={form.contribution + " рублей"}  
                      onAccept={handleContributionChange} 
                      onBlur={handleContributionOut} 
                      unmask={true}
                      mask={[
                        { mask: '' },
                        {
                          mask: 'num рублей',
                          lazy: false,
                          blocks: {
                            num: {
                                mask: Number,
                                thousandsSeparator: ' ',
                            }
                          }
                        }
                      ]}
                    />
                    <span className="calculator__input-error">
                      Некорректное значение
                    </span>
                  </div>
                  <input className="calculator__input calculator__input--range" id="contribution-range" name="contribution-range" type="range" min={creditOptions[selectedOption.id].percent.min} max="100" step={creditOptions[selectedOption.id].percent.step} value={form.percent}  onChange={handlePercentChange} />
                  <span className="calculator__text-small">{Math.round(form.percent)}%</span>
                </div>
                <div className="calculator__years">
                  <label className="calculator__label" htmlFor="years">Срок кредитования</label>
                  <input className="calculator__input" id="years" name="years" type="text" value={`${form.term} ${pluralize(form.term)}`}  min={creditOptions[selectedOption.id].term.min} max={creditOptions[selectedOption.id].term.max}  onChange={handleTermChange} onBlur={handleTermOut} />
                  <input className="calculator__input calculator__input--range" id="years-range"  name="years-range" type="range" min={creditOptions[selectedOption.id].term.min} max={creditOptions[selectedOption.id].term.max} step={creditOptions[selectedOption.id].term.step} value={form.term}  onChange={handleTermChange} />
                  <div>
                    <span className="calculator__text-small">{creditOptions[selectedOption.id].term.min} лет</span>                  
                    <span className="calculator__text-small">{creditOptions[selectedOption.id].term.max} лет</span>
                  </div>
                </div>
                <div>
                  <input className="calculator__checkbox visually-hidden" type="checkbox" id="discount1" name="discount1" checked={form.discount1} onChange={handleDiscount1Change} />
                  <label className="calculator__label calculator__label--checkbox" htmlFor="discount1">{creditOptions[selectedOption.id].checkboxes[0].name}</label>
                  { selectedOption.id === 1 
                  ? <>
                      <input className="calculator__checkbox visually-hidden" type="checkbox" id="discount2" name="discount2" checked={form.discount2} onChange={handleDiscount2Change} />
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
              {proposal.loanAmount >= creditOptions[selectedOption.id].credit.min ?                 
                <>                
                  <h3 className="calculator__section-name calculator__section-name--proposal">
                    Наше предложение
                  </h3>
                  <div className="calculator__proposal">
                    <div>
                      <p className="calculator__text-bold">{formatedNumber(proposal.loanAmount) + " рублей"}</p>
                      <span className="calculator__label">Сумма {creditOptions[selectedOption.id].text1}</span>
                    </div>
                    <div>
                      <p className="calculator__text-bold">{proposal.interestRate.toFixed(2) + " %"}</p>
                      <span className="calculator__label">Процентная ставка</span>
                    </div>
                    <div>
                      <p className="calculator__text-bold">{formatedNumber(proposal.monthlyPayment) + " рублей"}</p>
                      <span className="calculator__label">Ежемесячный платеж</span>
                    </div>
                    <div>
                      <p className="calculator__text-bold">{formatedNumber(proposal.requiredIncome) + " рублей"}</p>
                      <span className="calculator__label">Необходимый доход</span>
                    </div>
                  </div>
                  <button                  
                    type="button"
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
                    <span className="calculator__text-bold">
                      {
                        {
                          "id": "№ " + prependZeros(form[keys.toLowerCase()]),
                          "sum": formatedNumber(form[keys.toLowerCase()]) + " рублей",
                          "purpose": form[keys.toLowerCase()],
                          "contribution": formatedNumber(form[keys.toLowerCase()]) + " рублей",
                          "term": form[keys.toLowerCase()] + ' ' + pluralize(form[keys.toLowerCase()]),
                        }[keys.toLowerCase()]
                      }
                    </span>
                  </li>
                ))}     
              </ul>
              <div className="calculator__personal-card">
                <label className="visually-hidden" htmlFor="name">Фамилия Имя Отчество</label>
                <input className="calculator__personal calculator__personal--name" id="name" name="name" type="text" placeholder="ФИО" value={personalData.name} onChange={handleNameChange} />
                <label className="visually-hidden" htmlFor="phone">Телефон</label>
                <IMaskInput  className="calculator__personal calculator__personal--phone" id="phone" name="phone" type="tel" placeholder="Телефон" value={personalData.phone} onAccept={handlePhoneChange} mask="+{7}(000)000-00-00" />
                <label className="visually-hidden" htmlFor="email">E-mail</label>
                <input className="calculator__personal calculator__personal--email" id="email" name="email" type="email" placeholder="E-mail" value={personalData.email} onChange={handleEmailChange} />
              </div>
              <button 
                type="submit"
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