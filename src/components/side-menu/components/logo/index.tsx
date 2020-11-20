import React, { FC, memo } from 'react';
import { Link } from 'react-router-dom';
import logo from 'assets/logo_placeholder.svg';
import style from './style.module.scss';

const Logo: FC = () => {
  return (
    <Link to="/" className={style.logo}>
      <img src={logo} alt="logo" />
    </Link>
  );
};

export default memo(Logo);
