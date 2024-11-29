/* eslint-disable @next/next/no-img-element */
import Button from '../Button';
import style from './style.module.css';

export default function Header() {
  return (
    <div className="container">
      <header className={style.header}>
        <div className={style.logo}>
          <img src="/logo.png" alt="Logo" />
        </div>
        <Button
          text="Войти"
          // eslint-disable-next-line no-console
          onClick={() => console.log('click')}
          type="button"
          inlineStyle={{ width: '106px' }}
        />
      </header>
    </div>
  );
}
