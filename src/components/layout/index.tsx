import React, { FC, memo } from 'react'
import { Route } from 'react-router-dom'
import classNames from 'classnames'
import TopMenu from 'components/top-menu'
import SideMenu from 'components/side-menu'
import style from './style.module.scss'

export interface ILayoutProps {
  children?: any[] | any;
  className?: string;
}

const Layout: FC<ILayoutProps> = ({ children, className = '' }) => {
  const layoutClasses = classNames({
    [style.layout]: true,
    [className]: className,
  })
  return (
    <div className={layoutClasses}>
      <SideMenu isSearchable visible={10}/>
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
