import React, { FC, memo } from 'react'
import style from './style.module.scss'

import Dashboard from 'components/dashboard'
import Welcome from 'components/dashboard/components/welcome'
import QuickActions from 'components/dashboard/components/quick-actions'
import AtGlance from 'components/dashboard/components/at-a-glance'
import MoreActions from 'components/dashboard/components/more-actions'
import PageTitle from 'components/page-title'

export interface IHomeProps {}

const Home: FC<IHomeProps> = () => {

  return (
    <div className={style.homeContainer}>
      <PageTitle text='dashboard'/>
      <Dashboard>
        <Welcome />
        <QuickActions />
        <AtGlance />
        <MoreActions />
      </Dashboard>
    </div>
  )
}

export default memo(Home)
