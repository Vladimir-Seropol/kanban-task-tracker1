/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-console */
/* eslint-disable react/function-component-definition */
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { useGetProjectApiQuery } from '@/redux/services/ProjectUser';
import { ItemDataProjectType } from '../../types/ItemDataProjectType/ItemDataProjectType';
import style from '../CardProjectAllApi/CardProjectAllApi.module.css';
import { getNameSlug } from '../../redux/features/nameSlug/nameSlugSlice';
import { CardProjectAllApiProps } from '../../types/CardProjectAllApi/CardProjectAllApi';
import { FavorArhivedType } from '../../types/FavorArhivedType/FavorArhivedType';

const CardProjectFavor: React.FC<CardProjectAllApiProps> = ({
  width,
  height,
}: CardProjectAllApiProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const { data: projectAll } = useGetProjectApiQuery('project');
  const dispatch = useDispatch();
  const favor: FavorArhivedType = projectAll?.data?.filter(
    (item: ItemDataProjectType) => item.is_favorite === true,
  );
  console.log(`favor`, favor);
  useEffect(() => {
    // Проверка на клиенте
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
      {favor && (
        <div>
          {favor.map((item) => (
            <div
              key={item.id}
              className={style.board__right_projects}
              style={{ width, height }}
              role="button"
              tabIndex={0}
              onClick={() => {
                dispatch(getNameSlug(item.slug));
                console.log(`item.slug`, dispatch(getNameSlug(item.slug)));
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  dispatch(getNameSlug(item.slug));
                }
              }}
            >
              <div className={style.board__right_selected_projects}>
                <Image src="/icon_work.svg" alt="icon" width={20} height={20} />
                <Image
                  className={`${style.icon_star} ${isFavorite ? style.icon_star_favorite : ''}`}
                  src="/icon_star.svg"
                  alt="Star"
                  width={20}
                  height={20}
                  onClick={() => handleStarClick(item.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
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
          ))}
        </div>
      )}
    </>
  );
};
export default CardProjectFavor;
