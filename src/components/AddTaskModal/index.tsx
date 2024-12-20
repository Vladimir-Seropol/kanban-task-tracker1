/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/function-component-definition */
/* eslint-disable no-alert */

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import style from './style.module.css';
import SelectInput from '../Inputs/SelectInput/SelectInput';
import { UserType } from '../../types/UserType';
import TextInput from '../Inputs/TextInput/TextInput';
import CustomDatePicker from '../Inputs/DatePicker/CustomDatePicker';
import TextEditor from '../TextEditor';
import FileUpload from '../FileUpload';
import Button from '../Button';

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: { title: string; executor: string }) => void;
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [inputValue, setInputValue] = useState<string>('');
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  const handleSave = () => {
    if (inputValue.trim()) {
      onSave({ title: inputValue, executor: 'Executor Name' });
      onClose();
    } else {
      alert('Заполните все поля');
    }
  };

  const handleDateChange = (start: Date | null, end: Date | null) => {
    setStartDate(start);
    setEndDate(end);
  };

  const handleConfirmClose = (confirm: boolean) => {
    setConfirmModalOpen(false);
    if (confirm) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className={style.modal} ref={modalRef}>
        <div className={style.modal_content}>
          <button
            type="button"
            style={{ position: 'absolute', top: '10px', right: '10px' }}
            className={style.closeButton}
            onClick={() => setConfirmModalOpen(true)}
          >
            <Image
              src="/close_button.png"
              alt="Закрыть окно"
              width={24}
              height={24}
            />
          </button>
          <h3>Создание задачи</h3>
          <div className={style.modal_task}>
            <TextInput
              label="Название"
              placeholder="Название задачи"
              value={inputValue}
              onChange={handleInputChange}
            />
          </div>
          <div className={style.modal_select}>
            <SelectInput
              placeholder="Задача"
              label="Тип задачи"
              data={[]}
              value={[]}
              onChange={(_value: UserType[]) => {}}
            />
            <SelectInput
              placeholder="Не выбран"
              label="Компонент"
              data={[]}
              value={[]}
              onChange={(_value: UserType[]) => {}}
            />
            <SelectInput
              placeholder="Исполнитель"
              label="Исполнитель"
              data={[]}
              value={[]}
              onChange={(_value: UserType[]) => {}}
            />
          </div>
          <div className={style.modal_priority}>
            <SelectInput
              placeholder="Приоритет"
              label="Приоритет"
              data={[]}
              value={[]}
              onChange={(_value: UserType[]) => {}}
            />
            <TextInput
              label="Оценка"
              placeholder="Оценка"
              value={inputValue}
              onChange={handleInputChange}
            />
          </div>
          <div className={style.modal_date}>
            <CustomDatePicker
              startLabel="Дата начала"
              endLabel="Дата завершения"
              onChange={handleDateChange}
              startDate={startDate}
              endDate={endDate}
              startPlaceholder="Дата начала"
              endPlaceholder="Дата завершения"
            />
          </div>
          <div className={style.modal_text_editor}>
            <TextEditor />
            <FileUpload />
          </div>
          <div className={style.modal_link}>
            <TextInput
              label="Layout link"
              placeholder="Layout link"
              value={inputValue}
              onChange={handleInputChange}
            />
            <TextInput
              label="Markup link"
              placeholder="Markup link"
              value={inputValue}
              onChange={handleInputChange}
            />
            <TextInput
              label="Dev Link"
              placeholder="Dev Link"
              value={inputValue}
              onChange={handleInputChange}
            />
          </div>
          <div className={style.modalActions}>
            <Button
              text="Добавить"
              type="button"
              onClick={handleSave}
              inlineStyle={{ width: '130px', height: '48px', padding: '0' }}
            />
            <Button
              text="Отменить"
              type="button"
              onClick={onClose}
              inlineStyle={{
                width: '130px',
                height: '48px',
                background: 'none',
                border: '1px solid #3787EB',
                color: '#3787EB',
              }}
            />
          </div>
        </div>
      </div>
      {confirmModalOpen && (
        <div className={style.confirmModal}>
          <div className={style.confirmModal_content}>
            <p className={style.confirmModal_text}>Закрыть окно?</p>
            <div className={style.confirmModal_actions}>
              <Button
                text="Да"
                type="button"
                onClick={() => handleConfirmClose(true)}
                inlineStyle={{
                  width: '128px',
                  height: '32px',
                  marginRight: '8px',
                }}
              />
              <Button
                text="Нет"
                type="button"
                onClick={() => handleConfirmClose(false)}
                inlineStyle={{
                  width: '128px',
                  height: '32px',
                  background: 'none',
                  border: '1px solid #3787EB',
                  color: '#3787EB',
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddTaskModal;
