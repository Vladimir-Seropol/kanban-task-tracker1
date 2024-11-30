/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import Button from '../../../components/Button';
import style from './style.module.css';
// eslint-disable-next-line import/order
import { useState, useEffect } from 'react';

export default function Slug() {
  // Состояние для хранения данных о пользователе
  const [user, setUser] = useState(null);
  const [isClicked, setIsClicked] = useState(false); // Состояние для отслеживания клика

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

  const handleClick = () => {
    setIsClicked(!isClicked); // Меняем состояние при клике
  };

  return (
    <div className="container">
      <main className="main">
        <div className={style.board}>
          <div
            className={`${style.board__left} ${isClicked ? style.is_clicked : ''}`}
          >
            <div className={style.board__left_header}>
              <img
                className={style.board__left_header_logo}
                src="/logo_board.png"
                alt="logo_board"
              />
              <img
                className={style.board__left_header_icon}
                src="/icon_board1.svg"
                alt="icon_board"
                onClick={handleClick}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleClick();
                  }
                }}
                // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
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
                <img
                  src="/icon_board3.svg"
                  alt="icon_board"
                  style={{ verticalAlign: 'top', marginRight: '8px' }}
                />
                <h4
                  //   className={style.board__left_project_text}
                  style={{ color: '#fff', display: 'inline-block' }}
                >
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
                    <img
                      src="/icon_create.svg"
                      alt="icon_create"
                      style={{ verticalAlign: 'middle', marginRight: '8px' }}
                    />
                  }
                  text="Добавить задачу"
                  type="button"
                  // eslint-disable-next-line no-console
                  onClick={() => console.log('click')}
                />
              )}
            </div>
            <div className={style.board__right_selection}>
              <div className={style.board__right_selection_item}>
                <p>Название задачи</p>
                <input type="text" placeholder="Название задачи" />
              </div>
              <div className={style.board__right_selection_item}>
                <p>Выбрать пользователей</p>
                <select name="" id="">
                  Пользователь
                </select>
              </div>
              <div className={style.board__right_selection_item}>
                <p>Выбрать тип</p>
                <select name="" id="">
                  Выбрать тип
                </select>
              </div>
              <div className={style.board__right_selection_item}>
                <p>Выбрать компонент</p>
                <select name="" id="">
                  Выбрать компонент
                </select>
              </div>
            </div>
            <div className={style.board__right_date}>
              <input
                className={style.doard__right_date_input}
                type="date"
                id="startDate"
                name="startDate"
              />
              <input
                className={style.doard__right_date_input}
                type="date"
                id="endDate"
                name="endDate"
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
              <div className={style.board__right_tasks_item}>
                В тестировании
              </div>
              <div className={style.board__right_tasks_item}>Решены</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
