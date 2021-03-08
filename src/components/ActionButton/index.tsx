import React, { FC, memo } from 'react'
import Button, { IButtonProps } from 'components/button'
import Icon from 'components/icon'

import classes from './style.module.scss'

export interface IActionButtonProps {
  type: 'edit' | 'delete' | 'view'
  onClick?: () => void
  label?: string
}

function getButtonProps(type: IActionButtonProps['type'], label: string = ''): Partial<IButtonProps> {
  switch (type) {
    case 'edit':
      return { prefix: <Icon name="pen" />, color: 'edit', label }
    case 'delete':
      return { prefix: <Icon name="trash-alt" />, color: 'delete', label }
    case 'view':
    default:
      return { prefix: <Icon name="eye" />, label }
  }
}

const ActionButton: FC<IActionButtonProps> = ({ type, onClick, label }) => {
  return (
    <Button
      className={classes.actionButton}
      {...getButtonProps(type, label)} 
      onClick={onClick} 
    />
  )
}

export default memo(ActionButton)
