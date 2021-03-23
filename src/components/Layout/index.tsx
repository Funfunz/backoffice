import React, { FC, memo } from 'react'
import { Route } from 'react-router-dom'
import classNames from 'classnames'
import TopMenu from 'components/TopMenu'
import style from './style.module.scss'
import Hamburger from 'components/Hamburger'
import Logo from 'components/Logo'
import SideBar from 'components/SideBar'

export interface ILayoutProps {
  children?: any[] | any;
  className?: string;
}

const Layout: FC<ILayoutProps> = ({ children, className = '' }) => {
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
        <div className={style.children}>{children}</div>
      </div>
    </div>
  )
}

export default memo((props: ILayoutProps) => {
  const path = Array.isArray(props.children)
    ? props.children.map((route: any) => route.props.path)
    : props.children.props.path
  const render = () => <Layout {...props} />
  return <Route exact path={path} render={render} />
})
