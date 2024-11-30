import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from '../InputBase.module.css';

interface DatePickerProps {
  label: string;
  value: Date | null;
  onChange: (date: Date | null) => void;
  disabled?: boolean;
}

export default function CustomDatePicker({
  label,
  value,
  onChange,
  disabled = false,
}: DatePickerProps) {
  return (
    <div className={styles.wrapper}>
      <label className={styles.label}>{label}</label>
      <DatePicker
        selected={value}
        onChange={onChange}
        disabled={disabled}
        className={`${styles.input} ${disabled ? styles.disabled : ''}`}
      />
    </div>
  );
}
