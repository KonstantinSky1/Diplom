import React, { useContext } from 'react';
import { Route, Redirect } from "react-router-dom";
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';

function ProtectedRoute({ children, path }) {
  const { isUserLoggined } = useContext(CurrentUserContext);

  return (
    <Route path={path}>
      {isUserLoggined() ? children : <Redirect to="/" />}
    </Route>
  );
}

export default ProtectedRoute;