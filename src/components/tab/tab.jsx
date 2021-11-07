import React, { useState } from 'react'
import PropTypes from "prop-types"
import './tab.scss'

const Tab = ({item}) => {
  const backgroundMobile = {backgroundImage: "url(" + item.imageMobile + ")"}
  const [backgroundMobileVisible, setVisible] = useState(window.matchMedia('(min-width: 768px)').matches ? null : backgroundMobile)
  const mediaQuery = window.matchMedia('(min-width: 768px)')
  mediaQuery.addListener(() => {
    if (mediaQuery.matches) {
      setVisible(null)
    } else {
      setVisible(backgroundMobile)
    }
  })
  return (
    <div
      style={backgroundMobileVisible}
      className="tab">
      <div className="tab__item">
        <p className="tab__title"> 
          {item.title}
        </p>
        <ul className="tab__list">
          {item.advantages.map((advantage, index) => (
            <li
              key={advantage + index}
              className="tab__avantage"
            >              
              <svg className="tab__avantage-svg" width="13" height="10">
                  <use xlinkHref="#check"/>
              </svg>
              <p className="tab__avantage-text">{advantage}</p>
            </li>
          ))}
        </ul>
        {item.info ?
          <p className="tab__info">
            {item.info}
            <a className="tab__link" href={item.link.href}>{item.link.name}</a>
          </p>
          : null
        }
        {item.button ?
          <a  className="tab__button" href={item.button.href}>{item.button.name}</a>
          : null
        }
      </div>    
      <picture className="tab__item">
        <source media="(min-width: 1024px)" srcSet={item.image} />
        <source media="(min-width: 768px)" srcSet={item.imageTablet} />
        <img src={item.imageMobile} alt={item.head} />
      </picture>  
    </div>
  )
}

Tab.propTypes = {
  item: PropTypes.shape({
    svg: PropTypes.string.isRequired,
    head: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    advantages: PropTypes.arrayOf(
      PropTypes.string.isRequired,
    ).isRequired,
    image: PropTypes.string.isRequired,
    imageTablet: PropTypes.string.isRequired,
    imageMobile: PropTypes.string.isRequired,
    button: PropTypes.shape({
      name: PropTypes.string,
      href: PropTypes.string
    }),    
    link: PropTypes.shape({
      name: PropTypes.string,
      href: PropTypes.string
    })
  }).isRequired
}

export default Tab