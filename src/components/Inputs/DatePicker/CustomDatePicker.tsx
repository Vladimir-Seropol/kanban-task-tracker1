/* eslint-disable no-restricted-globals */
/* eslint-disable no-else-return */
/* eslint-disable react/require-default-props */
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Image from 'next/image';
import styles from './DatePicker.module.css';

interface DatePickerProps {
  onChange: (startDate: Date | null, endDate: Date | null) => void;
  disabled?: boolean;
  className?: string;
  startLabel?: string;
  endLabel?: string;
  startPlaceholder?: string;
  startDate?: Date | null;
  endDate?: Date | null;
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
  startDate: propStartDate = null,
  endDate: propEndDate = null,
}: DatePickerProps) {
  const [startDate, setStartDate] = useState<Date | null>(propStartDate);
  const [endDate, setEndDate] = useState<Date | null>(propEndDate);
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
    if (date instanceof Date && !isNaN(date.getTime())) {
      // Добавленная проверка
      return date.toLocaleDateString();
    } else {
      return '';
    }
  };

  return (
    <div className={`${styles.wrapper} ${className || ''}`}>
      <div className={styles.inputWrapper}>
        <div className={styles.inputContainer}>
          <div className={styles.dateInput}>
            <span
              role="button"
              tabIndex={0}
              onClick={() => setShowStartDatePicker(true)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setShowStartDatePicker(true);
                }
              }}
              className={styles.calendarIcon}
            >
              {formatDate(startDate) || startLabel || 'Дата начала'}
            </span>

            <Image
              src="/icon_calendar.svg"
              alt="Иконка Календарь"
              width={20}
              height={20}
            />
            {showStartDatePicker && (
              <DatePicker
                id="startDatePicker"
                selected={startDate || undefined}
                onChange={handleDateChange}
                startDate={startDate || undefined}
                endDate={endDate || undefined}
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
              role="button"
              tabIndex={0}
              onClick={() => setShowEndDatePicker(true)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setShowEndDatePicker(true);
                }
              }}
              className={styles.calendarIcon}
            >
              {formatDate(endDate) || endLabel || 'Дата завершения'}
            </span>
            <Image
              src="/icon_calendar.svg"
              alt="Иконка Календарь"
              width={20}
              height={20}
            />
            {showEndDatePicker && (
              <DatePicker
                id="endDatePicker"
                selected={endDate || undefined}
                onChange={handleDateChange}
                startDate={startDate || undefined}
                endDate={endDate || undefined}
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
