import React from 'react';
import style from './style.module.css';

// Интерфейс пропсов для Button
interface ButtonProps {
  text: string;
  type: 'button' | 'submit' | 'reset';
  // eslint-disable-next-line react/require-default-props, prettier/prettier
  onClick?: React.MouseEventHandler<HTMLButtonElement> | React.FormEventHandler<HTMLButtonElement>;
  // eslint-disable-next-line react/no-unused-prop-types, react/require-default-props
  children?: React.ReactNode;
  // eslint-disable-next-line react/require-default-props
  disabled?: boolean;
  // eslint-disable-next-line react/require-default-props
  inlineStyle?: React.CSSProperties; // Используем inlineStyle
  // Добавляем пропс для SVG
  // eslint-disable-next-line react/require-default-props
  svg?: React.ReactNode;
}

// eslint-disable-next-line react/function-component-definition
const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  disabled = false,
  type,
  inlineStyle, // Используем inlineStyle
  svg, // Используем пропс для SVG
}) => {
  return (
    <button
      className={style.button} // Используем класс из CSS-модуля
      onClick={onClick}
      disabled={disabled}
      // eslint-disable-next-line react/button-has-type
      type={type}
      style={inlineStyle} // Применяем inline-стили
    >
      {/* Выводим SVG, если он передан */}
      {svg && svg}
      {text}
    </button>
  );
};

export default Button;
