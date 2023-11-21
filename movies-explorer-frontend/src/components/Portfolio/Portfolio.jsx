import React from 'react';

import './Portfolio.css';

function Portfolio() {
  return (
    <section className="portfolio">
      <div className="portfolio__container">
        <h3 className="portfolio__title">Портфолио</h3>
        <ul className="portfolio__list">
          <li className="portfolio__listItem">
            <a className="portfolio__link" href="https://github.com/KonstantinSky1/how-to-learn" target="_blank">Статичный сайт</a>
          </li>
          <li className="portfolio__listItem">
            <a className="portfolio__link" href="https://github.com/KonstantinSky1/russian-travel" target="_blank">Адаптивный сайт</a>
          </li>
          <li className="portfolio__listItem">
            <a className="portfolio__link" href="https://github.com/KonstantinSky1/react-mesto-api-full" target="_blank">Одностраничное приложение</a>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Portfolio;