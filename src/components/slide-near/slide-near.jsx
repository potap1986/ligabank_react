import React from 'react';
import './slide-near.scss';

const SlideNear = () => {
  return (
    <section className="slide-near">
      <div className="slide-near__container container">
        <div className="slide-near__content">
          <h2 className="slide-near__title">Лига Банк</h2>
          <p className="slide-near__text">Всегда рядом</p>
          <a href="#map" className="slide-near__link">Найти отделение</a>
        </div>
      </div>
    </section>
  );  
};

export default SlideNear;