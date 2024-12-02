/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable react/no-array-index-key */
import { useState } from 'react';
import Link from 'next/link';
import TextInput from '@/components/Inputs/TextInput/TextInput';
import CardInternal from '@/components/ProjectsCard/CardInternal';
import CardDemo from '@/components/ProjectsCard/CardDemo';
import Layout from '@/pages/projects/layout';
import style from './style.module.css';

export default function Board() {
  const [showArchived, setShowArchived] = useState(false); // Состояние для отображения архивных проектов
  const [archivedVisible, setArchivedVisible] = useState(false); // Для плавного отображения архивных проектов
  const [projectsVisible, setProjectsVisible] = useState(true); // Для плавного отображения всех проектов

  const handleCheckboxChange = () => {
    setShowArchived((prev) => !prev); // Переключаем состояние чекбокса
    setArchivedVisible((prev) => !prev); // Плавное скрытие/показ архивных проектов
    setTimeout(() => setProjectsVisible(!projectsVisible), 300); // Плавный переход всех проектов после архивных
  };

  return (
    <Layout>
      <main className={style.board__right}>
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
            <TextInput
              label="Название проекта"
              placeholder="Введите название проекта"
              value={''}
              onChange={() => {}}
            />
          </div>
          <div className={style.board__right_selection_item}>
            <TextInput
              label="Номер задачи"
              placeholder="Введите номер задачи"
              value={''}
              onChange={() => {}}
            />
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

        <div className={style.board__right_projects}>
          <div
            className={`${style.board__right_archived_projects} ${archivedVisible ? style.show : ''}`}
          >
            {showArchived && (
              <>
                <h5 style={{ marginBottom: '16px' }}>Архивные проекты</h5>
                <div className={style.board__right_selected_projects}>
                  {Array.from({ length: 4 }).map((_, index) => (
                    <div
                      key={index}
                      className={style.board__right_selected_internal_item}
                    >
                      <CardInternal />
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {!showArchived && (
            <div
              className={`${style.board__right_featured} ${projectsVisible ? style.show : ''}`}
            >
              <h5 style={{ marginBottom: '16px' }}>Избранные проекты</h5>
              <div className={style.board__right_selected_projects}>
                <CardInternal />
                <CardDemo />
              </div>
              <div className={style.board__right_internal_projects}>
                {Array.from({ length: 16 }).map((_, index) => (
                  <div
                    key={index}
                    className={style.board__right_selected_internal_item}
                  >
                    <CardInternal />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </Layout>
  );
}
