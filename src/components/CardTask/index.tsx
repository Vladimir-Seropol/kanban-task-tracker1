/* eslint-disable no-console */
/* eslint-disable react/function-component-definition */
import React, { useState, useRef } from 'react';
import Priority from '@/components/Priority/Priority';
import TaskType from '@/components/TaskType/TaskType';
import TaskComponent from '@/components/TaskComponent/TaskComponent';
import CommentsCounter from '@/components/CommentsCounter/CommentsCounter';
import AddTaskВetailedModal from '../AddTaskВetailedModal';
import style from './style.module.css';

interface Task {
  id: number;
  title: string;
  executor: string;
  priority?: number;
  task_type?: number;
  component?: number;
  stage: string;
}

interface CardTaskProps {
  task: Task | undefined;
  onDragEnd: (taskId: number, targetStatus: string) => void;
}

const CardTask: React.FC<CardTaskProps> = ({ task, onDragEnd }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | undefined>(undefined);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleDragStart = (e: React.DragEvent) => {
    if (task) {
      e.dataTransfer.setData('taskId', String(task.id));
      if (cardRef.current) {
        cardRef.current.style.opacity = '0.5';
      }
    }
  };

  const openModal = () => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDragEnd = (e: React.DragEvent) => {
    if (cardRef.current) {
      cardRef.current.style.opacity = '1';
    }
    if (task && e.target) {
      const targetStatus =
        (e.target as HTMLElement).dataset.status || 'unknown';
      onDragEnd(task.id, targetStatus);
    }
  };

  const handleSaveTask = () => {
    closeModal();
  };

  return (
    <div
      className={style.cardTask}
      role="button"
      tabIndex={0}
      ref={cardRef}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onClick={openModal}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          // Corrected this line
          openModal();
        }
      }}
    >
      {isModalOpen && selectedTask && (
        <AddTaskВetailedModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onSave={handleSaveTask}
          task={selectedTask}
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
