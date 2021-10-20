import React from "react"
import './popup-info.scss'

const PopupInfo = () => {
  return ( 
    <div className="popup-info">
      <div className="popup-info__wrapper">
        <button 
          className="popup-info__close"
          onClick={() => {}}
          aria-label="Закрыть окно"
        >            
          <svg width="16" height="16">
            <use xlinkHref="#close"></use>
          </svg>
        </button>
        <p className="popup-info__head">
          Спасибо за обращение в наш банк.
        </p>
        <p className="popup-info__text">
          Наш менеджер скоро свяжется с вами по&nbsp;указанному&nbsp;номеру&nbsp;телефона.
        </p>
      </div>
    </div>
  )
}

export default PopupInfo;
