import React, { FC, memo } from "react"
import Button from 'components/button'

import style from './style.module.scss'

export interface IToolbarProps {
  toggleFilters?: any
}

const Toolbar: FC<IToolbarProps> = ({toggleFilters}) => {

  return <div className={style.toolbar}>
    <div className={style.inputSearch}>
      <div className={style.inputContainer}>
        <input type="text" placeholder="SEARCH"></input>
        <i className="fa fa-search"></i>
      </div>
      <Button prefix={<i className="fas fa-filter"></i>} label="FILTERS" onClick={() => toggleFilters()} style={{backgroundColor: "#818181", fontSize: "12px", color: "white"}}/>
    </div>
    <Button prefix={<i className="fas fa-plus"></i>} label="NEW" onClick={() => {}} style={{backgroundColor: "#DCA50B", fontSize: "12px", color: "white"}}/>
  </div>
}

export default memo(Toolbar)