import React, { KeyboardEvent, useCallback } from 'react';
import classNames from 'classnames';
import { serialize } from '../../utils/serialize';
import style from './style.module.scss';

type InputTypes =
  | 'text'
  | 'password'
  | 'number'
  | 'date'
  | 'time'
  | 'email'
  | 'select'
  | 'checkbox'
  | 'radio'
  | 'checkbox-group'
  | 'switch';

export interface InputEvent {
  type: InputTypes;
  name?: string;
  value?: any;
  isValid: boolean;
}

export interface HtmlInputEvent {
  target: {
    value?: any;
    name?: string;
  };
}

export interface InputOption {
  value: any;
  description: string;
}

const defaultFormater = (value: string) => value;

export interface GetInputProps {
  modifier?: string;
  type: InputTypes;
  name?: string;
  prefix?: any;
  suffix?: any;
  value?: any;
  placeholder?: string;
  readOnly?: boolean;
  disabled?: boolean;
  required?: boolean;
  max?: string;
  min?: string;
  options?: InputOption[];
  onChange?: (event: HtmlInputEvent) => void;
  onKeyUp?: (event: KeyboardEvent) => void;
}

function getInput({
  type,
  value,
  name,
  placeholder,
  disabled,
  options,
  max,
  min,
  onChange,
  onKeyUp,
}: GetInputProps) {
  switch (type) {
    case 'text':
    case 'password':
    case 'number':
    case 'time':
    case 'email':
    case 'date':
      const extraDateProps = type === 'date' ? { min, max } : {};
      return (
        <input
          type={type}
          value={value}
          disabled={disabled}
          onChange={onChange}
          onKeyUp={onKeyUp}
          placeholder={placeholder}
          {...extraDateProps}
        />
      );
    case 'switch':
      return (
        <label className={style.switch}>
          <input type="checkbox" />
          <span className={classNames(style.slider, style.round)}></span>
        </label>
      );
    case 'select':
      return (
        <select
          disabled={disabled}
          onChange={onChange}
          name={name}
          value={value}
        >
          {options &&
            options.map((option, index) => (
              <option key={index} value={option.value}>{option.description}</option>
            ))}
        </select>
      );
    case 'checkbox':
      return (
        <label className={style.containerInput}>
          <input
            type="checkbox"
            disabled={disabled}
            onChange={onChange}
            checked={serialize(value) === 'true'}
          ></input>
          {name && <span className={style.inputLabel}>{name}</span>}
        </label>
      );
    case 'radio':
    case 'checkbox-group':
      return options && options.length > 0
        ? options.map((option, index) => (
            <div key={index}>
              <label className={style.containerInput}>
                <input
                  type={type === 'checkbox-group' ? 'checkbox' : 'radio'}
                  name={`${index}`}
                  value={option.value}
                  disabled={disabled}
                  onChange={onChange}
                  checked={option.value === value}
                />
                <span className={style.inputLabel}>{option.description}</span>
              </label>
            </div>
          ))
        : null;
    default:
      return null;
  }
}

export interface InputProps {
  type: InputTypes;
  name?: string;
  prefix?: any;
  suffix?: any;
  value?: any;
  placeholder?: string;
  readOnly?: boolean;
  disabled?: boolean;
  max?: string;
  min?: string;
  options?: InputOption[];
  validation?: (value: any) => boolean;
  onChange?: (event: InputEvent) => void;
  onKeyUp?: (event: KeyboardEvent) => void;
  formater?: (value: string) => any;
}

const Input: React.FC<InputProps> = React.memo<InputProps>(
  ({
    type,
    name,
    prefix,
    suffix,
    value,
    readOnly,
    placeholder,
    disabled = false,
    options,
    max,
    min,
    onChange,
    onKeyUp,
    validation = () => true,
    formater = defaultFormater,
  }) => {
    const handleOnChange = useCallback(
      (lastValue: any) => (event: HtmlInputEvent) => {
        if (onChange) {
          const value = formater(event.target.value);
          const isValid = validation ? validation(value) : true;
          onChange({
            type,
            name,
            value: isValid ? value : lastValue,
            isValid,
          } as InputEvent);
        }
      },
      [onChange, formater, validation, type, name]
    );

    const inputStyles = classNames(style.input, {
      [style.inputRadio]: type === 'radio',
      [style.inputCheckbox]: type === 'checkbox-group' || type === 'checkbox',
      [style.select]: type === 'select',
      [style.inputSwitch]: type === 'switch',
    });

    return (
      <div className={inputStyles}>
        <div className={style.columns}>
          {prefix ? (
            <div
              className={classNames(
                style.column,
                style.colAuto,
                style.inputPrefix
              )}
            >
              {prefix}
            </div>
          ) : null}
          <div className={classNames(style.column, style.colGrow)}>
            {readOnly ? (
              <input type={type} value={serialize(value) || '-'} readOnly />
            ) : (
              getInput({
                type,
                name,
                value: serialize(value),
                placeholder,
                disabled,
                options,
                max,
                min,
                onChange: handleOnChange(value),
                onKeyUp,
              })
            )}
          </div>
          {suffix ? (
            <div
              className={classNames(
                style.column,
                style.colAuto,
                style.inputSuffix
              )}
            >
              {suffix}
            </div>
          ) : null}
        </div>
      </div>
    );
  }
);

export { Input };
