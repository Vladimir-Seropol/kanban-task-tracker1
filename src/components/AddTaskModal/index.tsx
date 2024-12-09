/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable func-names */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/function-component-definition */
/* eslint-disable import/newline-after-import */
import React, { useState } from 'react';
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
  const [taskTitle, setTaskTitle] = useState('');
  const [executor, setExecutor] = useState('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [inputValue, setInputValue] = useState<string>('');

  const handleInputChange = (value: string) => {
    setInputValue(value); // Обновляем состояние с новым значением
  };

  const handleSave = () => {
    if (taskTitle && executor) {
      onSave({ title: taskTitle, executor });
      onClose(); // Закрыть модалку после сохранения задачи
    } else {
      alert('Заполните все поля');
    }
  };

  if (!isOpen) return null;

  return (
    <div className={style.modal}>
      <div className={style.modal_content}>
        <h3>Создание задачи</h3>
        <div className={style.modal_task}>
          <TextInput
            label="Название " // Текст метки
            placeholder="Название задачи"
            value={inputValue} 
            onChange={handleInputChange}
          />
        </div>
        <div className={style.modal_select}>
          <SelectInput
            placeholder="Задача"
            label="Тип задачи "
            data={[]}
            value={[]}
            onChange={function (_value: UserType[]): void {
              throw new Error('Function not implemented.');
            }}
          />
          <SelectInput
            placeholder="Не выбран"
            label="Компонент "
            data={[]}
            value={[]}
            onChange={function (_value: UserType[]): void {
              throw new Error('Function not implemented.');
            }}
          />
          <SelectInput
            placeholder="Исполнитель "
            label="Исполнитель "

            data={[]}
            value={[]}
            onChange={function (_value: UserType[]): void {
              throw new Error('Function not implemented.');
            }}
          />
        </div>
        <div className={style.modal_priority}>
          <SelectInput
            placeholder="Приоритет"
            label="Приоритет "
            data={[]}
            value={[]}
            onChange={function (_value: UserType[]): void {
              throw new Error('Function not implemented.');
            }}
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
            placeholder="Дата начала"
            value={startDate}
            onChange={setStartDate}
            className={style.my_custom_class}
            inputClassName={style.my_input_class}
          />
          <CustomDatePicker
            placeholder="Дата завершения"
            value={endDate}
            onChange={setEndDate}
            className={style.my_custom_class}
            inputClassName={style.my_input_class}
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
            label="Markup link "
            placeholder="Markup link "
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
            inlineStyle={{ width: '130px', height: '48px' }}
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
  );
};

export default AddTaskModal;
