/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef } from 'react';
import styles from '../InputBase.module.css';

interface TextInputProps {
  label: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  status?: 'default' | 'warning' | 'error' | 'success' | 'loading';
}

export default function TextInput({
  label,
  placeholder,
  onChange,
  disabled = false,
  status = 'default',
}: TextInputProps) {
  const inputRef = useRef<HTMLInputElement>(null); // Используем ref для управления значением

  const classNames = `${styles.input} ${styles[status]} ${disabled ? styles.disabled : ''}`;

  // Объект для сообщений в зависимости от статуса
  const statusMessages: { [key in TextInputProps['status']]: string } = {
    default: '',
    warning: 'Warning message',
    error: 'Error message',
    success: 'Success message',
    loading: '',
  };

  return (
    <div className={styles.wrapper}>
      <label className={styles.label} htmlFor="text-input">
        {label}
      </label>
      <input
        id="text-input" // Для связывания с label
        type="text"
        placeholder={placeholder}
        ref={inputRef} // Используем ref для отслеживания значения
        className={classNames}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
      />
      {/* Выводим сообщение в зависимости от статуса */}
      {(status === 'warning' || status === 'error' || status === 'success') && (
        <span className={`${styles.message} ${styles[status]}`}>
          {statusMessages[status]}
        </span>
      )}
    </div>
  );
}
