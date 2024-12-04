import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Button from '@/components/Button';
import Link from 'next/link';
import style from './Sidebar.module.css';
import { useGetAuthUserQuery } from '../../redux/services/AuthUser';
import UserAuthIdComponent from '../../components/UserAuthIdComponent/UserAuthIdComponent';
import { useRouter } from 'next/router';
function Sidebar() {
  const [isClicked, setIsClicked] = useState(false); // Состояние для отслеживания клика

  const handleClick = () => {
    setIsClicked(!isClicked); // Меняем состояние при клике
  };
  //Получение данных по юзеру
  const { data: User } = useGetAuthUserQuery('user');

  const router = useRouter();
  return (
    <aside
      className={`${style.board__left} ${isClicked ? style.is_clicked : ''}`}
    >
      <div className={style.board__left_header}>
        <Image
          className={style.board__left_header_logo}
          src="/logo_board.png"
          alt="logo_board"
          width={103} // Укажите ширину изображения
          height={21}
        />
        <Image
          className={style.board__left_header_icon}
          src="/icon_board1.svg"
          alt="icon_board"
          width={24} // Укажите ширину изображения
          height={24}
          onClick={handleClick}
          onKeyDown={(e: { key: string }) => {
            if (e.key === 'Enter' || e.key === ' ') {
              handleClick();
            }
          }}
          role="button"
          tabIndex={0}
          style={{ cursor: 'pointer' }}
        />
      </div>
      {User && <UserAuthIdComponent User={User} />}
      <div className={style.board__left_user}>
        {/* <h2 style={{ color: '#fff' }}>User</h2> */}
        <Button
          text="Выйти"
          inlineStyle={{
            width: '100%',
            height: '24px',
            padding: '4.5px',
            background: '#2D2D2D',
            fontSize: '12px',
            lineHeight: '14.52px',
            color: '#787878',
            marginTop: '-9px',
          }}
          type="button"
          onClick={() => router.push('/login')}
        />
      </div>
      <div className={style.board__left_project}>
        <Image
          src="/icon_board3.svg"
          alt="icon_board"
          width={18} // Укажите ширину изображения
          height={18}
        />
        <Link href="/projects">
          <h4 className={`${style.sidebarLink}`} style={{ color: '#fff' }}>
            Проекты
          </h4>
        </Link>
      </div>
    </aside>
  );
}

export default Sidebar;
