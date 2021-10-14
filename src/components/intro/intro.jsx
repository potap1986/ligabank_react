import React from 'react';
import './intro.scss';

const Intro = () => {
  return (
    <section className="intro">
      <div className="intro__container container">
        <div className="intro__content">
          <h1 className="intro__title">Лига Банк</h1>
          <p className="intro__text">Кредиты на любой случай</p>
          <a href="ligabank.com" className="intro__link">Расcчитать кредит</a>
        </div>
        <div className="intro__picture">
          <img src="img/cards.png" width="398" height="240" alt="Карта банка" />
        </div>
      </div>
    </section>
  );
  
};

export default Intro;