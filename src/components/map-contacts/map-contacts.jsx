import React from 'react'
import { YMaps, Map, Placemark } from 'react-yandex-maps';
import './map-contacts.scss'

const MapContacts = () => (
  <section className="map-contacts">
    <div className="map-contacts__container container">
      <h2 id="map" className="map-contacts__title">Отделения Лига Банка</h2> 
    </div>
    <YMaps>
      <div className="map-contacts__picture container">
        <Map width="100%" height="100%" defaultState={{ center: [59.968137, 30.316272], zoom: 13 }}>
          <Placemark geometry={[59.968137, 30.316272]} options={{
            iconLayout: 'default#image',
            iconImageHref: 'image/location.svg',
            iconImageSize: [32, 40],
          }} />
        </Map>
      </div>
    </YMaps>
  </section>
)

export default MapContacts