import React, { useEffect, useState } from 'react';
import style from './CardProjectAllApi.module.css';
import { CardProjectAllApiProps } from '../../types/CardProjectAllApi/CardProjectAllApi';

const CardProjectAllApi: React.FC<CardProjectAllApiProps> = ({
  projectAll,
  width,
  height,
}: CardProjectAllApiProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  // Используем useEffect, чтобы работать с localStorage только на клиенте
  useEffect(() => {
    // Проверка на клиенте
    const storedFavorite = localStorage.getItem('isFavorite');
    if (storedFavorite) {
      setIsFavorite(JSON.parse(storedFavorite)); // Загружаем сохраненное состояние
    }
  }, []); // Этот эффект сработает только один раз при монтировании компонента

  //Обработчик клика по звездочке
  const handleStarClick = () => {
    const newFavoriteState = !isFavorite;
    setIsFavorite(newFavoriteState); // Переключаем состояние

    // Сохраняем состояние в localStorage
    localStorage.setItem('isFavorite', JSON.stringify(newFavoriteState));
  };

  return (
    <>
      <div className={style.cards}>
        {projectAll.data.map((item, id) => (
          <div
            className={style.board__right_projects}
            style={{ width, height }}
            key={id}
          >
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
              <p>{item.name} </p>
            </div>
            <p>{item.user_count} сотрудников</p>
          </div>
        ))}
      </div>
    </>
  );
};
export default CardProjectAllApi;
