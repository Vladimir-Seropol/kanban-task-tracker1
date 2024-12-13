// Отключение правил ESLint
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/label-has-associated-control */

import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './DatePicker.module.css';

interface DatePickerProps {
  onChange: (startDate: Date | null, endDate: Date | null) => void;
  disabled?: boolean;
  className?: string;
  startLabel?: string;
  endLabel?: string;
  startPlaceholder?: string;
  endPlaceholder?: string;
}

export default function CustomDatePicker({
  onChange,
  disabled = false,
  className,
  startLabel = '',
  endLabel = '',
  startPlaceholder = '',
  endPlaceholder = '',
}: DatePickerProps) {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [newStartDate, newEndDate] = dates;
    setStartDate(newStartDate);
    setEndDate(newEndDate);
    onChange(newStartDate, newEndDate);

  
    if (newStartDate && newEndDate) {
      setShowStartDatePicker(false);
      setShowEndDatePicker(false);
    }
  };

  const formatDate = (date: Date | null): string => {
    return date ? date.toLocaleDateString() : '';
  };

  return (
    <div className={`${styles.wrapper} ${className || ''}`}>
      <div className={styles.inputWrapper}>
        <div className={styles.inputContainer}>
          <div className={styles.dateInput}>
            <span
              onClick={() => setShowStartDatePicker(true)}
              className={styles.calendarIcon}
            >
              {formatDate(startDate) || startLabel || 'Дата начала'}
            </span>
            <img src="/icon_calendar.svg" alt="Иконка Календарь" />
            {showStartDatePicker && (
              <DatePicker
                id="startDatePicker"
                selected={startDate}
                onChange={handleDateChange}
                startDate={startDate}
                endDate={endDate}
                selectsStart
                selectsEnd
                selectsRange
                disabled={disabled}
                placeholderText={startPlaceholder}
                className={styles.datePicker}
              />
            )}
          </div>
          <div className={styles.dateInput}>
            <span
              onClick={() => setShowEndDatePicker(true)}
              className={styles.calendarIcon}
            >
              {formatDate(endDate) || endLabel || 'Дата завершения'}
            </span>
            <img src="/icon_calendar.svg" alt="Иконка Календарь" />
            {showEndDatePicker && (
              <DatePicker
                id="endDatePicker"
                selected={endDate}
                onChange={handleDateChange}
                startDate={startDate}
                endDate={endDate}
                selectsStart
                selectsEnd
                selectsRange
                disabled={disabled}
                placeholderText={endPlaceholder}
                className={styles.datePicker}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
