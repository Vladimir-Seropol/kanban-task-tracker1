/* eslint-disable prefer-destructuring */
/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/function-component-definition */
/* eslint-disable react/require-default-props */
import React, { CSSProperties, useState } from 'react';
import Image from 'next/image';
import styles from './DatePickerBlue.module.css';

interface DatePickerProps {
  id?: string;
  style?: CSSProperties;
}

const DatePickerBlue: React.FC<DatePickerProps> = ({
  id = 'datepicker',
  style,
}) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleDateChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setId: string,
  ) => {
    const value = e.target.value;
    if (setId === 'startDate') {
      setStartDate(value);
    } else {
      setEndDate(value);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.datePickerContainer}>
        <label htmlFor={`${id}-startDate`}>Дата создания</label>
        <div className={styles.datePicker}>
          <input
            type="text"
            id={`${id}-startDate`}
            value={startDate}
            onChange={(e) => handleDateChange(e, 'startDate')}
            placeholder=""
            className={styles.dateInput}
            aria-label="Дата создания"
          />
          <div className={styles.calendarIcon}>
            <Image
              src="/Datapicker.png"
              alt="Календарь"
              width={13.33}
              height={13.33}
            />
          </div>
        </div>
      </div>

      <div className={styles.datePickerContainer}>
        <label htmlFor={`${id}-endDate`}>Дата начала</label>
        <div className={styles.datePicker}>
          <input
            type="text"
            id={`${id}-endDate`}
            value={endDate}
            onChange={(e) => handleDateChange(e, 'endDate')}
            placeholder=""
            className={styles.dateInput}
            aria-label="Дата начала" // Исправлено
          />
          <div className={styles.calendarIcon}>
            <Image
              src="/Datapicker.png"
              alt="Календарь"
              width={13.33}
              height={13.33}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatePickerBlue;
