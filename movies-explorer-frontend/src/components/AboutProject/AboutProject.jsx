import React from "react";

import './AboutProject.css';

function AboutProject() {
  return (
    <section className="aboutProject" id="aboutProject">
      <div className="aboutProject__container">
        <h3 className="aboutProject__title">О проекте</h3>
        <div className="aboutProject__columns">
          <div className="aboutProject__column">
            <h4 className="aboutProject__columnTitle">Дипломный проект включал 5 этапов</h4>
            <p className="aboutProject__columnText">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
          </div>
          <div className="aboutProject__column">
            <h4 className="aboutProject__columnTitle">На выполнение диплома ушло 5 недель</h4>
            <p className="aboutProject__columnText">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
          </div>
        </div>
        <div className="aboutProject__weeks">
          <div className="aboutProject__weeksOne">1 неделя</div>
          <div className="aboutProject__weeksFour">4 недели</div>
          <div className="aboutProject__weeksBack">Back-end</div>
          <div className="aboutProject__weeksFront">Front-end</div>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;