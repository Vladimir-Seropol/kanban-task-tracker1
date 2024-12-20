/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import style from './style.module.css';

export default function CardDemo() {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const storedFavorite = localStorage.getItem('isFavoriteDemo');
    if (storedFavorite) {
      setIsFavorite(JSON.parse(storedFavorite));
    }
  }, []);

  const handleStarClick = () => {
    const newFavoriteState = !isFavorite;
    setIsFavorite(newFavoriteState);

    localStorage.setItem('isFavoriteDemo', JSON.stringify(newFavoriteState));
  };

  return (
    <div className={style.board__right_projects}>
      <div className={style.board__right_selected_projects}>
        <Image src="/icon_demo.svg" alt="Demo icon" width={20} height={20} />

        <Image
          className={`${style.icon_star} ${isFavorite ? style.icon_star_favorite : ''}`}
          src="/icon_star.svg"
          alt="Star"
          width={20}
          height={20}
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
