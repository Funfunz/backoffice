import React, { FC, memo, ReactNode, useCallback } from 'react'
import classNames from 'classnames'

import style from './style.module.scss'

export interface IModalProps {
  visible?: boolean
  title?: string
  description?: string
  children?: ReactNode
  actions?: ReactNode | ReactNode[]
  onClose?: () => void
}

const Modal: FC<IModalProps> = ({ visible = false, title, description, children, actions, onClose }) => {
  const handleClose = useCallback(() => {
    if (onClose) {
      onClose()
    }
  }, [onClose])

  const classes = classNames({
    [style.modalWrapper]: true,
    [style.modalVisible]: visible
  })
  return (
    <div className={classes}>
      <div className={style.modalContainer}>
        <button onClick={handleClose} className={style.modalClose}>
          X
        </button>
        {title && (
          <div className={style.modalHeader}>
            {title}
          </div>
        )}
        <div className={style.modalBody}>
          {description}
          {children}
        </div>
        <div className={style.modalFooter}>
          {actions}
        </div>
      </div>
    </div>
  )
}

export default memo(Modal)
