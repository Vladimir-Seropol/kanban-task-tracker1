/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router'; // Импортируем useRouter
import { useEffect, useState } from 'react'; // Импортируем useState
import Image from 'next/image';
import Button from '../Button';
import style from './style.module.css';

export default function Header() {
  const router = useRouter(); // Инициализация хука
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Состояние для авторизации

  useEffect(() => {
    // Проверяем, авторизован ли пользователь в cookies
    const authToken = document.cookie.match(/auth_token=([^;]+)/);
    setIsLoggedIn(!!authToken);
  }, []);

  const handleLoginLogout = () => {
    if (isLoggedIn) {
      // Логика для выхода из системы
      document.cookie =
        'auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
      setIsLoggedIn(false);
      router.push('/login');
    } else {
      // Перенаправление на страницу входа
      router.push('/login');
    }
  };

  return (
    <header className={style.header}>
      <div
        className="container"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <div className={style.logo}>
          <Image src="/Logo.png" alt="Logo" width={160} height={43} />
        </div>
        <Button
          text={isLoggedIn ? 'Выйти' : 'Войти'} // Меняем текст кнопки
          onClick={handleLoginLogout} // Вешаем обработчик клика
          type="button"
          inlineStyle={{ width: '106px' }}
        />
      </div>
    </header>
  );
}
