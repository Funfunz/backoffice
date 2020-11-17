import React, { FC, memo } from "react";
import style from './style.module.scss';

const TopMenu: FC = () => {
  return (
    <nav className={style.topMenu} role="navigation" aria-label="main navigation">
    </nav>      
  )
}

export default memo(TopMenu);