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
          <source media="(min-width: 1024px)" srcSet="./img/map.jpg" />
          <source media="(min-width: 768px)" srcSet="./img/map-tablet.jpg" />
          <img src="./img/map-mobile.jpg" alt="Отделения банка на карте" />
        </picture>  
      </div>
    </section>
  )
}

export default Map