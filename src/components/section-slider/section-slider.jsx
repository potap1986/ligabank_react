import React from 'react'
import './section-slider.scss'
import SlideCredit from '../slide-credit/slide-credit'
import SlideStable from '../slide-stable/slide-stable'
import SlideNear from '../slide-near/slide-near'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Autoplay, EffectFade, Pagination, Keyboard } from 'swiper';


import "swiper/components/effect-fade/effect-fade.scss"
import "swiper/components/pagination/pagination.scss"
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'
import { SLIDER_DELAY } from '../../const'

SwiperCore.use([Autoplay, Pagination, EffectFade, Keyboard]);

const SectionSlider = () => {
  return (
    <div className="section-slider">
      <h1 className="visually-hidden">ЛИГА БАНК</h1>
      <Swiper
        slidesPerView={1}
        autoplay={{
          delay: SLIDER_DELAY,
          disableOnInteraction: true
        }} 
        effect={'fade'}
        pagination={{ clickable: true }}
        keyboard= {{
          enabled: true,
          onlyInViewport: true,
        }}
      >
        <SwiperSlide><SlideCredit /></SwiperSlide>
        <SwiperSlide><SlideStable /></SwiperSlide>
        <SwiperSlide><SlideNear /></SwiperSlide>
      </Swiper>
    </div>
  )
}

export default SectionSlider