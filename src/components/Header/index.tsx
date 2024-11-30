/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router'; // Импортируем useRouter
import { useState } from 'react'; // Импортируем useState
import Button from '../Button';
import style from './style.module.css';

export default function Header() {
  const router = useRouter(); // Инициализация хука
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Состояние для авторизации

  const handleLoginLogout = () => {
    if (isLoggedIn) {
      // Логика для выхода из системы
      // Например, очистить сессию или токен
      setIsLoggedIn(false);
      // Дополнительно можно редиректить на главную или другую страницу
      router.push('/');
    } else {
      // Логика для входа в систему
      router.push('/login');
    }
  };

  return (
    <div className="container">
      <header className={style.header}>
        <div className={style.logo}>
          <img src="/logo.png" alt="Logo" />
        </div>
        <Button
          text={isLoggedIn ? 'Выйти' : 'Войти'} // Меняем текст кнопки
          onClick={handleLoginLogout} // Вешаем обработчик клика
          type="button"
          inlineStyle={{ width: '106px' }}
        />
      </header>
    </div>
  );
}
