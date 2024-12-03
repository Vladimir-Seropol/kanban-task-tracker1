/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/function-component-definition */
import React, { useRef } from 'react';
import style from './style.module.css';

interface Task {
  id: number;
  title: string;
  executor: string;
  priority?: string;
}

interface CardTaskProps {
  task: Task | undefined;
  onDragEnd: (taskId: number, targetStatus: string) => void; // Изменили тип onDragEnd
}

const CardTask: React.FC<CardTaskProps> = ({ task, onDragEnd }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleDragStart = (e: React.DragEvent) => {
    if (task) {
      e.dataTransfer.setData('taskId', String(task.id)); // передаем id задачи
      if (cardRef.current) {
        cardRef.current.style.opacity = '0.5';
      }
    }
  };

  const handleDragEnd = () => {
    if (cardRef.current) {
      cardRef.current.style.opacity = '1';
    }
  };

  return (
    <div
      className={style.cardTask}
      ref={cardRef}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className={style.cardTaskHeader}>
        <div className={style.id}>id: {task?.id}</div>
        <div className={style.priority}>{task?.priority || 'Низкий'}</div>
      </div>
      <div className={style.title}>{task?.title || 'Наименование задачи'}</div>
      <div className={style.executor}>{task?.executor || 'Исполнитель'}</div>
      <div className={style.cardTaskFooter}>
        <div className={style.status}>Статус</div>
        <div className={style.date}>Задача</div>
        <div className={style.comment}>
          <img src="/icon_comment.svg" alt="Комментарий" />
        </div>
      </div>
    </div>
  );
};

export default CardTask;
