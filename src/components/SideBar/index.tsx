import React, { FC, memo, useCallback, useState } from 'react'
import { NavLink } from 'react-router-dom'

import { useEntities } from 'hooks/useEntities'

import style from './style.module.scss'

export interface ISideBarProps {
  isSearchable?: boolean
  visible?: number
}

const SideBar: FC<ISideBarProps> = ({ isSearchable = true, visible = 10 }) => {

  const [searchTerm, setSearch] = useState('')
  const handleSearch = useCallback((event) => setSearch(event.target.value), [])

  const { loading, entities } = useEntities(searchTerm)
  
  const [show, setShow] = useState(visible)
  const showMore = useCallback(() => setShow(entities.length), [entities.length])
  const showLess = useCallback(() => setShow(visible), [visible])

  return <>
    <aside className={style.sideMenuSpace}></aside>
    <aside className={style.sideMenu}>
      <div className={style.container}>
        <p className={style.menuLabel}>Content Types</p>
        {isSearchable && (
          <div className={style.search}>
            <input 
              type="text"
              placeholder="SEARCH"
              name='search'
              autoComplete="off"
              value={searchTerm}
              onChange={handleSearch}
            />
            <i className="fa fa-search"></i>
          </div>
        )}
        <ul className={style.menuList}>
          {loading
            ? <p className={style.loading}>Loading...</p>
            : entities.slice(0, searchTerm ? entities.length : show).map(
              (entity, index: number) => (
                <NavLink
                  key={index}
                  to={`/list/${entity.name}`}
                  activeClassName={style.active}
                >
                  {entity.label}
                </NavLink>
              )
            )
          }
        </ul>
        {show && !searchTerm && (
          show < entities.length 
            ? <button className={style.load} onClick={showMore}>Show more</button>
            : entities.length > visible && (
                <button className={style.load} onClick={showLess}>Show less</button>
              )
        )}  
      </div>
      <div className={style.account}>
        <span>example2@gmail.com</span>
        <i className="fas fa-power-off"></i>
      </div>
    </aside>
  </>
}

export default memo(SideBar)