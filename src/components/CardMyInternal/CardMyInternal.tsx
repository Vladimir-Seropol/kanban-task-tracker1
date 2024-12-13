import React, { useState, useEffect } from 'react';
import { useGetProjectApiQuery } from '../../redux/services/ProjectUser';
import { ItemDataProjectType } from '../../types/ItemDataProjectType/ItemDataProjectType';
import { FavorArhivedType } from '../../types/FavorArhivedType/FavorArhivedType';
import { CardProjectAllApiProps } from '../../types/CardProjectAllApi/CardProjectAllApi';
import style from '../CardProjectAllApi/CardProjectAllApi.module.css';
import { useDispatch } from 'react-redux';
import { getNameSlug } from '../../redux/features/nameSlug/nameSlugSlice';
import Link from 'next/link';

const CardMyInternal: React.FC<CardProjectAllApiProps> = ({
  width,
  height,
}: CardProjectAllApiProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const { data: projectAll } = useGetProjectApiQuery('project');
  console.log(`project - все проекты`, projectAll);
  const dispatch = useDispatch();
  let archived: FavorArhivedType = projectAll?.data?.filter(
    (item: ItemDataProjectType) => item.is_archived !== 0,
  );
  console.log(`archived`, archived);
  const logo = archived.map((elem) => elem.logo?.link);
  const strLogo = logo.join();

  useEffect(() => {
    // Проверка на клиенте
    if (typeof window !== 'undefined') {
      const storedFavorite = localStorage.getItem('isFavorite');
      if (storedFavorite) {
        setIsFavorite(JSON.parse(storedFavorite)); // Загружаем сохраненное состояние
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
      {archived && (
        <>
          {archived.map((item) => (
            <div
              key={item.id}
              className={style.board__right_projects}
              style={{ width, height }}
              onClick={() => {
                dispatch(getNameSlug(item.slug));
                console.log(`item.slug`, dispatch(getNameSlug(item.slug)));
              }}
            >
              <div className={style.board__right_selected_projects}>
                <img
                  src={`https://trainee-academy.devds.ru/${strLogo}`}
                  alt="icon"
                />
                <img
                  className={`${style.icon_star} ${isFavorite ? style.icon_star_favorite : ''}`}
                  src="/icon_star.svg"
                  alt="Star"
                  onClick={() => handleStarClick(item.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      // Обработка Enter или Space
                      handleStarClick(item.id);
                    }
                  }}
                  role="button" // Указываем, что это кнопка
                  tabIndex={0} // Даем элементу возможность быть фокусируемым
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
        </>
      )}
    </>
  );
};

export default CardMyInternal;
