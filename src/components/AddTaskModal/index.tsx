/* eslint-disable react/function-component-definition */
/* eslint-disable import/newline-after-import */
import React, { useState } from 'react';
import style from './style.module.css';
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
      <div className={style.modalContent}>
        <h3>Добавить задачу</h3>
        <div>
          <label>Заголовок задачи</label>
          <input
            type="text"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            placeholder="Введите заголовок задачи"
          />
        </div>
        <div>
          <label >Исполнитель</label>
          <input
            type="text"
            value={executor}
            onChange={(e) => setExecutor(e.target.value)}
            placeholder="Введите имя исполнителя"
          />
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
