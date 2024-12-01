/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect, useRef } from 'react';
import styles from '../InputBase.module.css';
import stylesSelect from './SelectInput.module.css';

interface User {
  id: number;
  firstName: string;
  lastName: string;
}

interface MultiSelectProps {
  label: string;
  options: User[];
  value: User[];
  onChange: (value: User[]) => void;
  // eslint-disable-next-line react/require-default-props
  disabled?: boolean;
}

export default function MultiSelectInput({
  label,
  options,
  value,
  onChange,
  disabled = false,
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    if (!disabled) setIsOpen(!isOpen);
  };

  const handleCheckboxChange = (user: User) => {
    const isSelected = value.some(
      (selectedUser) => selectedUser.id === user.id,
    );
    const updatedValue = isSelected
      ? value.filter((selectedUser) => selectedUser.id !== user.id)
      : [...value, user];
    onChange(updatedValue);
  };

  const isChecked = (user: User) =>
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
    <div className={styles.wrapper} ref={dropdownRef}>
      <label className={styles.label}>{label}</label>
      <div
        className={`${styles.input} ${disabled ? styles.disabled : ''} ${stylesSelect.input}`}
        role="button"
        tabIndex={0}
        onClick={toggleDropdown}
      >
        {value.length > 0
          ? value.map((user) => `${user.firstName} ${user.lastName}`).join(', ')
          : 'Пользователи'}
      </div>
      {isOpen && (
        <ul className={stylesSelect.dropdown}>
          {options.map((option) => (
            <li key={option.id} className={stylesSelect.dropdownItem}>
              <label className={stylesSelect.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={isChecked(option)}
                  onChange={() => handleCheckboxChange(option)}
                  disabled={disabled}
                />
                {`${option.firstName} ${option.lastName}`}
              </label>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
