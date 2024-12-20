/* eslint-disable react/require-default-props */
/* eslint-disable react/no-unused-prop-types */
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
  const inputRef = useRef<HTMLInputElement>(null);

  const classNames = `${styles.input} ${styles[status] ? styles[status] : ''} ${disabled ? styles.disabled : ''}`;

  const statusMessages = {
    default: '',
    warning: 'Warning message',
    error: 'Error message',
    success: 'Success message',
    loading: 'Loading...',
  };

  return (
    <div className={styles.wrapper}>
      <label className={styles.label} htmlFor="text-input">
        {label}
      </label>
      <input
        id="text-input"
        type="text"
        placeholder={placeholder}
        ref={inputRef}
        className={classNames}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
      />

      {(status === 'warning' || status === 'error' || status === 'success') && (
        <span className={`${styles.message} ${styles[status]}`}>
          {statusMessages[status]}
        </span>
      )}
    </div>
  );
}
