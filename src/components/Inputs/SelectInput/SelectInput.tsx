import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from '../InputBase.module.css';
import stylesSelect from './SelectInput.module.css';

interface MultiSelectProps {
  label: string;
  data: any[];
  value: any[];
  onChange: (value: any[]) => void;
  disabled?: boolean;
  placeholder?: string;
}

interface SelectItemProps {
  id: number;
  name: string;
  surname?: string;
}

export default function MultiSelectInput({
  label,
  data,
  value,
  onChange,
  disabled,
  placeholder,
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    if (!disabled) setIsOpen((prev) => !prev);
  };

  const handleKeyboardEvent = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleDropdown();
    }
  };

  const handleCheckboxChange = (item: SelectItemProps) => {
    const isSelected = value.some(
      (selectedItem) => selectedItem.id === item.id,
    );
    const updatedValue = isSelected
      ? value.filter((selectedItem) => selectedItem.id !== item.id)
      : [...value, item];
    onChange(updatedValue);
  };

  const isChecked = (item: SelectItemProps) =>
    value.some((selectedItem) => selectedItem.id === item.id);

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
      <span className={styles.label}>{label}</span>
      <div
        className={`${styles.input} ${disabled ? styles.disabled : ''} ${stylesSelect.input}`}
        role="button"
        tabIndex={0}
        onClick={toggleDropdown}
        onKeyDown={handleKeyboardEvent}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <div className={stylesSelect.selectedItemsContainer}>
          {value.length > 0 ? (
            value.map((item) => (
              <span key={item.id} className={stylesSelect.selectedItem}>
                {item.name && item.surname
                  ? `${item.name} ${item.surname}`
                  : `${item.name}`}
              </span>
            ))
          ) : (
            <span
              className={stylesSelect.placeholder}
              style={{ color: '#a6a6a6' }}
            >
              {placeholder}
            </span>
          )}
          <button type="button" className={stylesSelect.selectButton}>
            <Image src="/arrow-down.png" alt="" width={16} height={16} />
          </button>
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

                {option.name && option.surname
                  ? `${option.name} ${option.surname}`
                  : `${option.name}`}
              </label>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

MultiSelectInput.defaultProps = {
  placeholder: '',
  disabled: false,
};
