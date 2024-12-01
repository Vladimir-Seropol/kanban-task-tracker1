/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import style from './style.module.css';

export default function CardDemo() {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleStarClick = () => {
    setIsFavorite(!isFavorite); // Переключаем состояние избранного
  };

  return (
    <div className={style.board__right_projects}>
      <div className={style.board__right_selected_projects}>
        <img src="/icon_demo.svg" alt="" />

        {/* Иконка звезды, меняющая цвет при клике и появляется при наведении */}
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
      <div className={style.board__right_selected_project_item}>Demo</div>
      <p>12 сотрудников</p>
    </div>
  );
}
