import React, { useEffect, useState } from 'react';
import style from './CardProjectAllApi.module.css';
import { CardProjectAllApiProps } from '../../types/CardProjectAllApi/CardProjectAllApi';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { getNameSlug } from '../../redux/features/nameSlug/nameSlugSlice';
import { useGetProjectApiQuery } from '@/redux/services/ProjectUser';
const CardProjectAllApi: React.FC<CardProjectAllApiProps> = ({
  projectAll,
  width,
  height,
}: CardProjectAllApiProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const dispatch = useDispatch();
  // Используем useEffect, чтобы работать с localStorage только на клиенте
  useEffect(() => {
    // Проверка на клиенте
    if (typeof window !== 'undefined') {
      const storedFavorite = localStorage.getItem('isFavorite');
      if (storedFavorite) {
        setIsFavorite(JSON.parse(storedFavorite)); // Загружаем сохраненное состояние
      }
    }
  }, []); // Этот эффект сработает только один раз при монтировании компонента

  //Обработчик клика по звездочке
  // const handleStarClick = () => {
  //   const newFavoriteState = !isFavorite;
  //   setIsFavorite(newFavoriteState); // Переключаем состояние

  //   // Сохраняем состояние в localStorage
  //   localStorage.setItem('isFavorite', JSON.stringify(newFavoriteState));
  // };

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

  // let srcImg = projectAll?.data
  //   .map((item) => item.logo?.link)
  //   .filter((elem) => elem !== undefined)
  //   .join();
  // console.log(`srcImg`, srcImg);
  // let srcUrl = `https://trainee-academy.devds.ru/${srcImg}`;
  // console.log(`srcUrl`, srcUrl);
  // let srcImg;
  // if (logoImg) {
  //   for (let elem of logoImg) {
  //     if (elem === null) {
  //       return (srcImg = <img src={'/icon_work.svg'} alt="icon" />);
  //     } else {
  //       return (srcImg = (
  //         <img
  //           src={`https://trainee-academy.devds.ru/${elem.link}`}
  //           alt="icon"
  //         />
  //       ));
  //     }
  //   }
  // }

  if (!projectAll?.data?.length) {
    return <p>Нет доступных проектов</p>;
  }

  return (
    <>
      <div className={style.cards}>
        {projectAll?.data.map((item) => (
          <div
            className={style.board__right_projects}
            style={{ width, height }}
            key={item.id}
            onClick={() => {
              dispatch(getNameSlug(item.slug));
              console.log(`item.slug`, dispatch(getNameSlug(item.slug)));
            }}
          >
            <div className={style.board__right_selected_projects}>
              <img src="/icon_work.svg" alt="icon" />

              <img src={`${srcImg}`} alt="icon" />
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
      </div>
    </>
  );
};
export default CardProjectAllApi;
