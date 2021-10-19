import React from 'react'
import './slider.scss'
import SlideCredit from '../slide-credit/slide-credit'
import SlideStable from '../slide-stable/slide-stable'
import SlideNear from '../slide-near/slide-near'

const Slider = () => {
  return (
    <div className="slider">
      <h1 className="visually-hidden">ЛИГА БАНК</h1>
      <SlideCredit classSlide={" "}  />
      <SlideStable classSlide={" visually-hidden"} />
      <SlideNear classSlide={" visually-hidden"} />
    </div>
  )
}

export default Slider