import Link from 'next/link';
import Button from '@/components/Button';
import Image from 'next/image';
import { useState, useEffect, DragEvent } from 'react';
import CustomDatePicker from '@/components/Inputs/DatePicker/CustomDatePicker';
import SelectInput from '@/components/Inputs/SelectInput/SelectInput';
import TextInput from '@/components/Inputs/TextInput/TextInput';
import Layout from '@/pages/projects/layout';
import style from './style.module.css';
import { UserType } from '@/types/UserType';
import CardTask from '@/components/CardTask';
import AddTaskModal from '@/components/AddTaskModal';

interface User {
  id: number;
  firstName: string;
  lastName: string;
}

interface Task {
  id: number;
  title: string;
  executor: string;
  priority?: number;
  type?: number;
  component?: number;
  stage: string;
}

export default function Slug() {
  const [user, setUser] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState<UserType[]>([]);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Эмуляция запроса данных о пользователе (например, через fetch)
  useEffect(() => {
    const fetchUserData = async () => {
      const userData = {
        name: 'User',
        is_admin: true,
      };
      setUser(userData);
    };

    fetchUserData();
  }, []);

  // Эмуляция данных о задачах
  useEffect(() => {
    const fetchTasks = () => {
      const tasksData = [
        {
          id: 192494,
          title: 'Задача 1',
          executor: 'Иван Иванов',
          priority: 1,
          task_type: 1,
          component: 3,
          stage: 'Новые',
        },
        {
          id: 192495,
          title: 'Задача 2',
          executor: 'Петр Петров',
          priority: 3,
          task_type: 2,
          component: 2,
          stage: 'В работе',
        },
      ];
      setTasks(tasksData);
    };

    fetchTasks();
  }, []);

  // Функция для открытия модального окна
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Функция для закрытия модального окна
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Функция для сохранения новой задачи
  const handleSaveTask = (task: { title: string; executor: string }) => {
    const newTask = {
      ...task,
      id: tasks.length + 1,
      status: 'Новые',
    };
    setTasks([...tasks, newTask]); // Добавляем задачу в список
  };

  // Обработчик окончания перетаскивания
  const handleDragEnd = (draggedTaskId: number, targetStatus: string) => {
    // Обновляем статус задачи
    const updatedTasks = tasks.map((task) => {
      if (task.id === draggedTaskId) {
        return { ...task, stage: targetStatus }; // Обновляем статус
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  // Обработчик события drop
  const handleDrop = (e: DragEvent<HTMLDivElement>, targetStatus: string) => {
    const draggedTaskId = Number(e.dataTransfer.getData('taskId')); // Преобразуем ID в число
    handleDragEnd(draggedTaskId, targetStatus);
    e.preventDefault();
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault(); // Разрешаем перетаскивание
  };

  // Фильтруем задачи по статусу
  const getTasksByStatus = (stage: string) => {
    return tasks.filter((task) => task.stage === stage);
  };

  return (
    <Layout>
      <main className={style.board__right}>
        <div className={style.board__right_header}>
          <nav>
            <Link href="/">
              <span>Главная / </span>
            </Link>
            <Link href="/projects">
              <span>Проекты / </span>
            </Link>
            <span>Demo Project</span>
          </nav>
        </div>
        <div className={style.board__right_title}>
          <div className={style.board__right_title_checkbox}>
            <h2>Demo Project</h2>
            <input type="checkbox" />
          </div>

<<<<<<< HEAD
          {/* Условное отображение кнопки "Добавить задачу" */}
=======
>>>>>>> 2fb2fb65024b4c16a49a5f1ce41ec31c62ada282
          {user?.is_admin && (
            <Button
              svg={
                <Image
                  src="/icon_create.svg"
                  alt="icon_create"
<<<<<<< HEAD
                  width={16} // Укажите ширину изображения
=======
                  width={16}
>>>>>>> 2fb2fb65024b4c16a49a5f1ce41ec31c62ada282
                  height={16}
                  style={{ verticalAlign: 'middle', marginRight: '8px' }}
                />
              }
              text="Добавить задачу"
              type="button"
<<<<<<< HEAD
              onClick={() => {}}
            />
          )}
        </div>
        <div className={style.board__right_selection}>
          <div className={style.board__right_selection_item}>
            <TextInput
              placeholder="Название проекта"
              value=""
              onChange={() => {}}
              label="Название проекта"
            />
          </div>
          <div className={style.board__right_selection_item}>
            <SelectInput
              label="Выбрать пользователей"
              value={selectedUsers}
              onChange={setSelectedUsers}
              data={[]}
            />
          </div>
          <div className={style.board__right_selection_item}>
            <SelectInput
              label="Выбрать тип"
              data={[]}
              value={selectedUsers}
              onChange={setSelectedUsers}
            />
          </div>
          <div className={style.board__right_selection_item}>
            <SelectInput
              label="Выбрать компонент"
              data={[]}
              value={selectedUsers}
              onChange={setSelectedUsers}
            />
          </div>
        </div>
        <div className={style.board__right_date}>
          <CustomDatePicker
            placeholder="Дата начала"
            value={startDate}
            onChange={setStartDate}
            className={style.my_custom_class}
            inputClassName={style.my_input_class}
          />
=======
              onClick={openModal}
            />
          )}
        </div>
        {/* Модальное окно */}
        <AddTaskModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onSave={handleSaveTask}
        />
>>>>>>> 2fb2fb65024b4c16a49a5f1ce41ec31c62ada282

        <div className={style.board__right_selection}>
          <div className={style.board__right_selection_item}>
            <TextInput
              placeholder="Название проекта"
              value=""
              onChange={() => {}}
              label="Название проекта"
            />
          </div>
          <div className={style.board__right_selection_item}>
            <SelectInput
              label="Выбрать пользователей"
              value={selectedUsers}
              onChange={setSelectedUsers}
              data={[]}
            />
          </div>
          <div className={style.board__right_selection_item}>
            <SelectInput
              label="Выбрать тип"
              data={[]}
              value={selectedUsers}
              onChange={setSelectedUsers}
            />
          </div>
          <div className={style.board__right_selection_item}>
            <SelectInput
              label="Выбрать компонент"
              data={[]}
              value={selectedUsers}
              onChange={setSelectedUsers}
            />
          </div>
        </div>

        <div className={style.board__right_date}>
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

        <div className={style.board__right_tasks}>
          <div className={style.board__right_tasks_item}>
            <h5>Новые</h5>
            <div
              className={style.board__right_tasks_item_tasks}
              onDrop={(e) => handleDrop(e, 'Новые')}
              onDragOver={handleDragOver}
            >
              {getTasksByStatus('Новые').map((task) => (
                <CardTask key={task.id} task={task} onDragEnd={handleDragEnd} />
              ))}
            </div>
          </div>

          <div className={style.board__right_tasks_item}>
            <h5>В работе</h5>
            <div
              className={style.board__right_tasks_item_tasks}
              onDrop={(e) => handleDrop(e, 'В работе')}
              onDragOver={handleDragOver}
            >
              {getTasksByStatus('В работе').map((task) => (
                <CardTask key={task.id} task={task} onDragEnd={handleDragEnd} />
              ))}
            </div>
          </div>

          <div className={style.board__right_tasks_item}>
            <h5>Выполнено</h5>
            <div
              className={style.board__right_tasks_item_tasks}
              onDrop={(e) => handleDrop(e, 'Выполнено')}
              onDragOver={handleDragOver}
            >
              {getTasksByStatus('Выполнено').map((task) => (
                <CardTask key={task.id} task={task} onDragEnd={handleDragEnd} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}