import React, { FC, memo } from 'react'
import style from './style.module.scss'


const Hamburger: FC = () => {
  return (
    <>
      <input
        className={style.hamburgerCheckbox}
        id="hamburger"
        type="checkbox"
      ></input>
      <label htmlFor="hamburger" className={style.hamburgerButton}>
        <i className="fa fa-bars"></i>
      </label>
    </>
  )
}

export default memo(Hamburger)
