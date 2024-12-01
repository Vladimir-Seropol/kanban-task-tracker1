/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/order */
import Button from '@/components/Button';
import { inter } from '@/assets/fonts/fonts';
import style from './login.module.css';
import { useForm } from 'react-hook-form';
import { LoginType } from '../../types/Login/Login';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router'; // Импортируем useRouter
import * as yup from 'yup';

const schema = yup
  .object()
  .shape({
    mail: yup
      .string()
      .email('Нужно заполнить')
      .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, 'Нужно заполнить')
      .required('Электронная почта обязательна'),
    password: yup.string().min(8, '').required('Нужно заполнить'),
  })
  .required();
export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginType>({ resolver: yupResolver(schema) });

  // Пока оставим просто преход к странице проектов при нажатии на кнопку
  const router = useRouter(); // Инициализация хука

  const onSubmit = (loginData: LoginType) => {
    // eslint-disable-next-line no-console
    console.log('Данные для входа:', loginData);
    reset();
    // Переход на страницу /login при клике на кнопку
    router.push('/projects');
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
              {...register('mail')}
            />
            {errors.mail && (
              <span className={style.errorText}>{errors.mail.message}</span>
            )}
          </label>
          <label htmlFor="password">
            <span>Пароль</span>
            <input
              type="password"
              placeholder="Пароль"
              {...register('password')}
            />
            {errors.password && <span>{errors.password.message}</span>}
          </label>
          <Button
            inlineStyle={{ width: '300px' }}
            text="Войти"
            // onClick={onSubmit} // Вешаем обработчик клика
            type="submit"
          />
        </form>
      </div>
    </main>
  );
}
