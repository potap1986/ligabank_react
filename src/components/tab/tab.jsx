import React from 'react'
import './tab.scss'

const Tab = ({item, id, activeTab}) => {
  return (
    <div className={"tab" + (id !== activeTab ? " visually-hidden" : " ")}>
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
        <img className="tab__image" src={item.image} alt={item.head}/>       
      </div>
    </div>
  )
}

export default Tab