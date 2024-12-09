import Link from 'next/link';
import Button from '@/components/Button';
import Image from 'next/image';
import { useState, useEffect, DragEvent } from 'react';
import CustomDatePicker from '@/components/Inputs/DatePicker/CustomDatePicker';
import SelectInput from '@/components/Inputs/SelectInput/SelectInput';
import TextInput from '@/components/Inputs/TextInput/TextInput';
import Layout from '@/pages/projects/layout';
import { UserType } from '@/types/UserType';
import CardTask from '@/components/CardTask';
import AddTaskModal from '@/components/AddTaskModal';
import Toggle from '@/components/Toggle/Toggle';
import { useGetAuthUserQuery } from '@/redux/services/AuthUser';
import { useRouter } from 'next/router';
import { useGetprojectSlugQuery } from '@/redux/services/ProjectUser';
import style from './slug.module.css';

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
  const router = useRouter();
  // Получение данных по определенному проекту
  const { data: projectSlug } = useGetprojectSlugQuery(router.query.slug);
  console.log(`Получение данных о проекте`, projectSlug);

  const [selectedUsers, setSelectedUsers] = useState<UserType[]>([]);
  const [startDate, setStartDate] = useState<Date | null>(
    projectSlug?.data?.begin,
  );
  const [endDate, setEndDate] = useState<Date | null>(projectSlug?.data?.end);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [admin, setIsAdmin] = useState<boolean>(false);
  const { data: Admin } = useGetAuthUserQuery('user');
  console.log(`Admin`, Admin);

  useEffect(() => {
    if (Admin?.data?.is_admin) {
      setIsAdmin((prev) => !prev);
    }
  }, [Admin]);

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
        {
          id: 192496,
          title: 'Задача 3',
          executor: 'Miyagi & Эндшпил',
          priority: 2,
          task_type: 3,
          component: 5,
          stage: 'Новые',
        },
        {
          id: 192497,
          title: 'Задача 4',
          executor: 'Macan',
          priority: 2,
          task_type: 6,
          component: 1,
          stage: 'Новые',
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
      stage: 'Новые',
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
            <span>{projectSlug?.data?.name}</span>
          </nav>
        </div>
        <div className={style.board__right_title}>
          <div className={style.board__right_title_checkbox}>
            <h2 style={{ marginRight: '24px' }}>{projectSlug?.data?.name}</h2>
            <Toggle />
            <span className={style.checkboxName}>Только мои</span>
          </div>

          {admin && (
            <Button
              svg={
                <Image
                  src="/icon_create.svg"
                  alt="icon_create"
                  width={16}
                  height={16}
                  style={{ verticalAlign: 'middle', marginRight: '8px' }}
                />
              }
              text="Добавить задачу"
              type="button"
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

        <div className={style.board__right_selection}>
          <div className={style.board__right_selection_item}>
            <TextInput
              placeholder="Название задачи"
              value=""
              onChange={() => {}}
              label="Название задачи"
            />
          </div>
          <div className={style.board__right_selection_item}>
            <SelectInput
              label="Выбрать пользователей"
              placeholder="Пользователи"
              value={selectedUsers}
              onChange={setSelectedUsers}
              data={projectSlug?.data?.users}
            />
          </div>
          <div className={style.board__right_selection_item}>
            <SelectInput
              label="Выбрать тип"
              placeholder="выбрать тип"
              data={[]}
              value={selectedUsers}
              onChange={setSelectedUsers}
            />
          </div>
          <div className={style.board__right_selection_item}>
            <SelectInput
              label="Выбрать компонент"
              placeholder="Выбрать компонент"
              data={projectSlug?.data?.flow.possibleProjectComponents}
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
          <div className={style.board__right_tasks_item}>
            <h5>В ревью</h5>
            <div
              className={style.board__right_tasks_item_tasks}
              onDrop={(e) => handleDrop(e, 'В ревью')}
              onDragOver={handleDragOver}
            >
              {getTasksByStatus('В ревью').map((task) => (
                <CardTask key={task.id} task={task} onDragEnd={handleDragEnd} />
              ))}
            </div>
          </div>
          <div className={style.board__right_tasks_item}>
            <h5>В тестировании</h5>
            <div
              className={style.board__right_tasks_item_tasks}
              onDrop={(e) => handleDrop(e, 'В тестировании')}
              onDragOver={handleDragOver}
            >
              {getTasksByStatus('В тестировании').map((task) => (
                <CardTask key={task.id} task={task} onDragEnd={handleDragEnd} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
