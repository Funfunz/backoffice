import React, { FC, memo, useCallback } from 'react';
import { Button, IButtonProps } from 'components/button';
import { Icon } from 'components/icon';

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
  label?: string;
}

function getButtonProps(type: EActionType, label: string): Partial<IButtonProps> {
  switch (type) {
    case EActionType.edit:
      return { prefix: <Icon name="pen" />, label };
    case EActionType.delete:
      return { prefix: <Icon name="trash-alt" />, color: 'delete', label };
    case EActionType.view:
    default:
      return { prefix: <Icon name="eye" />, label };
  }
}

const ActionButtonComponent: FC<IActionButtonProps> = ({ data, type, onClick, label }) => {
  const handleClick = useCallback(() => {
    if (onClick) {
      onClick(data);
    }
  }, [onClick, data]);
  return <Button {...getButtonProps(type, label ? label : "")} onClick={handleClick} />;
};

export const ActionButton = memo(ActionButtonComponent);
