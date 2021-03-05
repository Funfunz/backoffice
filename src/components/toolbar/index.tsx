import React, { FC, memo } from 'react'
import Button from 'components/button'

import style from './style.module.scss'
import { NavLink, useParams } from 'react-router-dom'

export interface IToolbarProps {
  toggleFilters?: any;
}

const Toolbar: FC<IToolbarProps> = ({ toggleFilters }) => {
  const params = useParams<{tableName: string}>()
  return (
    <div className={style.toolbar}>
      <div className={style.inputSearch}>
        <div className={style.inputContainer}>
          <input type="text" placeholder="SEARCH"></input>
          <i className="fa fa-search"></i>
        </div>
        <Button
          prefix={<i className="fas fa-filter"></i>}
          label="FILTERS"
          onClick={() => toggleFilters()}
          color='secondary'
        />
      </div>
      <NavLink to={`/edit/${params.tableName}`} activeClassName={style.active}>
        <Button
          prefix={<i className="fas fa-plus"></i>}
          label="NEW"
          color='primary'
        />
      </NavLink>
    </div>
  )
}

export default memo(Toolbar)
