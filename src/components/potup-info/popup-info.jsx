import React from "react"
import './popup-info.scss'
import FocusTrap from 'focus-trap-react'
import ScrollLock from 'react-scrolllock'
import PropTypes from "prop-types";
import ActionCreator from '../../store/actions'
import {connect} from 'react-redux'

const PopupInfo = (props) => {

  const escPressHandler = (evt) => {
    if (evt.key === 'Escape') {
      props.onPopupInfoClose();
      document.removeEventListener('keydown', escPressHandler);
    }
  }

  document.addEventListener('keydown', escPressHandler);

  return ( 
    <FocusTrap>
      <div className="popup-info"
        onClick={(evt) => {
          if (!evt.target.closest('.popup-info__wrapper')) {
            props.onPopupInfoClose();
        }}}
      >
        <ScrollLock>
          <div className="popup-info__wrapper">
            <button 
              className="popup-info__close"
              onClick={props.onPopupInfoClose}
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
              Наш менеджер скоро свяжется с вами по&nbsp;указанному&nbsp;номеру телефона.
            </p>
          </div>
        </ScrollLock>
      </div>
    </FocusTrap>
  )
}

PopupInfo.propTypes = {
	visibleInfo: PropTypes.bool.isRequired,
	onPopupInfoClose: PropTypes.func.isRequired
}


const mapStateToProps = (state) => {
	return {
		visibleInfo: state.isPopupInfoVisible
	}
};

const mapDispatchToProps = (dispatch) => ({
  onPopupInfoClose: () => {
    dispatch(ActionCreator.closePopupInfo());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PopupInfo);
