import React from 'react';

import './AboutMe.css';
import studentPhoto from '../../images/KonstantinSolnishko.jpg';

function AboutMe() {
  return (
    <section className="aboutMe" id="aboutMe">
      <div className="aboutMe__container">
        <h3 className="aboutMe__headerTitle">Студент</h3>
        <div className="aboutMe__columns">
          <div className="aboutMe__textColumn">
            <div className="aboutMe__textContent">
              <h2 className="aboutMe__title">Константин</h2>
              <h3 className="aboutMe__subTitle">Фронтенд-разработчик, 37 лет</h3>
              <p className="aboutMe__text">Я родился и живу в Алматы, закончил КазНТУ, факультет АТМ. У меня есть ноутбук и отдельный монитор. Я люблю решать задачи на Codewars, а ещё увлекаюсь бегом. Начал кодить с конца 2021г. С 19лет работал на себя, занимался оптовыми продажами товаров. В данный момент прохожу курс по веб-разработке и пишу дипломную работу. После планирую найти постоянную работу Веб-разработчиком.</p>
            </div>
            <div className="aboutMe__links">
              <a className="aboutMe__link" target="_blank" href="https://www.codewars.com/users/KonstantinSky/completed">Codewars</a>
              <a className="aboutMe__link" target="_blank" href="https://github.com/KonstantinSky1?tab=repositories">Github</a>
            </div>
          </div>
          <div className="aboutMe__imgColumn">
            <img src={studentPhoto} alt="Фото студента" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutMe;