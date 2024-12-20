/* eslint-disable no-console */
/* eslint-disable react/function-component-definition */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import style from './CardProjectAllApi.module.css';
import { CardProjectAllApiProps } from '../../types/CardProjectAllApi/CardProjectAllApi';
import { getNameSlug } from '../../redux/features/nameSlug/nameSlugSlice';

const CardProjectAllApi: React.FC<CardProjectAllApiProps> = ({
  projectAll,
  width,
  height,
}: CardProjectAllApiProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const dispatch = useDispatch();

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

  if (!projectAll?.data?.length) {
    return <p>Нет доступных проектов</p>;
  }

  return (
    <div className={style.cards}>
      {projectAll?.data.map((item) => (
        <div
          className={style.board__right_projects}
          style={{ width, height }}
          key={item.id}
          role="button"
          tabIndex={0}
          onClick={() => {
            dispatch(getNameSlug(item.slug));
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
              onClick={() => handleStarClick(item.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleStarClick(item.id);
                }
              }}
              role="button"
              tabIndex={0}
              width={20}
              height={20}
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
  );
};
export default CardProjectAllApi;
