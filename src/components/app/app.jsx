import React from 'react';
import PropTypes from "prop-types";
import './app.scss';
import Header from '../header/header';
import Footer from '../footer/footer';
import SectionSlider from '../section-slider/section-slider';
import Tabs from '../tabs/tabs';
import Calculator from '../calculator/calculator';
import PopupEnter from '../potup-enter/popup-enter';
import PopupInfo from '../potup-info/popup-info';
import MapContacts from '../map-contacts/map-contacts'
import { connect } from 'react-redux'

const App = (props) => {
  
  React.useEffect(() => {
    renderPopup(props.visibleInfo, PopupInfo)
  }, [props.visibleInfo])

  React.useEffect(() => {
    renderPopup(props.visibleEnter, PopupEnter)
  }, [props.visibleEnter])

  const renderPopup = (visible, Popup) => {
    return visible 
    ? <Popup />
    : null}

  return (
    <>
      <Header />
      <main className="page-main">
        <SectionSlider />
        <Tabs />
        <Calculator />
        <MapContacts />
      </main>
      <Footer />


      {renderPopup(props.visibleEnter, PopupEnter)}
      {renderPopup(props.visibleInfo, PopupInfo)}
    </>
  );
}

App.propTypes = {
	visibleEnter: PropTypes.bool.isRequired,
	visibleInfo: PropTypes.bool.isRequired,
}


const mapStateToProps = (state) => {
	return {
		visibleEnter: state.isPopupEnterVisible,    
		visibleInfo: state.isPopupInfoVisible
	}
};

export default connect(mapStateToProps)(App);

