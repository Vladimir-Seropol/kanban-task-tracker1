import Button from '@/components/Button';
import { inter } from '@/assets/fonts/fonts';
import style from './login.module.css';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Inputs } from '../../types/Login/Login';

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (loginData) => {
    console.log(`loginData`, loginData);
  };

  return (
    <main className={`${style.login} ${inter.className}`}>
      <div className="container">
        <h2 className={style.title}>Вход</h2>
        <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="mail">
            <span>Электронная почта</span>
            <input
              type="email"
              placeholder="Электронная почта"
              {...register('mail', {
                required: true,
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,

                  message: 'Нужно заполнить',
                },
              })}
            />
            {errors.mail && <span>{errors.mail.message}</span>}
          </label>
          <label htmlFor="password">
            <span>Пароль</span>
            <input
              type="password"
              placeholder="Пароль"
              {...register('password', {
                required: true,
                minLength: 8,
              })}
            />
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
