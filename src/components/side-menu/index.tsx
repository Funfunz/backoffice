import React, { FC, memo } from 'react';
import { NavLink } from 'react-router-dom';
import useTables from 'hooks/useTables';
import Logo from './components/logo';
import Hamburger from './components/hamburger';
import style from './style.module.scss';

export interface ISideMenuProps {}

const SideMenu: FC<ISideMenuProps> = () => {
  const { tables, loading } = useTables();
  return (
    <>
      <Hamburger />
      <Logo />
      <aside className={style.sideMenuSpace}></aside>
      <aside className={style.sideMenu}>
        <div className={style.container}>
          <p className={style.menuLabel}>Content Types</p>
          <ul className={style.menuList}>
            {loading ? (
              <p>Loading...</p>
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
        <a className={style.account}>
          <span>example@gmail.com</span>
          <i className="fas fa-power-off"></i>
        </a>
      </aside>
    </>
  );
};

export default memo(SideMenu);
