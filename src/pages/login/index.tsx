import Button from '@/components/Button';
import { inter } from '@/assets/fonts/fonts';
import style from './login.module.css';

export default function Login() {
  return (
    <main className={`${style.login} ${inter.className}`}>
      <div className="container">
        <h1 className={style.title}>Вход</h1>
        <form className={style.form}>
          <label htmlFor="email">
            <span>Электронная почта</span>
            <input id="email" type="email" placeholder="Электронная почта" />
          </label>
          <label htmlFor="password">
            <span>Пароль</span>
            <input id="password" type="email" placeholder="Пароль" />
          </label>
          <Button
            inlineStyle={{ width: '300px' }}
            text="Войти"
            // eslint-disable-next-line no-console
            onClick={() => console.log('click')}
            type="submit"
          />
        </form>
      </div>
    </main>
  );
}
