import React from 'react'
import './tab.scss'

const Tab = ({item}) => {
  return (
    <div className="tab">
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
      <div className="tab__item">        
        <picture>
          <source media="(min-width: 1024px)" srcset={item.image} />
          <source media="(min-width: 768px)" srcset={item.imageTablet} />
          <img className="tab__image" src={item.imageMobile} alt={item.head} />
        </picture>  
      </div>
    </div>
  )
}

export default Tab