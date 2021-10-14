import React from 'react'
import './slider.scss'
import SlideCredit from '../slide-credit/slide-credit'
import SlideStable from '../slide-stable/slide-stable'
import SlideNear from '../slide-near/slide-near'

const Slider = () => {
  return (
    <>
      <h1 className="visually-hidden">ЛИГА БАНК</h1>
      <SlideCredit />
      <SlideStable />
      <SlideNear />
    </>
  )
}

export default Slider