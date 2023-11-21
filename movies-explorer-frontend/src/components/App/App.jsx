import React, { useContext } from "react";
import { Route, Switch, Redirect } from 'react-router-dom';

import './App.css';

import Header from '../Header/Header.jsx';
import Main from '../Main/Main.jsx';
import Footer from '../Footer/Footer.jsx';
import Movies from '../Movies/Movies.jsx';
import SavedMovies from '../SavedMovies/SavedMovies.jsx';
import Profile from '../Profile/Profile.jsx';
import Register from '../Register/Register.jsx';
import Login from '../Login/Login.jsx';
import PageNotFound from '../PageNotFound/PageNotFound.jsx';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute.jsx';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import InfoTooltip from '../InfoTooltip/InfoTooltip.jsx';

function App() {
  const { isLoading, isUserLoggined, stateInfoTooltip, setStateInfoTooltip } = useContext(CurrentUserContext);

  return isLoading() ? 'загрузка' : (
    <>
      <Header />
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>

        <ProtectedRoute path="/movies">
          <Movies />
        </ProtectedRoute>

        <ProtectedRoute path="/saved-movies">
          <SavedMovies />
        </ProtectedRoute>

        <ProtectedRoute path="/profile">
          <Profile />
        </ProtectedRoute>

        <Route path="/signin">
          {isUserLoggined() ? <Redirect to="/" /> : <Login />}
        </Route>

        <Route path="/signup">
          {isUserLoggined() ? <Redirect to="/" /> : <Register />}
        </Route>

        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>
      <Footer />
      <InfoTooltip
        stateInfoTooltip={stateInfoTooltip}
        setStateInfoTooltip={setStateInfoTooltip}
      />
    </>
  );
}

export default App;