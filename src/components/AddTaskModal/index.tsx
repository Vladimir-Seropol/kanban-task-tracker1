/* eslint-disable react/function-component-definition */
/* eslint-disable import/newline-after-import */
import React, { useState } from 'react';
import style from './style.module.css';
import SelectInput from '../Inputs/SelectInput/SelectInput';
import { UserType } from '@/types/UserType';
import TextInput from '../Inputs/TextInput/TextInput';
import CustomDatePicker from '../Inputs/DatePicker/CustomDatePicker';
import TextEditor from '../TextEditor';
import FileUpload from '../FileUpload';
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
          <SelectInput
            label={'Название *'}
            data={[]}
            value={[]}
            onChange={function (value: UserType[]): void {
              throw new Error('Function not implemented.');
            }}
          />
        </div>
        <div className={style.modal_select}>
          <SelectInput
            label={'Тип задачи *'}
            data={[]}
            value={[]}
            onChange={function (value: UserType[]): void {
              throw new Error('Function not implemented.');
            }}
          />
          <SelectInput
            label={'Компонент *'}
            data={[]}
            value={[]}
            onChange={function (value: UserType[]): void {
              throw new Error('Function not implemented.');
            }}
          />
          <SelectInput
            label={'Исполнитель *'}
            data={[]}
            value={[]}
            onChange={function (value: UserType[]): void {
              throw new Error('Function not implemented.');
            }}
          />
        </div>
        <div className={style.modal_priority}>
          <SelectInput
            label={'Приоритет *'}
            data={[]}
            value={[]}
            onChange={function (value: UserType[]): void {
              throw new Error('Function not implemented.');
            }}
          />
          <TextInput
            label={'Оценка'}
            placeholder={'Оценка'}
            value={''}
            onChange={function (value: string): void {
              throw new Error('Function not implemented.');
            }}
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
      
        <div className={style.modalActions}>
          <button onClick={onClose}>Отмена</button>
          <button onClick={handleSave}>Сохранить</button>
        </div>
      </div>
    </div>
  );
};

export default AddTaskModal;
