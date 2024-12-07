/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react';
import Link from 'next/link';
import style from './style.module.css';

export default function CardDemo() {
  const [isFavorite, setIsFavorite] = useState(false);

  // Используем useEffect, чтобы работать с localStorage только на клиенте
  useEffect(() => {
    const storedFavorite = localStorage.getItem('isFavoriteDemo');
    if (storedFavorite) {
      setIsFavorite(JSON.parse(storedFavorite)); // Загружаем сохраненное состояние
    }
  }, []); // Этот эффект сработает только один раз при монтировании компонента

  // Обработчик клика по звездочке
  const handleStarClick = () => {
    const newFavoriteState = !isFavorite;
    setIsFavorite(newFavoriteState); // Переключаем состояние

    // Сохраняем состояние в localStorage
    localStorage.setItem('isFavoriteDemo', JSON.stringify(newFavoriteState));
  };

  return (
    <div className={style.board__right_projects}>
      <div className={style.board__right_selected_projects}>
        <img src="/icon_demo.svg" alt="Demo icon" />

        {/* Используем img для отображения SVG */}
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
      <Link href="/projects/slug">
        <div className={style.board__right_selected_project_item}>Demo</div>
        <p>12 сотрудников</p>
      </Link>
    </div>
  );
}
