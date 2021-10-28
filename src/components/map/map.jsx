import React from 'react'
import './map.scss'

const Map = () => {
  return (
    <section className="map">
      <div className="map__container container">
        <h2 id="map" className="map__title">Отделения Лига Банка</h2>
        <img src="./img/map.jpg" alt="Отделения банка на карте" />
      </div>
    </section>
  )
}

export default Map