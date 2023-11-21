import React from 'react';
import { Link } from 'react-router-dom';

import './LogoLink.css';
import headerLogo from '../../images/logoLink.svg';

function LogoLink() {
  return (
    <Link to="/">
      <img
        className="logoLink"
        src={headerLogo}
        alt="Логотип"
      />
    </Link>
  );
}

export default LogoLink;