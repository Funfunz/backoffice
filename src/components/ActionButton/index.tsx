import React, { FC, memo } from 'react'

import Button, { IButtonProps } from 'components/Button'
import Icon from 'components/Icon'

import classes from './style.module.scss'

export interface IActionButtonProps {
  type: 'edit' | 'delete' | 'view' | 'goback' | 'save'
  onClick?: () => void
  navigateTo?: string
  label?: string
}

function getButtonProps(type: IActionButtonProps['type'], label: string = ''): Partial<IButtonProps> {
  switch (type) {
    case 'goback':
      return { 
        prefix: <Icon name="chevron-left" />,
        color: 'cancel',
        label,
      }
    case 'save':
      return { 
        prefix: <Icon name="save" />,
        color: 'primary',
        label,
      }
    case 'edit':
      return { 
        prefix: <Icon name="pen" />,
        color: 'edit',
        label,
      }
    case 'delete':
      return { 
        prefix: <Icon name="trash-alt" />,
        color: 'delete',
        label,
      }
    case 'view':
    default:
      return {
        prefix: <Icon name="eye" />,
        label,
      }
  }
}

const ActionButton: FC<IActionButtonProps> = ({ type, onClick, label, navigateTo }) => {
  return (
    <Button
      className={classes.actionButton}
      {...getButtonProps(type, label)} 
      navigateTo={navigateTo}
      onClick={onClick}
    />
  )
}

export default memo(ActionButton)
