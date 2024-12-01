/* eslint-disable no-console */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
/* eslint-disable prettier/prettier */
/* eslint-disable import/order */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import Link from 'next/link';
import Button from '../../components/Button';
import style from './style.module.css';
import TextInput from '@/components/Inputs/TextInput/TextInput';
import CardInternal from '@/components/ProjectsCard/CardInternal';
import CardDemo from '@/components/ProjectsCard/CardDemo';

export default function Board() {
  const [isClicked, setIsClicked] = useState(false); // Состояние для отслеживания клика
  const [showArchived, setShowArchived] = useState(false); // Состояние для отображения архивных проектов
  const [archivedVisible, setArchivedVisible] = useState(false); // Для плавного отображения архивных проектов
  const [projectsVisible, setProjectsVisible] = useState(true); // Для плавного отображения всех проектов

  const handleClick = () => {
    setIsClicked(!isClicked); // Меняем состояние при клике
  };

  const handleCheckboxChange = () => {
    setShowArchived((prev) => !prev); // Переключаем состояние чекбокса
    setArchivedVisible((prev) => !prev); // Плавное скрытие/показ архивных проектов
    setTimeout(() => setProjectsVisible(!projectsVisible), 300); // Плавный переход всех проектов после архивных
  };

  return (
    <main className="main">
      <div className={style.board}>
        <div className={`${style.board__left} ${isClicked ? style.is_clicked : ''}`}>
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
              role="button"
              tabIndex={0}
              style={{ cursor: 'pointer' }}
            />
          </div>
          <div className={style.board__left_user}>
            <h2 style={{ color: '#fff' }}>User</h2>
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
              onClick={() => console.log('click')}
            />
          </div>
          <div className={style.board__left_project}>
            <img src="icon_board3.svg" alt="icon_board" />
            <h4 style={{ color: '#fff' }}>Проекты</h4>
          </div>
        </div>

        <div className={style.board__right}>
          <div className={style.board__right_header}>
            <nav>
              <Link href="/">
                <span>Главная /</span>{' '}
              </Link>
              <span>Проекты</span>
            </nav>
          </div>
          <div className={style.board__right_title}>
            <h2>Проекты</h2>
          </div>
          <div className={style.board__right_selection}>
            <div className={style.board__right_selection_item}>
              <TextInput label="Название проекта" placeholder="Введите название проекта" value={''} onChange={() => {}} />
            </div>
            <div className={style.board__right_selection_item}>
              <TextInput label="Номер задачи" placeholder="Введите номер задачи" value={''} onChange={() => {}} />
            </div>
          </div>

          <div className={style.board__right_selection_checkbox}>
            <input
              type="checkbox"
              id="checkbox"
              checked={showArchived}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="checkbox">Показать архивные проекты</label>
          </div>

          {/* Плавная анимация для всех проектов */}
          <div
            className={style.board__right_projects}
          >
            <div
              className={`${style.board__right_archived_projects} ${archivedVisible ? style.show : ''}`}
            >
              {showArchived && (
                <>
                  <h5 style={{ marginBottom: '16px' }}>Архивные проекты</h5>
                  <div className={style.board__right_selected_projects}>
                    {/* Отображаем архивные проекты */}
                    {Array.from({ length: 4 }).map((_, index) => (
                      <div key={index} className={style.board__right_selected_internal_item}>
                        <CardInternal />
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Избранные проекты */}
            {!showArchived && (
              <div className={`${style.board__right_featured} ${projectsVisible ? style.show : ''}`}>
                <h5 style={{ marginBottom: '16px' }}>Избранные проекты</h5>
                <div className={style.board__right_selected_projects}>
                  {/* Отображаем избранные проекты */}
                  <CardInternal />
                  <CardDemo />
                </div>
                <div className={style.board__right_internal_projects}>
                  {/* Отображаем все проекты, включая избранные */}
                  {Array.from({ length: 16 }).map((_, index) => (
                    <div key={index} className={style.board__right_selected_internal_item}>
                      <CardInternal />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
