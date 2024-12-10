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
}

export default function CustomDatePicker({
  onChange,
  disabled = false,
  className,
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

    // Закрываем календари ТОЛЬКО если выбраны обе даты
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
              {formatDate(startDate) || 'Дата начала'}
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
                placeholderText={'Дата начала'}
                className={styles.datePicker}
                // Убрали onBlur
              />
            )}
          </div>
          <div className={styles.dateInput}>
            <span
              onClick={() => setShowEndDatePicker(true)}
              className={styles.calendarIcon}
            >
              {formatDate(endDate) || 'Дата завершения'}
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
                placeholderText={'Дата завершения'}
                className={styles.datePicker}
                // Убрали onBlur
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
