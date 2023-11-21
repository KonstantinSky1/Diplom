import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import './Navigation.css';

function Navigation() {
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);

  useEffect(() => {
    if (isBurgerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }
  }, [isBurgerOpen]);

  function handleBurgerClick() {
    setIsBurgerOpen(!isBurgerOpen);
  }

  return (
    <div className="navigation">
      <div
        className={`navigation__burger ${isBurgerOpen ? "active" : ""}`}
        onClick={handleBurgerClick}
      >
        <span></span>
      </div>

      <div className={`navigation__cover ${isBurgerOpen ? "active" : ""}`}></div>

      <nav className={`navigation__links ${isBurgerOpen ? "active" : ""}`}>
        <div className="navigation__content">
          <div className="navigation__moviesBlock">
            <NavLink
              exact to="/"
              className="navigation__movieLink navigation__movieLink_isVisible"
            >
              Главная
            </NavLink>
            <NavLink
              to="/movies"
              activeClassName="navigation__movieLink_isActive"
              className="navigation__movieLink"
            >
              Фильмы
            </NavLink>
            <NavLink
              to="/saved-movies"
              activeClassName="navigation__movieLink_isActive"
              className="navigation__movieLink"
            >
              Сохранённые фильмы
            </NavLink>
          </div>

          <div className="navigation__accountBlock">
            <NavLink
              to="/profile"
              activeClassName="navigation__movieLink_isActive"
              className="navigation__accountLink"
            >
              <span className="navigation__accText">Аккаунт</span>
              <span className="navigation__icon"></span>
            </NavLink>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navigation;