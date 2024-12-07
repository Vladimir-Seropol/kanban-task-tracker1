import React, { useState } from 'react';
import Image from 'next/image';
import Button from '@/components/Button';
import Link from 'next/link';
import { useRouter } from 'next/router';
import UserInfo from '@/components/UserInfo/UserInfo';
import { UserResponseType } from '@/types/UserResponseType';
import useSWR, { BareFetcher } from 'swr';
import style from './Sidebar.module.css';

const fetcher: BareFetcher<UserResponseType> = async (url: string) => {
  const response = await fetch(url);
  const result = await response.json();
  return result.data;
};

function Sidebar() {
  const [isClicked, setIsClicked] = useState(false); // Состояние для отслеживания клика
  const router = useRouter();
  const { data } = useSWR('/api/auth/user', fetcher);

  const handleClick = () => {
    setIsClicked(!isClicked); // Меняем состояние при клике
  };

  const clearAuthCookies = () => {
    document.cookie =
      'auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
    router.push('/login');
  };

  return (
    <aside
      className={`${style.board__left} ${isClicked ? style.is_clicked : ''}`}
    >
      <div className={style.board__left_header}>
        <Image
          className={style.board__left_header_logo}
          src="/logo_board.png"
          alt="logo_board"
          width={103}
          height={21}
        />
        <Image
          className={style.board__left_header_icon}
          src="/icon_board1.svg"
          alt="icon_board"
          width={24}
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
      {data && <UserInfo name={data.name} position={data.position} />}
      <div className={style.board__left_user}>
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
          onClick={clearAuthCookies}
        />
      </div>
      <div className={style.board__left_project}>
        <Image src="/icon_board3.svg" alt="icon_board" width={18} height={18} />
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
