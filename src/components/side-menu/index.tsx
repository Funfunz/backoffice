import React, { FC, memo, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import useTables from 'hooks/useTables'
import Logo from './components/logo'
import Hamburger from './components/hamburger'
import style from './style.module.scss'
import { desktopSize } from 'utils'


export interface ISideMenuProps {
  isSearchable: boolean;
  visible?: number;
}

const SideMenu: FC<ISideMenuProps> = ({isSearchable, visible = 10}) => {
  const { tables, loadingTables } = useTables()
  const [toggle, setToggle] = useState(window.innerWidth < desktopSize)
  const [searchTerm, setSearchTerm] = useState('')
  const [tablesResult, setTablesResult] = useState<any>([]) 
  const [show, setShow] = useState(visible)
  const [isSearching, setIsSearching] = useState(false)

  const handleToggle = () => {
    setToggle(!toggle)
  }

  useEffect(() => {
    setTablesResult(tables)
  }, [tables])

  const handleOnChangeSearch = (event: any) =>{
    setSearchTerm(event.target.value)
    if(event.target.value !== ""){
      const filteredResult = tablesResult.filter((table: any) =>{
        return table.layout.label.toLowerCase().includes(searchTerm.toLowerCase())
      })
      setTablesResult(filteredResult)
      setIsSearching(true)
    }else{
      setTablesResult(tables)
      setIsSearching(false)
    }
  }

  const showMoreTables = () =>{
    setShow(tablesResult.length)
  }

  const showLessTables = () =>{
    setShow(visible)
  }

  return (
    <>
      <Hamburger change={handleToggle} value={toggle} />
      <Logo />
      <aside className={style.sideMenuSpace}></aside>
      <aside className={style.sideMenu}>
        <div className={style.container}>
          <p className={style.menuLabel}>Content Types</p>
          {isSearchable && <div className={style.search}>
              <input type="text" placeholder="SEARCH" name='search' autoComplete={'off'} value={searchTerm} onChange={handleOnChangeSearch}/>
              <i className="fa fa-search"></i>
            </div>
          }
          <ul className={style.menuList}>
            {loadingTables ? (
              <p className={style.loading}>Loading...</p>
            ) : (
              tablesResult.slice(0, !isSearching ? show : tablesResult.length).map((table: any, index: number) => (
                <NavLink
                  key={index}
                  to={`/list/${table.name}`}
                  activeClassName={style.active}
                >
                  {table.layout.label}
                </NavLink>
              ))
            )}
          </ul>
          {show && !isSearching && (show < tablesResult.length ?
            <button className={style.load} onClick={showMoreTables}>Show more</button>
          : (tablesResult.length > visible && <button className={style.load} onClick={showLessTables}>Show less</button>))}
        </div>
        <div className={style.account}>
          <span>example@gmail.com</span>
          <i className="fas fa-power-off"></i>
        </div>
      </aside>
    </>
  )
}

export default memo(SideMenu)
