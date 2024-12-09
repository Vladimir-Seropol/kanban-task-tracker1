/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/function-component-definition */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable prettier/prettier */

import React, { useState, useEffect, useRef } from 'react';
import { UserType } from '@/types/UserType';
import { inter } from '@/assets/fonts/fonts';
import styles from '../InputBase.module.css';
import stylesSelect from './SelectInput.module.css';

interface MultiSelectProps {
  label: string;
  data: UserType[];
  value: UserType[];
  onChange: (value: UserType[]) => void;
  disabled?: boolean;
  placeholder?: string; // Новый пропс для placeholder
}

const MultiSelectInput: React.FC<MultiSelectProps> = ({
  label,
  data = [],
  value,
  onChange,
  disabled = false,
  placeholder = '', // Значение по умолчанию
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Тогглинг открытия выпадающего списка
  const toggleDropdown = () => {
    if (!disabled) setIsOpen((prev) => !prev);
  };

  // Обработка клавиш Enter или Space для открытия/закрытия выпадающего списка
  const handleKeyboardEvent = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault(); // Предотвращаем стандартное поведение
      toggleDropdown();
    }
  };

  // Обработчик изменения состояния выбранного пользователя
  const handleCheckboxChange = (user: UserType) => {
    const isSelected = value.some((selectedUser) => selectedUser.id === user.id);
    const updatedValue = isSelected
      ? value.filter((selectedUser) => selectedUser.id !== user.id)
      : [...value, user];
    onChange(updatedValue);
  };

  // Проверка, выбран ли пользователь
  const isChecked = (user: UserType) =>
    value.some((selectedUser) => selectedUser.id === user.id);

  // Закрытие выпадающего списка при клике вне компонента
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.wrapper} ref={dropdownRef}>
      <label className={styles.label}>{label}</label>
      <div
        className={`${styles.input} ${disabled ? styles.disabled : ''} ${stylesSelect.input}`}
        role="button"
        tabIndex={0}
        onClick={toggleDropdown}
        onKeyDown={handleKeyboardEvent}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <div className={stylesSelect.selectedUsersContainer}>
          {value.length > 0 ? (
            value.map((user) => (
              <span key={user.id} className={stylesSelect.selectedUser}>
                {`${user.name} ${user.surname}`}
              </span>
            ))
          ) : (
            <span className={stylesSelect.placeholder} style={{ color: '#a6a6a6' }}>{placeholder}</span> // Используем пропс placeholder
          )}
          <button type="button" className={stylesSelect.selectButton}><img src="/Vector_1.png" alt="" /></button>
        </div>
      </div>
      {isOpen && (
        <ul className={stylesSelect.dropdown} role="listbox">
          {data.map((option) => (
            <li key={option.id} className={stylesSelect.dropdownItem}>
              <label
                className={stylesSelect.checkboxLabel}
                htmlFor={`checkbox-${option.id}`}
              >
                <input
                  type="checkbox"
                  id={`checkbox-${option.id}`}
                  checked={isChecked(option)}
                  onChange={() => handleCheckboxChange(option)}
                  disabled={disabled}
                />
                
                {`${option.name} ${option.surname}`}
              </label>
              
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MultiSelectInput;
