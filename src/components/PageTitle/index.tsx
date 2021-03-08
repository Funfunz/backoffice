import React, { memo, FC } from 'react'

import style from './style.module.scss'

export interface IPageTitleProps {
  text: string
}

const Button: FC<IPageTitleProps> = (props) => {
  return (
    <h1 className={style.pageTitle}>{props.text}</h1>
  )
}

export default memo(Button)
