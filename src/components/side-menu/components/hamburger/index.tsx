import React, { FC, memo } from 'react';
import style from './style.module.scss';

interface HamburgerProps {
  change: () => void;
  value: boolean;
}

const Hamburger: FC<HamburgerProps> = ({ change, value }) => {
  return (
    <>
      <input
        className={style.hamburgerCheckbox}
        id="hamburger"
        type="checkbox"
        checked={value}
        onChange={change}
      ></input>
      <label htmlFor="hamburger" className={style.hamburgerButton}>
        <i className="fa fa-bars"></i>
      </label>
    </>
  );
};

export default memo(Hamburger);
