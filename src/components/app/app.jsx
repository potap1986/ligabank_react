import React from 'react';
import './app.scss';
import Header from '../header/header';
import Intro from '../intro/intro';
import Footer from '../footer/footer';
import Map from '../map/map';

function App() {
  return (
    <>
      <Header />
      <main className="page-main">
        
        <Intro />
        <Map />
      </main>
      <Footer />
    </>
  );
}

export default App;
