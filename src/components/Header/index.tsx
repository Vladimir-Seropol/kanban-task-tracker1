import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Button from '../Button';
import style from './style.module.css';

export default function Header() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const authToken = document.cookie.match(/auth_token=([^;]+)/);
    setIsLoggedIn(!!authToken);
  }, []);

  const handleLoginLogout = () => {
    if (isLoggedIn) {
      document.cookie =
        'auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
      setIsLoggedIn(false);
      router.push('/login');
    } else {
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
          text={isLoggedIn ? 'Выйти' : 'Войти'}
          onClick={handleLoginLogout}
          type="button"
          inlineStyle={{ width: '106px' }}
        />
      </div>
    </header>
  );
}
