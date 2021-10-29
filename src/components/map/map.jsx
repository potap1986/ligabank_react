import React from 'react'
import './map.scss'

const Map = () => {
  return (
    <section className="map">
      <div className="map__container container">
        <h2 id="map" className="map__title">Отделения Лига Банка</h2>   
        <picture>
          <source media="(min-width: 1024px)" srcset="./img/map.jpg" />
          <source media="(min-width: 768px)" srcset="./img/map-tablet.jpg" />
          <img src="./img/map-mobile.jpg" alt="Отделения банка на карте" />
        </picture>  
      </div>
    </section>
  )
}

export default Map