import React from 'react'
import './map.scss'

const Map = () => {
  return (
    <section className="map">
      <div className="map__container container">
        <h2 id="map" className="map__title">Отделения Лига Банка</h2> 
      </div>
      <div className="map__picture container">  
        <picture>
          <source media="(max-width: 767px)" srcSet="./img/map-mobile.jpg" />
          <source media="(max-width: 1023px)" srcSet="./img/map-tablet.jpg" />
          <img src="./img/map.jpg" alt="Отделения банка на карте" />
        </picture>  
      </div>
    </section>
  )
}

export default Map