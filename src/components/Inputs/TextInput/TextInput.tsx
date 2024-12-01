/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import styles from '../InputBase.module.css';

interface TextInputProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  // eslint-disable-next-line react/require-default-props
  disabled?: boolean;
  // eslint-disable-next-line react/require-default-props
  status?: 'default' | 'warning' | 'error' | 'success' | 'loading';
}

export default function TextInput({
  label,
  placeholder,
  value,
  onChange,
  disabled = false,
  status = 'default',
}: TextInputProps) {
  const classNames = `${styles.input} ${styles[status]} ${disabled ? styles.disabled : ''}`;

  return (
    <div className={styles.wrapper}>
      <label className={styles.label}>{label}</label>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={classNames}
        disabled={disabled}
      />
      {(status === 'warning' || status === 'error' || status === 'success') && (
        <span className={`${styles.message} ${styles[status]}`}>
          {status === 'warning' && 'Warning message'}
          {status === 'error' && 'Error message'}
          {status === 'success' && 'Success message'}
        </span>
      )}
    </div>
  );
}
