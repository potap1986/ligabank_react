import React from 'react';
import './slide-stable.scss';

const SlideStable = ({classSlide}) => {
  return (
    <section className={"slide-stable" + classSlide}>
      <div className="slide-stable__container container">
        <div className="slide-stable__content">
          <h2 className="slide-stable__title">Лига Банк</h2>
          <p className="slide-stable__text">Ваша уверенность в завтрашнем дне</p>
        </div>
      </div>
    </section>
  );  
};

export default SlideStable;