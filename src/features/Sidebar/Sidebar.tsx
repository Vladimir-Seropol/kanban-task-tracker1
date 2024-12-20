/* eslint-disable no-console */
import React, { useState } from 'react';
import Image from 'next/image';
import Button from '@/components/Button';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { UserResponseType } from '@/types/UserResponseType';
import useSWR, { BareFetcher } from 'swr';
import style from './Sidebar.module.css';
import { useGetAuthUserQuery } from '../../redux/services/AuthUser';
import UserAuthIdComponent from '../../components/UserAuthIdComponent/UserAuthIdComponent';

const fetcher: BareFetcher<UserResponseType> = async (url: string) => {
  const response = await fetch(url);
  const result = await response.json();
  return result.data;
};

function Sidebar() {
  const [isClicked, setIsClicked] = useState(false);
  const router = useRouter();
  const { data } = useSWR('/api/auth/user', fetcher);
  console.log('AuthUser', data);
  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  const clearAuthCookies = () => {
    document.cookie =
      'auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
    router.push('/login');
  };

  const { data: User } = useGetAuthUserQuery('user');

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

      <div className={style.board__left_user}>
        {User && <UserAuthIdComponent User={User} />}
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
            marginTop: '12px',
          }}
          type="button"
          onClick={clearAuthCookies}
        />
      </div>

      <div
        className={style.board__left_project}
        style={{ marginLeft: isClicked ? '0' : '13px' }}
      >
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
