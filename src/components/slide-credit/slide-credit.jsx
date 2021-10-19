import React from 'react';
import './slide-credit.scss';

const SlideCredit = ({classSlide}) => {
  return (
    <section className={"slide-credit" + classSlide}>
      <div className="slide-credit__container container">
        <div className="slide-credit__content">
          <h2 className="slide-credit__title">Лига Банк</h2>
          <p className="slide-credit__text">Кредиты на любой случай</p>
          <a href="ligabank.com" className="slide-credit__link">Расcчитать кредит</a>
        </div>
        <div className="slide-credit__picture">
          <img src="img/cards.png" width="398" height="240" alt="Карта банка" />
        </div>
      </div>
    </section>
  );  
};

export default SlideCredit;