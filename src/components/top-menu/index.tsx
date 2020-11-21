import React, { FC, memo, useState } from "react";
import style from './style.module.scss';

const TopMenu: FC = () => {
  const [showOptions, setShowOptions] = useState(false);

  const toggleShow = () =>{
    setShowOptions(!showOptions);
  }

  return (
    <nav className={style.topMenu} role="navigation" aria-label="main navigation">
      <div className={style.account} onClick={() => toggleShow()}>
        <span>example@gmail.com</span>
        {showOptions ?
          <i className="fas fa-chevron-right"></i>
          :
          <i className="fas fa-chevron-down"></i>
        }
      </div>      
      {showOptions &&
        <div className={style.accountOptions}>
          <div>
          <span>logout</span>
          <i className="fas fa-power-off"></i>
          </div>
        </div>
      }
    </nav>      
  )
}

export default memo(TopMenu);