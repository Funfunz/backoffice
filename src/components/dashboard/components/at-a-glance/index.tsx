import React, { memo, FC } from 'react'
import { NavLink } from 'react-router-dom'
import Widget from 'components/dashboard/components/widget'
import style from './style.module.scss'


const AtGlance: FC = () => {
  return (
    <Widget>
      <div className={style.atGlanceContainer}>
        <p className={style.title}>At a Glance</p>
          <div className={style.entitiesContainer}>
            <p className={style.entity}>
              17
              <NavLink to={`/todo`}>
                Quisquam
              </NavLink>
            </p>
            <p className={style.entity}>
              34
              <NavLink to={`/todo`}>
                Dolorem
              </NavLink>
            </p>
            <p className={style.entity}>
              5
              <NavLink to={`/todo`}>
                Adipisci
              </NavLink>
            </p>
        </div>
      </div>
    </Widget>
  )
}

export default memo(AtGlance)
