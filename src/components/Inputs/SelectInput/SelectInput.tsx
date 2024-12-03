
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
  // eslint-disable-next-line react/require-default-props
  disabled?: boolean;
}

export default function MultiSelectInput({
  label,
  data = [],
  value,
  onChange,
  disabled = false,
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    if (!disabled) setIsOpen(!isOpen);
  };

  const handleKeyboardEvent = (event: React.KeyboardEvent) => {
    // Проверяем, нажата ли клавиша Enter или Space
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault(); // Предотвращаем стандартное поведение (например, прокрутку при нажатии Space)
      toggleDropdown();
    }
  };

  const handleCheckboxChange = (user: UserType) => {
    const isSelected = value.some(
      (selectedUser) => selectedUser.id === user.id,
    );
    const updatedValue = isSelected
      ? value.filter((selectedUser) => selectedUser.id !== user.id)
      : [...value, user];
    onChange(updatedValue);
  };

  const isChecked = (user: UserType) =>
    value.some((selectedUser) => selectedUser.id === user.id);

  // Закрытие выпадающего списка при клике вне компонента
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className={`${styles.wrapper} ${inter.className}`} ref={dropdownRef}>
      <label className={styles.label}>{label}</label>
      <div
        className={`${styles.input} ${disabled ? styles.disabled : ''} ${stylesSelect.input}`}
        role="button"
        tabIndex={0}
        onClick={toggleDropdown}
        onKeyDown={handleKeyboardEvent}
      >
        <div className={stylesSelect.selectedUsersContainer}>
          {value.length > 0 ? (
            value.map((user) => (
              <span key={user.id} className={stylesSelect.selectedUser}>
                {`${user.name} ${user.surname}`}
              </span>
            ))
          ) : (
            <span style={{ color: '#a6a6a6' }}>Пользователи</span>
          )}
        </div>
      </div>
      {isOpen && (
        <ul className={stylesSelect.dropdown}>
          {data.map((option) => (
            <li key={option.id} className={stylesSelect.dropdownItem}>
              <label className={stylesSelect.checkboxLabel} htmlFor='checkbox'>
                <input
                  type="checkbox"
                  id='checkbox'
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
}
