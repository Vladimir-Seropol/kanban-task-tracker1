import Link from 'next/link';
import Button from '@/components/Button';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import CustomDatePicker from '@/components/Inputs/DatePicker/CustomDatePicker';
import SelectInput from '@/components/Inputs/SelectInput/SelectInput';
import TextInput from '@/components/Inputs/TextInput/TextInput';
import style from './style.module.css';
<<<<<<< HEAD
import { UserType } from '../../../types/UserType';
=======

interface User {
  id: number;
  firstName: string;
  lastName: string;
}
>>>>>>> f18668122d206c0987a8d1ee372220131422390a

export default function Slug() {
  // Состояние для хранения данных о пользователе
  const [user, setUser] = useState(null);
  const [isClicked, setIsClicked] = useState(false); // Состояние для отслеживания клика
  const [selectedUsers, setSelectedUsers] = useState<UserType[]>([]);

  // Добавляем состояние для выбранной даты
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  // Эмуляция запроса данных о пользователе (например, через fetch)
  useEffect(() => {
    // Тут можно заменить на реальный API-запрос для получения данных
    const fetchUserData = async () => {
      // Это пример, в реальном приложении запросите данные пользователя
      const userData = {
        name: 'User',
        is_admin: true, // Установите флаг is_admin в true или false в зависимости от ответа
      };
      setUser(userData);
    };

    fetchUserData();
  }, []); // Запрашиваем данные только один раз при монтировании компонента

  // Интерфейс для пользователей выпадающего списка
  //   const users = [
  //     { id: 1, firstName: 'Иван', lastName: 'Иванов' },
  //     { id: 2, firstName: 'Петр', lastName: 'Петров' },
  //     { id: 3, firstName: 'Сергей', lastName: 'Сергеев' },
  //   ];

  const handleClick = () => {
    setIsClicked(!isClicked); // Меняем состояние при клике
  };

  return (
    <main className="main">
      <div className={style.board}>
        <div
          className={`${style.board__left} ${isClicked ? style.is_clicked : ''}`}
        >
          <div className={style.board__left_header}>
            <Image
              className={style.board__left_header_logo}
              src="/logo_board.png"
              alt="logo_board"
              width={103}
              height={21}
            />
            <Image
              className={style.board__left_header_icon}
              src="/icon_board1.svg"
              alt="icon_board"
              width={24}
              height={24}
              onClick={handleClick}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleClick();
                }
              }}
              role="button"
              tabIndex={0}
              style={{ cursor: 'pointer' }}
            />
          </div>
          <div className={style.board__left_user}>
            <h2 style={{ color: '#fff' }}>{user?.name}</h2>
            <Button
              text="Выйти"
              inlineStyle={{
                width: '100%',
                height: '24px',
                padding: '4.5px',
                background: '#2D2D2D',
                fontSize: '12px',
                lineHeight: '14.52px',
                color: '#787878',
              }}
              type="button"
              // eslint-disable-next-line no-console
              onClick={() => console.log('click')}
            />
          </div>
          <div className={style.board__left_project}>
            <Link href="/projects">
              <Image
                src="/icon_board3.svg"
                alt="icon_board"
                width={18} // Укажите ширину изображения
                height={18}
                style={{ verticalAlign: 'top', marginRight: '8px' }}
              />
              <h4 style={{ color: '#fff', display: 'inline-block' }}>
                Проекты
              </h4>
            </Link>
          </div>
        </div>

        <div className={style.board__right}>
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

            {/* Условное отображение кнопки "Добавить задачу" */}
            {user?.is_admin && (
              <Button
                svg={
                  <Image
                    src="/icon_create.svg"
                    alt="icon_create"
                    width={16} // Укажите ширину изображения
                    height={16}
                    style={{ verticalAlign: 'middle', marginRight: '8px' }}
                  />
                }
                text="Добавить задачу"
                type="button"
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

            <CustomDatePicker
              placeholder="Дата завершения"
              value={endDate}
              onChange={setEndDate}
              className={style.my_custom_class}
              inputClassName={style.my_input_class}
            />
          </div>
          <div className={style.board__right_tasks}>
            <div className={style.board__right_tasks_item}>Новые</div>
            <div className={style.board__right_tasks_item}>В работе</div>
            <div className={style.board__right_tasks_item}>Выполнено</div>
            <div className={style.board__right_tasks_item}>В ревью</div>
            <div className={style.board__right_tasks_item}>
              Готовы к тестированию
            </div>
            <div className={style.board__right_tasks_item}>В тестировании</div>
            <div className={style.board__right_tasks_item}>Решены</div>
          </div>
        </div>
      </div>
    </main>
  );
}
