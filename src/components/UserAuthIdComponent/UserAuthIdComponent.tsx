/* eslint-disable import/newline-after-import */
/* eslint-disable react/function-component-definition */
import React from 'react';
import Image from 'next/image';
import profilePic from '../../assets/images/user/Ellipse 27.jpg';
import { UserAuthIdComponentProps } from '../../types/UserAuthIdComponent/UserAuthIdComponent';
import style from './UserAuthIdComponent.module.css';
const UserAuthIdComponent: React.FC<UserAuthIdComponentProps> = ({
  User,
}: UserAuthIdComponentProps) => {
  return (
    <div className={style.wrapper_UserAuth}>
      <Image
        src={profilePic}
        alt="Изображение пользователя"
        width={48}
        height={48}
      />
      <div className={style.div_info_UserAuth}>
        <p>{User.data.name}</p>
        <p>{User.data.position}</p>
      </div>
    </div>
  );
};
export default UserAuthIdComponent;
