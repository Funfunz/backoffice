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
      </aside>
    </>
  );
};

export default memo(SideMenu);
