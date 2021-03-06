import React, { useState, useEffect } from 'react';
import './header.scss';
import PropTypes from "prop-types"
import { connect } from 'react-redux'
import ActionCreator from '../../store/actions'
import ScrollLock from 'react-scrolllock';

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
  
  const mediaQueryMobile = window.matchMedia('(max-width: 767px)')
  const [visibleMenu, setMenuVisible] = useState(false)
  const [visibleLogoMobile, setLogoMobileVisible] = useState(mediaQueryMobile.matches ? true : false)
  const handleWindowSizeChangeMobile = () => {
    if (!mediaQueryMobile.matches) {
      setMenuVisible(false)
      setLogoMobileVisible(false)
    } else {
      setLogoMobileVisible(true)
    }
  };

  useEffect(() => {
    mediaQueryMobile.addListener(handleWindowSizeChangeMobile);
    return () => {
      mediaQueryMobile.removeListener(handleWindowSizeChangeMobile);
    };
  });

  return (
    <header className={"header" + (visibleMenu ? " header--menu-open" : "")}>
      <ScrollLock isActive={visibleMenu}>
        <div className="header__container container">
          <button className="header__toggler" type="button" aria-label="Открыть меню" onClick={() => { setMenuVisible(!visibleMenu) }}>
            <svg width="16" height="12">
              <use xlinkHref="#menu"></use>
            </svg>
          </button>
          <a href="ligabank.com" className="header__logo">
            {visibleLogoMobile ? 
              <svg width="116" height="19">
                <use xlinkHref="#logo-mobile" />
              </svg>
              : <svg width="150" height="25">
                <use xlinkHref="#logo" />
              </svg>
            }
          </a>
          {visibleMenu ? 
            <button className="header__close" type="button" aria-label="Закрыть меню" onClick={() => { setMenuVisible(false) }}>
              <svg width="13" height="13">
                <use xlinkHref="#close"></use>
              </svg>
            </button>
            : <></>
          }
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
            <button className="header__enter" onClick={props.onPopupEnterOpen}>
              <svg width="20" height="22">
                <use xlinkHref="#enter" />
              </svg>
              <span className="header__login">Войти в Интернет-банк</span>
            </button>
          </nav>
          <button className="header__enter header__enter--mobile" onClick={props.onPopupEnterOpen}>
            <svg width="20" height="22">
              <use xlinkHref="#enter" />
            </svg>
          </button>
        </div>
      </ScrollLock>
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