import React from 'react';
import './header.scss';

const Header = () => {
  const headerLinks = [
    {
      name: "Услуги",
      href: "ligabank.com"
    },
    {
      name: "Рассчитать кредит",
      href: "ligabank.com"
    },
    {
      name: "Конвертер валют",
      href: "ligabank.com"
    },
    {
      name: "Контакты",
      href: "ligabank.com"
    }
  ]

  return (
    <header className="header">
      <div className="header__container container">
        <a href="ligabank.com" className="header__logo">
          <svg width="28" height="25">
            <use xlinkHref="#logo"/>
          </svg>
          <span className="header__logo-text"> ЛИГА Банк</span>
        </a>
        <nav className="header__nav">
          <ul className="header__nav-list">
            {headerLinks.map((link, index) => (
              <li 
                key={link.name + index}
                className="header__nav-item"
              >
                <a href={link.href} className="header__nav-link">
                    {link.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>          
        <a href="ligabank.com" className="header__enter">
          <svg width="20" height="22">
            <use xlinkHref="#enter"/>
          </svg>
          <span className="header__login">Войти в Интернет-банк</span>
        </a>
      </div>
    </header>
  );
};

export default Header;