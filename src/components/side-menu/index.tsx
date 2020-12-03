import React, { FC, memo, useState } from 'react';
import { NavLink } from 'react-router-dom';
import useTables from 'hooks/useTables';
import Logo from './components/logo';
import Hamburger from './components/hamburger';
import style from './style.module.scss';
import { desktopSize } from 'utils';

export interface ISideMenuProps {
  isSearchable: boolean;
}

const SideMenu: FC<ISideMenuProps> = ({isSearchable}) => {
  const { tables, loading } = useTables();
  const [toggle, setToggle] = useState(window.innerWidth < desktopSize);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  return (
    <>
      <Hamburger change={handleToggle} value={toggle} />
      <Logo />
      <aside className={style.sideMenuSpace}></aside>
      <aside className={style.sideMenu}>
        <div className={style.container}>
          <p className={style.menuLabel}>Content Types</p>
          {isSearchable && <div className={style.search}>
              <input type="text" placeholder="SEARCH"></input>
              <i className="fa fa-search"></i>
            </div>
          }
          <ul className={style.menuList}>
            {loading ? (
              <p className={style.loading}>Loading...</p>
            ) : (
              tables.map((table: any, index: number) => (
                <NavLink
                  key={index}
                  to={`/table/${table.name}`}
                  activeClassName={style.active}
                >
                  {table.layout.label}
                </NavLink>
              ))
            )}
          </ul>
        </div>
        <div className={style.account}>
          <span>example@gmail.com</span>
          <i className="fas fa-power-off"></i>
        </div>
      </aside>
    </>
  );
};

export default memo(SideMenu);
