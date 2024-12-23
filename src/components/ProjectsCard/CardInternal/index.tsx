/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
/* eslint-disable react/require-default-props */
/* eslint-disable prettier/prettier */
/* eslint-disable @next/next/no-img-element */
import { useAppSelector } from '@/redux/hooks/hooks';
import { useEffect, useState } from 'react';
import style from './style.module.css';

interface CardInternalProps {
  width?: string;
  height?: string;
}

export default function CardInternal({
  width = '264px',
  height = '124px',
}: CardInternalProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const getArchived = useAppSelector((state) => state.projectctArhived.arhived);
  console.log(`getArchived`, getArchived);

  useEffect(() => {
    const storedFavorite = localStorage.getItem('isFavorite');
    if (storedFavorite) {
      setIsFavorite(JSON.parse(storedFavorite));
    }
  }, []);

  const handleStarClick = () => {
    const newFavoriteState = !isFavorite;
    setIsFavorite(newFavoriteState);

    localStorage.setItem('isFavorite', JSON.stringify(newFavoriteState));
  };

  return (
    <>
      <div className={style.board__right_projects} style={{ width, height }}>
        <div className={style.board__right_selected_projects}>
          <img src="/icon_work.svg" alt="icon" />
          <img
            className={`${style.icon_star} ${isFavorite ? style.icon_star_favorite : ''}`}
            src="/icon_star.svg"
            alt="Star"
            onClick={handleStarClick}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleStarClick();
              }
            }}
            role="button"
            tabIndex={0}
          />
        </div>
        <div className={style.board__right_selected_project_item}>
          DS Внутренние проекты
        </div>
        <p>12 сотрудников</p>
      </div>
    </>
  );
}
