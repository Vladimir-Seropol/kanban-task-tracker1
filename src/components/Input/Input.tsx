/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/require-default-props */
import React, { useState } from 'react';
import Image from 'next/image';
import { inter } from '@/assets/fonts/fonts';

import styles from './Input.module.css';

import warningStatusImage from '../../assets/images/input-status/danger-status.svg';
import successStatusImage from '../../assets/images/input-status/success-status.svg';
import errorStatusImage from '../../assets/images/input-status/error-status.svg';

interface InputProps {
  placeholder: string;
  status: 'default' | 'loading' | 'warning' | 'error' | 'success';
  disabled?: boolean;
  label?: string;
  icon?: string;
}

export default function Input({
  placeholder = '',
  status = 'default',
  disabled = false,
  label,
  icon,
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [value, setValue] = useState('');
  const [statusMessage, setStatusMessage] = useState(
    status.charAt(0).toUpperCase() + status.slice(1),
  );

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => {
    setIsFocused(false);
    setIsTyping(false);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setIsTyping(e.target.value.length > 0);
  };

  const getClassNames = () => {
    let classNames = styles.input;
    if (isFocused) classNames += ` ${styles.focus}`;
    if (isTyping) classNames += ` ${styles.typing}`;
    if (disabled) classNames += ` ${styles.disabled}`;
    if (status !== 'default') classNames += ` ${styles[status]}`;
    return classNames;
  };

  return (
    <div className={styles.wrapper}>
      {label && <label className={styles.label}>{placeholder}</label>}
      <div
        className={`${styles.inputContainer} ${isFocused || isTyping ? styles.active : ''}`}
      >
        <input
          type="text"
          className={getClassNames()}
          placeholder={placeholder}
          disabled={disabled}
          value={value}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        {icon && (
          <Image
            src={icon}
            alt="icon"
            width={16}
            height={16}
            className={styles.inputRightImage}
          />
        )}
      </div>
      {(status === 'warning' || status === 'error' || status === 'success') && (
        <span className={`${styles.message} ${styles[status]}`}>
          {status === 'warning' && (
            <Image
              src={warningStatusImage}
              alt="warning"
              width={16}
              height={16}
            />
          )}
          {status === 'error' && (
            <Image src={errorStatusImage} alt="danger" width={16} height={16} />
          )}
          {status === 'success' && (
            <Image
              src={successStatusImage}
              alt="success"
              width={16}
              height={16}
            />
          )}
          {statusMessage}
        </span>
      )}
    </div>
  );
}
