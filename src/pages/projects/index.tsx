/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable import/newline-after-import */

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import TextInput from '@/components/Inputs/TextInput/TextInput';
import CardMyInternal from '@/components/CardMyInternal/CardMyInternal';
import Layout from '@/pages/projects/layout';
import { useAppDispatch } from '@/redux/hooks/hooks';
import { useGetProjectApiQuery } from '@/redux/services/ProjectUser';
import CardProjectFavor from '@/components/CardProjectFavor/CardProjectFavor';
import CardProjectAllApi from '@/components/CardProjectAllApi/CardProjectAllApi';
import { getProjectArchived } from '@/redux/features/projectArchived/projectArchivedSlice';
import style from './style.module.css';
import { ItemDataProjectType } from '../../types/ItemDataProjectType/ItemDataProjectType';
import Button from '../../components/Button/index';
export default function Board() {
  const [showArchived, setShowArchived] = useState(false);
  const [archivedVisible, setArchivedVisible] = useState(false);
  const [projectsVisible, setProjectsVisible] = useState(true);
  const [archiveProject, setArchiveProject] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { data: projectAll } = useGetProjectApiQuery('project');

  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredProjects = useMemo(() => {
    if (!projectAll?.data) return [];
    return projectAll.data.filter((item: ItemDataProjectType) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [projectAll, searchTerm]);

  const handleCheckboxChange = () => {
    setShowArchived((prev) => !prev);
    setArchivedVisible((prev) => !prev);
    setTimeout(() => setProjectsVisible(!projectsVisible), 300);

    dispatch(getProjectArchived(projectAll?.data));

    setArchiveProject((prev) => !prev);
  };

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
              value=""
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
                  {archiveProject && <CardMyInternal />}
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
                <CardProjectFavor />
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
