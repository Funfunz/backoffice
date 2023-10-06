import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import classNames from 'classnames'
import TopMenu from 'components/TopMenu'
import style from './style.module.scss'
import Hamburger from 'components/Hamburger'
import Logo from 'components/Logo'
import SideBar from 'components/SideBar'

export interface ILayoutProps {
  className?: string;
}

export const Layout: FC<ILayoutProps> = ({ className = '' }) => {
  const layoutClasses = classNames({
    [style.container]: true,
    [className]: className,
  })
  return (
    <div className={layoutClasses}>
      <Hamburger />
      <Logo />
      <SideBar />
      <TopMenu />
      <div className={style.main}>
        <div className={style.children}><Outlet/></div>
      </div>
    </div>
  )
}

