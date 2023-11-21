import React, { useContext } from 'react';
import { Route } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';

import './Header.css';
import Navigation from '../Navigation/Navigation.jsx';
import LogoLink from '../LogoLink/LogoLink.jsx';
import NotLogginedNavigation from '../NotLogginedNavigation/NotLogginedNavigation.jsx';

function Header() {
  const { isUserLoggined } = useContext(CurrentUserContext);

  return (
    <Route path="/(|movies|saved-movies|profile)">
      <header className="header">
        <div className="header__container">
          <LogoLink />
          { isUserLoggined() ? <Navigation /> : <NotLogginedNavigation /> }
        </div>
      </header>
    </Route>
  );
}

export default Header;