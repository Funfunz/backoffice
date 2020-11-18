import React, { FC, memo, useCallback } from 'react';
import Button, { IButtonProps } from 'components/button';
import Icon from 'components/icon';

export enum EActionType {
  edit = 'edit',
  delete = 'delete',
  view = 'view',
}

export interface IActionFunction {
  (data: any): void;
}

export interface IActionButtonProps {
  data: any;
  type: EActionType;
  onClick?: IActionFunction;
}

function getButtonProps(type: EActionType): Partial<IButtonProps> {
  switch (type) {
    case EActionType.edit:
      return { label: <Icon name="edit" /> };
    case EActionType.delete:
      return { label: <Icon name="times" />, color: 'danger' };
    case EActionType.view:
    default:
      return { label: <Icon name="eye" /> };
  }
}

const ActionButton: FC<IActionButtonProps> = ({ data, type, onClick }) => {
  const handleClick = useCallback(() => {
    if (onClick) {
      onClick(data);
    }
  }, [onClick, data]);
  return <Button {...getButtonProps(type)} onClick={handleClick} />;
};

export default memo(ActionButton);
