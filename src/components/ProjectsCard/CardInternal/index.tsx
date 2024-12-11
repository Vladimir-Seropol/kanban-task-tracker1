/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
/* eslint-disable react/require-default-props */
/* eslint-disable prettier/prettier */
/* eslint-disable @next/next/no-img-element */
import { useAppSelector } from '@/redux/hooks/hooks';
import { useEffect, useState } from 'react';
import style from './style.module.css';
import { ArchivedType } from '../../../types/ArchivedType/ArchivedType';

interface CardInternalProps {
  width?: string; // Пропс для ширины (например, '200px' или '50%')
  height?: string; // Пропс для высоты (например, '300px' или 'auto')
}

export default function CardInternal({
  width = '264px',
  height = '124px',
}: CardInternalProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const getArchived = useAppSelector((state) => state.projectctArhived.arhived);
  console.log(`getArchived`, getArchived);
  // Используем useEffect, чтобы работать с localStorage только на клиенте
  useEffect(() => {
    // Проверка на клиенте
    const storedFavorite = localStorage.getItem('isFavorite');
    if (storedFavorite) {
      setIsFavorite(JSON.parse(storedFavorite)); // Загружаем сохраненное состояние
    }
  }, []); // Этот эффект сработает только один раз при монтировании компонента

  // Обработчик клика по звездочке
  const handleStarClick = () => {
    const newFavoriteState = !isFavorite;
    setIsFavorite(newFavoriteState); // Переключаем состояние

    // Сохраняем состояние в localStorage
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
                // Обработка Enter или Space
                handleStarClick();
              }
            }}
            role="button" // Указываем, что это кнопка
            tabIndex={0} // Даем элементу возможность быть фокусируемым
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
