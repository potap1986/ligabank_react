import React from 'react';
import './app.scss';
import Header from '../header/header';
import Footer from '../footer/footer';
import Map from '../map/map';
import Slider from '../slider/slider';
import Tabs from '../tabs/tabs';
import Calculator from '../calculator/calculator';
import PopupEnter from '../potup-enter/popup-enter';
import PopupInfo from '../potup-info/popup-info';

function App() {
  return (
    <>
      <Header />
      <main className="page-main">
        <Slider />
        <Tabs />
        <Calculator />
        <Map />
      </main>
      <Footer />

      <PopupEnter />
      <PopupInfo />
    </>
  );
}

export default App;
