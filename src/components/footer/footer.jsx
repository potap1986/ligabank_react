import React from 'react';
import './footer.scss';

const Footer = () => {
  const footerLinks = [
    {
      name: "Услуги",
      href: "ligabank.com"
    },
    {
      name: "Рассчитать кредит",
      href: "ligabank.com"
    },
    {
      name: "Контакты",
      href: "ligabank.com"
    },
    {
      name: "Задать вопрос",
      href: "ligabank.com"
    }
  ]

  return (
    <footer className="footer">
      <div className="footer__container container">
        <div className="footer__column footer__column--logo">
          <a href="ligabank.com" className="footer__logo">
            <svg width="28" height="25">
              <use xlinkHref="#logo" />
            </svg>
            <span className="footer__logo-text"> ЛИГА Банк</span>
          </a>
          <p className="footer__small-text">
            150015, г. Москва, ул. Московская, д. 32
            Генеральная лицензия Банка России №1050
            Ⓒ Лига Банк, 2019
          </p>
        </div>
        <nav className="footer__nav footer__column">
          <ul className="footer__nav-list">
            {footerLinks.map((link, index) => (
              <li 
                key={link.name + index}
                className="footer__nav-item"
              >
                <a href={link.href} className="footer__nav-link">
                    {link.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="footer__column footer__column--phone1">
          <a href="tel:*0904" className="footer__contact">
            <svg width="10" height="16">
              <use xlinkHref="#phone" />
            </svg>
            <span>
              *0904
            </span>
          </a>
          <p className="footer__small-text footer__small-text--padding">
            Бесплатно для абонентов МТС, Билайн, Мегафон, Теле2
          </p>
        </div>
        <div className="footer__column footer__column--phone2">
          <a href="tel:+78001112233" className="footer__contact">
            <svg width="16" height="16">
              <use xlinkHref="#phone2" />
            </svg>
            <span>
              8 800 111 22 33
            </span>
          </a>
          <p className="footer__small-text footer__small-text--padding">
            Бесплатный для всех городов России
          </p>
        </div>
        <div className="footer__column footer__column--social">
          <h2 className="visually-hidden">Мы в социальных сетях</h2>
          <ul className="footer__social-list">
            <li className="footer__social-item">
              <a className="footer__social-link" href="ligabank.com">
                <span className="visually-hidden">Мы в Facebook</span>
                <svg width="9" height="16">
                  <use xlinkHref="#facebook" />
                </svg>
              </a>
            </li>
            <li className="footer__social-item">
              <a className="footer__social-link" href="ligabank.com">
                <span className="visually-hidden">Мы в Instagram</span>
                <svg width="16" height="16">
                  <use xlinkHref="#instagram" />
                </svg>
              </a>
            </li>
            <li className="footer__social-item">
              <a className="footer__social-link" href="ligabank.com">
                <span className="visually-hidden">Мы в Twitter</span>
                <svg width="16" height="13">
                  <use xlinkHref="#twitter" />
                </svg>
              </a>
            </li>
            <li className="footer__social-item">
              <a className="footer__social-link" href="ligabank.com">
                <span className="visually-hidden">Мы в Youtube</span>
                <svg width="16" height="13">
                  <use xlinkHref="#youtube" />
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;