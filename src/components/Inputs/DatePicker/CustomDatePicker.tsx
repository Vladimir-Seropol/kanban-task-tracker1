/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from '../InputBase.module.css';

interface DatePickerProps {
  value?: Date | null;
  onChange: (date: Date | null) => void;
  disabled?: boolean;
  className?: string; // Для кастомного класса контейнера
  inputClassName?: string; // Для кастомного класса input
  placeholder?: string;
}

export default function CustomDatePicker({
  value,
  onChange,
  disabled = false,
  className,
  inputClassName,
  placeholder,
}: DatePickerProps) {
  const [showCalendar, setShowCalendar] = useState(false); // Состояние для отображения календаря

  // Функция для переключения состояния календаря
  const handleIconClick = () => {
    setShowCalendar((prev) => !prev); // Меняем состояние видимости календаря
  };

  return (
    <div className={`${styles.wrapper} ${className || ''}`}>
      <DatePicker
        selected={value}
        onChange={onChange}
        disabled={disabled}
        placeholderText={placeholder}
        className={`${styles.input} ${disabled ? styles.disabled : ''} ${inputClassName || ''}`}
        open={showCalendar} // Используем свойство open для управления видимостью
        onClickOutside={() => setShowCalendar(false)} // Закрытие календаря при клике вне поля
      />

      <img
        src="/icon_calendar.svg"
        alt="icon_calendar"
        style={{
          position: 'absolute',
          top: '12px',
          right: '20px',
          cursor: 'pointer',
        }}
        onClick={handleIconClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            // Обработка Enter или Space
            handleIconClick();
          }
        }}
        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
        role="button" // Указываем, что это кнопка
        tabIndex={0} // Даем элементу возможность быть фокусируемым
      />
    </div>
  );
}
