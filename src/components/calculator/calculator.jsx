import React, { useState } from 'react'
import Select from 'react-select'
import './calculator.scss'
import { KeyFormDates } from '../../const'

const options = [
  { value: 'mortgage', label: 'Ипотечное кредитование' },
  { value: 'car_loan', label: 'Автомобильное кредитование' },
];

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    '&:last-child': {borderTop: '1px solid #C1C2CA'},
    color: state.isSelected ? '#2C36F2' : '#1F1E25',
    backgroundColor: state.isSelected ? 'white' : 'white',
    minHeight: 60,
    padding: 24,
  }),  
  menu: (provided, state) => ({
    ...provided,
    border: '1px solid #1F1E25',
    boxShadow: 'none',
    marginTop: -1,
  }),
  placeholder: (provided, state) => ({
    ...provided,
    fontFamily: 'Roboto',
    fontWeight: 500,
    fontSize: 16,
    color:  '#1F1E25',
    lineHeight: '140%',
  }),
  control: (provided, state) => ({
    ...provided,
    width: '100%',
    fontWeight: 500,
    fontSize: 16,
    boxShadow: 'none',
    color:  '#1F1E25',
    lineHeight: '140%',
    border: '1px solid #1F1E25',
    borderRadius: 4,
    padding: 20,
    background: state.menuIsOpen ? `url('../../img/select-rotate.svg')` : `url('../../img/select.svg')`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '97% center',
  
    transition: 'border-color 0.3s ease'
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';

    return { ...provided, opacity, transition };
  }
}

const Calculator = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  
  const dates = Object.entries(KeyFormDates);

  const form = {  
    id: "№ 0010",
    purpose: "Ипотека",
    sum: "2 000 000 рублей",
    contribution: "200 000 рублей",
    year: "5 лет"
  }

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
                onChange={setSelectedOption}
                options={options}
              />
            </div>
            <div className="calculator__section calculator__section--two">
              <h3 className="calculator__section-name">Шаг 2. Введите параметры кредита</h3>
              <div className="calculator__sum">
                <label className="calculator__label" htmlFor="sum">Стоимость недвижимости</label>
                <div className="calculator__sum">       
                  <svg className="calculator__svg calculator__svg--minus" width="16" height="2">
                    <use xlinkHref="#minus"/>
                  </svg>
                  <input className="calculator__input" id="sum" name="sum" type="text" value="2 000 000 рублей" onChange={() => {}} />       
                  <svg className="calculator__svg calculator__svg--plus" width="16" height="16">
                    <use xlinkHref="#plus"/>
                  </svg>
                </div>
                <span className="calculator__text-small">От 1 200 000 до 25 000 000 рублей</span>
              </div>
              <div className="calculator_contribution">
                <label className="calculator__label" htmlFor="contribution">Первоначальный взнос</label>
                <input className="calculator__input" id="contribution" name="contribution" type="text" value="200 000 рублей"  onChange={() => {}} />
                <input className="calculator__input calculator__input--range" id="contribution-range" name="contribution-range" type="range" min="10" max="100" step="5" value="10"  onChange={() => {}} />
                <span className="calculator__text-small">10%</span>
              </div>
              <div className="calculator_years">
                <label className="calculator__label" htmlFor="years">Срок кредитования</label>
                <input className="calculator__input" id="years" name="years" type="text" value="5 лет"  onChange={() => {}} />
                <input className="calculator__input calculator__input--range" id="years-range" name="years-range" type="range" min="5" max="30" step="1" value="5"  onChange={() => {}} />
                <div>
                  <span className="calculator__text-small">5 лет</span>                  
                  <span className="calculator__text-small">30 лет</span>
                </div>
              </div>
              <div>
                <input className="calculator__checkbox visually-hidden" type="checkbox"  id="discount" name="discount" value="470000"  onChange={() => {}} />
                <label className="calculator__label calculator__label--checkbox" htmlFor="discount">Использовать материнский капитал</label>
              </div>
            </div>
          </div>
          <div  className="calculator__section calculator__section--proposal">
            { 400000 >= 500000 ? 
              <>                
                <h3 className="calculator__section-name calculator__section-name--proposal">
                  Наше предложение
                </h3>
                <div className="calculator__proposal">
                  <div>
                    <p className="calculator__text-bold">1 330 000 рублей </p>
                    <span className="calculator__label">Сумма ипотеки</span>
                  </div>
                  <div>
                    <p className="calculator__text-bold">9,40%</p>
                    <span className="calculator__label">Процентная ставка</span>
                  </div>
                  <div>
                    <p className="calculator__text-bold">27 868 рублей</p>
                    <span className="calculator__label">Ежемесячный платеж</span>
                  </div>
                  <div>
                    <p className="calculator__text-bold">61 929 рублей</p>
                    <span className="calculator__label">Необходимый доход</span>
                  </div>
                </div>
                <button className="calculator__button calculator__button--proposal">Оформить заявку</button>
              </>
              :
              <>                
                <h3 className="calculator__section-name calculator__section-name--no-credit">
                  Наш банк не выдаёт ипотечные кредиты меньше 500 000 рублей.
                </h3>
                <p className="calculator__label calculator__label--no-credit">
                  Попробуйте использовать другие параметры&nbsp;для&nbsp;расчёта.
                </p>                   
              </>
            }
          </div>
          <div className="calculator__section calculator__section--three">
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
            <form>
              <div className="calculator__personal-card">
                <label className="visually-hidden" htmlFor="name">Фамилия Имя Отчество</label>
                <input className="calculator__personal" id="name" name="name" type="text" placeholder="ФИО" />
                <label className="visually-hidden" htmlFor="phone">Телефон</label>
                <input className="calculator__personal" id="phone" name="phone" type="tel" placeholder="Телефон" />
                <label className="visually-hidden" htmlFor="email">E-mail</label>
                <input className="calculator__personal" id="email" name="email" type="email" placeholder="E-mail" />
              </div>
              <button className="calculator__button">Отправить</button>
            </form>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Calculator