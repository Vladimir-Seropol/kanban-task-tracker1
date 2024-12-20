/* eslint-disable react/button-has-type */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/function-component-definition */
/* eslint-disable react/require-default-props */
import React from 'react';
import style from './style.module.css';

interface ButtonProps {
  text: string;
  type: 'button' | 'submit' | 'reset';

  onClick?:
    | React.MouseEventHandler<HTMLButtonElement>
    | React.FormEventHandler<HTMLButtonElement>;

  children?: React.ReactNode;

  disabled?: boolean;

  inlineStyle?: React.CSSProperties;

  svg?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  disabled = false,
  type,
  inlineStyle,
  svg,
}) => {
  return (
    <button
      className={style.button}
      onClick={onClick}
      disabled={disabled}
      type={type}
      style={inlineStyle}
    >
      {svg && svg}
      {text}
    </button>
  );
};

export default Button;
