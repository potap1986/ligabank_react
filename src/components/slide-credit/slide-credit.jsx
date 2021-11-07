import React from 'react';
import './slide-credit.scss';

const SlideCredit = () => {
  return (
    <section className="slide-credit">
      <div className="slide-credit__container container">
        <div className="slide-credit__content">
          <h2 className="slide-credit__title">Лига Банк</h2>
          <p className="slide-credit__text">Кредиты на любой случай</p>
          <a href="#calculator" className="slide-credit__link">Расcчитать кредит</a>
        </div>
      </div>
    </section>
  );  
};

export default SlideCredit;