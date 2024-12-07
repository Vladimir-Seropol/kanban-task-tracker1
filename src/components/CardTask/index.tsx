/* eslint-disable react/function-component-definition */
import React, { useState, useRef } from 'react';
import style from './style.module.css';
import Priority from '@/components/Priority/Priority';
import TaskType from '@/components/TaskType/TaskType';
import TaskComponent from '@/components/TaskComponent/TaskComponent';
import CommentsCounter from '@/components/CommentsCounter/CommentsCounter';
import AddTaskВetailedModal from '../AddTaskВetailedModal';

interface Task {
  id: number;
  title: string;
  executor: string;
  priority?: number;
  task_type?: number;
  component?: number;
  stage: string; // потом это тоже будет number
}

interface CardTaskProps {
  task: Task | undefined;
  onDragEnd: (taskId: number, targetStatus: string) => void; // Изменили тип onDragEnd
}

const CardTask: React.FC<CardTaskProps> = ({ task, onDragEnd }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | undefined>(undefined);
  const cardRef = useRef<HTMLDivElement>(null);

  // Обработчик начала перетаскивания
  const handleDragStart = (e: React.DragEvent) => {
    if (task) {
      e.dataTransfer.setData('taskId', String(task.id)); // передаем id задачи
      if (cardRef.current) {
        cardRef.current.style.opacity = '0.5';
      }
    }
  };

  // Открытие модального окна
  const openModal = () => {
    setSelectedTask(task); // Сохраняем выбранную задачу
    setIsModalOpen(true); // Открываем модальное окно
  };

  // Закрытие модального окна
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Обработчик окончания перетаскивания
  const handleDragEnd = () => {
    if (cardRef.current) {
      cardRef.current.style.opacity = '1';
    }
  };

  // Обработчик сохранения задачи (можно передать сюда логику сохранения)
  const handleSaveTask = (taskData: Task) => {
    // Логика сохранения задачи
    console.log('Task saved:', taskData);
    closeModal(); // Закрываем модальное окно после сохранения
  };

  return (
    <div
      className={style.cardTask}
      ref={cardRef}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onClick={openModal} // Открытие модального окна при клике
    >
      {/* Модальное окно */}
      {isModalOpen && selectedTask && ( // Проверяем, что есть задача для отображения
        <AddTaskВetailedModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onSave={handleSaveTask} // Передаем функцию сохранения задачи
          task={selectedTask} // Передаем задачу для отображения в модальном окне
        />
      )}

      <div className={style.cardTaskHeader}>
        <div className={style.id}>id: {task?.id}</div>
        {task?.priority && <Priority id={task.priority} />}
      </div>
      <div className={style.title}>{task?.title || 'Наименование задачи'}</div>
      <div className={style.executor}>{task?.executor || 'Исполнитель'}</div>
      <div className={style.cardTaskFooter}>
        <div className={style.tagsBlock}>
          {task?.component && <TaskComponent id={task?.component} />}
          {task?.task_type && <TaskType id={task?.task_type} />}
        </div>
        <div className={style.comment}>
          <CommentsCounter count={5} />
        </div>
      </div>
    </div>
  );
};

export default CardTask;
