import React from 'react';
import './header.scss';
import PropTypes from "prop-types"
import { connect } from 'react-redux'
import ActionCreator from '../../store/actions'

const Header = (props) => {
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
        <button href="ligabank.com" className="header__enter" onClick={props.onPopupEnterOpen}>
          <svg width="20" height="22">
            <use xlinkHref="#enter"/>
          </svg>
          <span className="header__login">Войти в Интернет-банк</span>
        </button>
      </div>
    </header>
  );
};

Header.propTypes = {
  visibleEnter: PropTypes.bool.isRequired,
  onPopupEnterOpen: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
	return {
		visibleEnter: state.isPopupEnterVisible
	}
};

const mapDispatchToProps = (dispatch) => ({
  onPopupEnterOpen: () => {
    dispatch(ActionCreator.openPopupEnter());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);