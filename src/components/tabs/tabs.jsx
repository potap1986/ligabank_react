import React from 'react'
import './tabs.scss'
import Tab from '../tab/tab'
import PropTypes from "prop-types";
import ActionCreator from '../../store/actions'
import {connect} from 'react-redux'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Autoplay, EffectFade } from 'swiper';


import "swiper/components/effect-fade/effect-fade.scss"
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'

SwiperCore.use([Autoplay, EffectFade]);

const Tabs = (props) => {
  const tabs = [
    {
      svg: 'investment',
      head: 'Вклады',
      title: 'Вклады Лига Банка – это выгодная инвестиция в свое будущее',
      advantages: [
        'Проценты по вкладам до 7%',
        'Разнообразные условия',
        'Возможность ежемесячной капитализации или вывод процентов на банковскую карту'
      ],
      image: '../img/investment.jpg',
      imageTablet: '../img/investment-tablet.jpg',
      imageMobile: '../img/investment-mobile.jpg',
      button: {
        name: 'Узнать подробнее',
        href: 'liga-bamk.com'
      }
    },
    {
      svg: 'credit',
      head: 'Кредиты',
      title: 'Лига Банк выдает кредиты под любые цели',
      advantages: [
        'Ипотечный кредит',
        'Автокредит',
        'Потребительский кредит'
      ],
      image: '../img/credit.jpg',
      imageTablet: '../img/credit-tablet.jpg',
      imageMobile: '../img/credit-mobile.jpg',
      info: 'Рассчитайте ежемесячный платеж        и ставку по кредиту воспользовавшись нашим ',
      link: {
        name: 'кредитным калькулятором',
        href: 'liga-bamk.com'
      }
    },
    {
      svg: 'insurance',
      head: 'Страхование',
      title: 'Лига Страхование — застрахуем все что захотите',
      advantages: [
        'Автомобильное страхование',
        'Страхование жизни и здоровья',
        'Страхование недвижимости'
      ],
      image: '../img/insurance.jpg',
      imageTablet: '../img/insurance-tablet.jpg',
      imageMobile: '../img/insurance-mobile.jpg',
      button: {
        name: 'Узнать подробнее',
        href: 'liga-bamk.com'
      }
    },
    {
      svg: 'online',
      head: 'Онлайн-сервисы',
      title: 'Лига Банк — это огромное количество онлайн-сервисов для вашего удобства',
      advantages: [
        'Мобильный банк,                                          который всегда под рукой',
        'Приложение Лига-проездной позволит    вам оплачивать билеты по всему миру'
      ],
      image: '../img/online.jpg',
      imageTablet: '../img/online-tablet.jpg',
      imageMobile: '../img/online-mobile.jpg',
      button: {
        name: 'Узнать подробнее',
        href: 'liga-bamk.com'
      }
    }
  ]

  const handleTab = (id) => {
    props.onChangeActiveTab(id)
  }

  const mediaQuery = window.matchMedia('(min-width: 1023px)')

  return (
    <div className="tabs container">
      <div>   
        {  
          mediaQuery.matches
            ? <ul className="tabs__heads">
              {
                tabs.map((item, index) => (
                  <li
                    key={item.head}  
                    className={"tabs__title" + (index === props.activeTab ? " tabs__title--active" : " ")}
                    onClick={() => {handleTab(index)}}
                  >         
                    <svg width="34" height="33">
                      <use xlinkHref={"#" + item.svg}/>
                    </svg>
                    <p>{item.head}</p>
                  </li>
                ))
              }
            </ul>
            : " "
        } 
        
        {
          mediaQuery.matches
            ?
            <Tab 
              item = {tabs[props.activeTab]}
            />
            : 
            <Swiper
              slidesPerView={1}
              autoplay={{
                delay: 4000,
                disableOnInteraction: true
              }} 
              effect={'fade'}
            >
              {tabs.map((item, id) => (
                <SwiperSlide key={item.svg + id}>
                  <Tab                  
                    item={item} />
                </SwiperSlide>
              ))}              
            </Swiper>    
        }
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
	return {
		activeTab: state.activeTab
	}
};

const mapDispatchToProps = (dispatch) => ({
  onChangeActiveTab: (activeTab) => {
    dispatch(ActionCreator.changeActiveTab(activeTab));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Tabs)