import React, { Component } from "react"
import './popup-enter.scss'
import FocusTrap from 'focus-trap-react'
import ScrollLock from 'react-scrolllock'
import PropTypes from "prop-types";
import ActionCreator from '../../store/actions'
import {connect} from 'react-redux'

class PopupEnter extends Component {
  state = {        
    login: localStorage.getItem('login') ? localStorage.getItem('login') : '',
    password: localStorage.getItem('password') ? localStorage.getItem('password') : '',
  }

  handlePrivate = (evt) => {
    evt.preventDefault()    
    const password = document.getElementById('password')
    if (password.type === 'password') {
      password.type = 'text'
    } else {
      password.type = 'password'
    }
  }
  
  handleLoginChange = (evt) => {
    evt.preventDefault()   
    this.setState({
      login: evt.target.value 
    })
  }
  
  handlePasswordChange = (evt) => {
    evt.preventDefault()   
    this.setState({
      password: evt.target.value 
    })
  }

  handleLogin(evt) {
    const loginInput = document.querySelector('.popup-enter__input--login');
    const passwordInput = document.querySelector('.popup-enter__input--password');
    
    evt.preventDefault();

    if (this.state.login.trim() === '') {
      loginInput.classList.add('popup-enter__input--error')
    } else {
      loginInput.classList.remove('popup-enter__input--error')
    }

    if (this.state.password.trim() === '') {
      passwordInput.classList.add('popup-enter__input--error')
    } else {
      passwordInput.classList.remove('popup-enter__input--error')
    }

    if ((this.state.login.trim() !== '') && (this.state.password.trim() !== '')) {
      
      this.props.onPopupEnterClose();
      this.setLocalStorage();
    }
  }
  
  setLocalStorage() {
    localStorage.setItem('login', this.state.login)
    localStorage.setItem('password', this.state.password)
  }

  componentDidMount() {
    this.loginInput.focus();
  }

  render () {
    
    const escPressHandler = (evt) => {
      if (evt.key === 'Escape') {
        this.props.onPopupEnterClose();
        document.removeEventListener('keydown', escPressHandler);
      }
    }

    document.addEventListener('keydown', escPressHandler);

    return ( 
      <FocusTrap>
        <div className="popup-enter"
          onClick={(evt) => {
            if (!evt.target.closest('.popup-enter__wrapper')) {
              this.props.onPopupEnterClose();
          }}}
        >
          <ScrollLock>
            <div className="popup-enter__wrapper">
              <div className="popup-enter__head">
                <svg className="popup-enter__logo" width="30" height="27">
                  <use xlinkHref="#logo"/>
                </svg>
                <div className="popup-enter__title">
                  <p>ЛИГА Банк</p>
                  <span>интернет-банк</span>
                </div>
                <button 
                  className="popup-enter__close"
                  onClick={this.props.onPopupEnterClose}
                  aria-label="Закрыть окно"
                >            
                  <svg width="16" height="16">
                    <use xlinkHref="#close"></use>
                  </svg>
                </button>
              </div>
              <form 
                className="popup-enter__form"
                method="post"
                action="#"
              >
                <label className="popup-enter__label" htmlFor="login">Логин</label> 
                <input className="popup-enter__input popup-enter__input--login" type="text" name="login" id="login" placeholder="" onChange={this.handleLoginChange} value={this.state.login} ref={(input) => {this.loginInput = input}}/> 
                <label className="popup-enter__label" htmlFor="password">Пароль</label>
                <div className="popup-enter__password">
                  <input className="popup-enter__input popup-enter__input--password" type="password" name="password" placeholder="" id="password"  onChange={this.handlePasswordChange} value={this.state.password}/>
                  <button  
                    className="popup-enter__private"
                    onMouseDown={this.handlePrivate} 
                    onMouseUp={this.handlePrivate} 
                    aria-label="Показать пароль"
                  >
                    <svg width="22" height="12">
                      <use xlinkHref="#private"></use>
                    </svg>
                  </button> 
                </div>
                <a  className="popup-enter__link" href="liga_bank.com">Забыли пароль?</a>
                <button  className="popup-enter__button" onClick={this.handleLogin.bind(this)}>Войти</button>
              </form>
            </div>
          </ScrollLock>
        </div>
      </FocusTrap>
    )
  }
}

PopupEnter.propTypes = {
	visibleEnter: PropTypes.bool.isRequired,
	onPopupEnterClose: PropTypes.func.isRequired
}


const mapStateToProps = (state) => {
	return {
		visibleEnter: state.isPopupEnterVisible
	}
};

const mapDispatchToProps = (dispatch) => ({
  onPopupEnterClose: () => {
    dispatch(ActionCreator.closePopupEnter());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PopupEnter);
