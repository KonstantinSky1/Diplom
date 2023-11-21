import React from "react";

import './NavTab.css';

function NavTab() {
  return (
    <nav className="navTab">
      <a href="#aboutProject" className="navTab__item">О проекте</a>
      <a href="#techs" className="navTab__item">Технологии</a>
      <a href="#aboutMe" className="navTab__item">Студент</a>
    </nav>
  );
}

export default NavTab;