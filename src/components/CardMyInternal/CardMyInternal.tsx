/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-console */
/* eslint-disable react/function-component-definition */
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { useGetProjectApiQuery } from '../../redux/services/ProjectUser';
import { ItemDataProjectType } from '../../types/ItemDataProjectType/ItemDataProjectType';
import { FavorArhivedType } from '../../types/FavorArhivedType/FavorArhivedType';
import { CardProjectAllApiProps } from '../../types/CardProjectAllApi/CardProjectAllApi';
import style from '../CardProjectAllApi/CardProjectAllApi.module.css';
import { getNameSlug } from '../../redux/features/nameSlug/nameSlugSlice';

const CardMyInternal: React.FC<CardProjectAllApiProps> = ({
  width,
  height,
}: CardProjectAllApiProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const { data: projectAll } = useGetProjectApiQuery('project');
  console.log('project - все проекты', projectAll);
  const dispatch = useDispatch();

  const archived: FavorArhivedType =
    projectAll?.data?.filter(
      (item: ItemDataProjectType) => item.is_archived !== 0,
    ) || [];

  console.log('archived', archived);

  const logo = archived.map((elem) => elem.logo?.link);
  const strLogo = logo.join(',');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedFavorite = localStorage.getItem('isFavorite');
      if (storedFavorite) {
        setIsFavorite(JSON.parse(storedFavorite));
      }
    }
  }, []);

  const handleStarClick = (itemId: number) => {
    const newFavoriteState = !isFavorite;
    setIsFavorite(newFavoriteState);
    localStorage.setItem(
      `isFavorite-${itemId}`,
      JSON.stringify(newFavoriteState),
    );
    console.log(
      `Проект ${itemId} ${newFavoriteState ? 'добавлен в избранное' : 'удален из избранного'}`,
    );
  };

  return (
    <>
      {archived.length > 0 ? (
        archived.map((item) => (
          <div
            role="button"
            tabIndex={0}
            key={item.id}
            className={style.board__right_projects}
            style={{ width, height }}
            onClick={() => {
              dispatch(getNameSlug(item.slug));
              console.log('item.slug', dispatch(getNameSlug(item.slug)));
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                dispatch(getNameSlug(item.slug));
                console.log('item.slug', dispatch(getNameSlug(item.slug)));
              }
            }}
          >
            <div className={style.board__right_selected_projects}>
              <Image
                src={`https://trainee-academy.devds.ru/${strLogo}`}
                alt="icon"
                width={20}
                height={20}
              />
              <Image
                className={`${style.icon_star} ${isFavorite ? style.icon_star_favorite : ''}`}
                src="/icon_star.svg"
                alt="Star"
                width={20}
                height={20}
                onClick={(e) => {
                  e.stopPropagation();
                  handleStarClick(item.id);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.stopPropagation();
                    handleStarClick(item.id);
                  }
                }}
                role="button"
                tabIndex={0}
              />
            </div>
            <div className={style.board__right_selected_project_item}>
              <Link href={`/projects/${item.slug}`}>
                <p>{item.name} </p>
              </Link>
            </div>
            <p>{item.user_count} сотрудников</p>
          </div>
        ))
      ) : (
        <p>Нет архивных проектов.</p>
      )}
    </>
  );
};

export default CardMyInternal;
