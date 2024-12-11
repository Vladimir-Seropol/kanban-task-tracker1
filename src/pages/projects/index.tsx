/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable react/no-array-index-key */
import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import TextInput from '@/components/Inputs/TextInput/TextInput';
import CardInternal from '@/components/ProjectsCard/CardInternal';
import { CardMyInternal } from '@/components/CardMyInternal/CardMyInternal';
import CardDemo from '@/components/ProjectsCard/CardDemo';
import Layout from '@/pages/projects/layout';
import style from './style.module.css';
import { useGetProjectApiQuery } from '../../redux/services/ProjectUser';

import CardProjectAllApi from '../../components/CardProjectAllApi/CardProjectAllApi';
import { useAppDispatch, useAppSelector } from '@/redux/hooks/hooks';
import { getProjectArchived } from '../../redux/features/projectArchived/projectArchivedSlice';
import { useGetAuthUserQuery } from '../../redux/services/AuthUser';
import { ItemDataProjectType } from '../../types/ItemDataProjectType/ItemDataProjectType';
import Button from '@/components/Button/index';
export default function Board() {
  const [showArchived, setShowArchived] = useState(false); // Состояние для отображения архивных проектов
  const [archivedVisible, setArchivedVisible] = useState(false); // Для плавного отображения архивных проектов
  const [projectsVisible, setProjectsVisible] = useState(true); // Для плавного отображения всех проектов
  const [archiveProject, setArchiveProject] = useState<boolean>(false); //Для показа проектов, которые являются архивными
  //Получение данных по проектам
  const dispatch = useAppDispatch();
  const { data: projectAll } = useGetProjectApiQuery('project');

  const [searchTerm, setSearchTerm] = useState<string>('');

  // Мемоизация отфильтрованных данных
  const filteredProjects = useMemo(() => {
    if (!projectAll?.data) return [];
    return projectAll.data.filter((item: ItemDataProjectType) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [projectAll, searchTerm]);

  const handleCheckboxChange = () => {
    setShowArchived((prev) => !prev); // Переключаем состояние чекбокса
    setArchivedVisible((prev) => !prev); // Плавное скрытие/показ архивных проектов
    setTimeout(() => setProjectsVisible(!projectsVisible), 300); // Плавный переход всех проектов после архивных

    dispatch(getProjectArchived(projectAll?.data)); // fixed here

    setArchiveProject((prev) => !prev);
  };

  //Функция поиска проектов, которые должны быть в избранном
  const favoritProject = () => {
    if (!projectAll?.data) return [];
    let favor = projectAll.data.filter(
      (item: ItemDataProjectType) => item.is_favorite === true,
    );
    return favor;
  };
  console.log(`favoritProject`, favoritProject());

  const handleChangeInput = (value: string) => {
    if (value.length >= 3) return setSearchTerm(value);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
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
              value={searchTerm}
              onChange={handleChangeInput}
            />

            {searchTerm && (
              <Button
                text="Очистить"
                type="button"
                onClick={handleClearSearch}
                inlineStyle={{ marginTop: '10px' }}
              />
            )}
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
        {/* {archiveProject && <CardMyInternal />  // -мой компонент с проектами в архиве} */}

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
                {/* <CardMyInternal />  // -мой компонент с проектами в архиве*/}
              </>
            )}
          </div>

          {!showArchived && (
            <div
              className={`${style.board__right_featured} ${projectsVisible ? style.show : ''}`}
            >
              <h5 style={{ marginBottom: '16px' }}>Избранные проекты</h5>
              <div className={style.board__right_selected_projects}>
                <CardProjectAllApi
                  projectAll={{
                    data: [
                      {
                        name: 'Project 1',
                        user_count: 5,
                        id: 0,
                      },
                    ],
                  }}
                />
                <CardDemo />
              </div>
              <div className={style.board__right_internal_projects}>
                {filteredProjects.length > 0 && (
                  <CardProjectAllApi projectAll={{ data: filteredProjects }} />
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </Layout>
  );
}
