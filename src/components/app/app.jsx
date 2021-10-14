import React from 'react';
import './app.scss';
import Header from '../header/header';
import Footer from '../footer/footer';
import Map from '../map/map';
import Slider from '../slider/slider';

function App() {
  return (
    <>
      <Header />
      <main className="page-main">
        <Slider />
        <Map />
      </main>
      <Footer />
    </>
  );
}

export default App;
