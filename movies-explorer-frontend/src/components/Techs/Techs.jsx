import React from 'react';

import './Techs.css';

function Techs() {
  return (
    <section className="techs" id="techs">
      <div className="techs__container">
        <h3 className="techs__headerTitle">Технологии</h3>
        <div className="techs__textBlock">
          <h2 className="techs__title">7 технологий</h2>
          <p className="techs_text">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
        </div>
        <div className="techs_listWrapper">
          <ul className="techs_list">
            <li className="techs_listItem">HTML</li>
            <li className="techs_listItem">CSS</li>
            <li className="techs_listItem">JS</li>
            <li className="techs_listItem">React</li>
            <li className="techs_listItem">Git</li>
            <li className="techs_listItem">Express.js</li>
            <li className="techs_listItem">mongoDB</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Techs;