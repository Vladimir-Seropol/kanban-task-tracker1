import React from 'react';
import Image from 'next/image';
import profilePic from '../../assets/images/user/Ellipse 27.jpg';
import style from './UserAuthIdComponent.module.css';
import { UserTypeResponse } from '@/types/UserTypeResponse';

export default function UserInfo(user: UserTypeResponse) {
  const { name, position } = user;
  return (
    <div className={style.wrapper_UserAuth}>
      <Image
        src={profilePic}
        alt="Изображение пользователя"
        width={48}
        height={48}
      />
      <div className={style.div_info_UserAuth}>
        <p>{name}</p>
        <p>{position}</p>
      </div>
    </div>
  );
}
