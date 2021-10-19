import React from "react"
import './popup-enter.scss'

const PopupEnter = () => {
  let pass = "5554"
  const handlePrivate = (evt) => {
    evt.preventDefault()    
    const password = document.getElementById('password')
    pass = password.value
    if (password.type === 'password') {
      password.type = 'text'
    } else {
      password.type = 'password'
    }
  }

  return ( 
    <div className="popup-enter">
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
            onClick={() => {}}
            aria-label="Закрыть окно"
          >            
            <svg width="16" height="16">
              <use xlinkHref="#close"></use>
            </svg>
          </button>
        </div>
        <form 
          className="popup-enter__form"
          //method="post"
          //action="#"
        >
          <label className="popup-enter__label" htmlFor="login">Логин</label> 
          <input className="popup-enter__input" type="text" name="login" id="login" placeholder=""/> 
          <label className="popup-enter__label" htmlFor="password">Пароль</label>
          <div className="popup-enter__password">
            <input className="popup-enter__input popup-enter__input--password" type="password" name="password" id="password" value={pass} onChange={() => {}}/>
            <button  
              className="popup-enter__private"
              onMouseDown={handlePrivate} 
              onMouseUp={handlePrivate} 
              aria-label="Показать пароль"
            >
              <svg width="22" height="12">
                <use xlinkHref="#private"></use>
              </svg>
            </button> 
          </div>
          <a  className="popup-enter__link" href="liga_bank.com">Забыли пароль?</a>
          <button  className="popup-enter__button" onClick={() => {}}>Войти</button>
        </form>
      </div>
    </div>
  )
}

export default PopupEnter;
