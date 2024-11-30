/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router'; // Импортируем useRouter
import Button from '../Button';
import style from './style.module.css';

export default function Header() {
  const router = useRouter(); // Инициализация хука

  const handleClick = () => {
    // Переход на страницу /login при клике на кнопку
    router.push('/login');
  };

  return (
    <div className="container">
      <header className={style.header}>
        <div className={style.logo}>
          <img src="/logo.png" alt="Logo" />
        </div>
        <Button
          text="Войти"
          onClick={handleClick} // Вешаем обработчик клика
          type="button"
          inlineStyle={{ width: '106px' }}
        />
      </header>
    </div>
  );
}
