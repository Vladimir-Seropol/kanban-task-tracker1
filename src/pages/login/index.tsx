import Button from '@/components/Button';
import { useForm } from 'react-hook-form';
import { LoginType } from '@/types/Login/Login';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import * as yup from 'yup';
import { useTokenApiMutation } from '@/redux/services/AuthApi';
import { useAppDispatch } from '@/redux/hooks/hooks';
import { useEffect } from 'react';
import { setToken } from '@/redux/features/auth/authSlice';
import style from './login.module.css';

const schema = yup
  .object()
  .shape({
    email: yup
      .string()
      .email('Нужно заполнить')
      .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, 'Нужно заполнить')
      .required('Электронная почта обязательна'),
    password: yup
      .string()
      .min(8, 'Минимум 8 символов')
      .required('Нужно заполнить'),
  })
  .required();

export default function Login() {
  const dispatch = useAppDispatch();

  const [tokenApi, { data: tokenData, isSuccess: tokenSuccess }] =
    useTokenApiMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginType>({ resolver: yupResolver(schema) });

  const router = useRouter();

  const onSubmit = async (loginData: LoginType) => {
    try {
      const response = await tokenApi(loginData).unwrap();

      if (response.token) {
        dispatch(setToken({ token: response.token }));

        reset();
        await router.push('/projects');
      } else {
        console.error('Токен отсутствует в ответе API');
      }
    } catch (err) {
      console.error('Ошибка при входе:', err);
    }
  };

  useEffect(() => {
    if (tokenSuccess && tokenData?.token) {
      dispatch(setToken({ token: tokenData.token }));
    }
  }, [tokenSuccess, dispatch, tokenData?.token]);

  return (
    <main className={style.login}>
      <div className="container">
        <h2 className={style.title}>Вход</h2>
        <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="email">
            <span>Электронная почта</span>
            <input
              type="email"
              placeholder="Электронная почта"
              {...register('email')}
            />
            {errors.email && (
              <p className={style.errorText}>{errors.email.message}</p>
            )}
          </label>
          <label htmlFor="password">
            <span>Пароль</span>
            <input
              type="password"
              placeholder="Пароль"
              {...register('password')}
            />
            {errors.password && (
              <p className={style.errorText}>{errors.password.message}</p>
            )}
          </label>
          <Button inlineStyle={{ width: '300px' }} text="Войти" type="submit" />
        </form>
      </div>
    </main>
  );
}
