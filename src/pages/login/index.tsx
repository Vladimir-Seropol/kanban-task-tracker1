import Button from '@/components/Button';
import { inter } from '@/assets/fonts/fonts';
import style from './login.module.css';
import { useForm } from 'react-hook-form';
import { LoginType } from '../../types/Login/Login';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useTokenApiMutation } from '../../redux/services/AuthApi';
import { useAppDispatch } from '@/redux/hooks/hooks';
import { useIsomorphicLayoutEffect } from 'swr/_internal';
import { useEffect } from 'react';
import { setUser } from '@/redux/features/auth/authSlice';

const schema = yup
  .object()
  .shape({
    email: yup
      .string()
      .email('Нужно заполнить')
      .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, 'Нужно заполнить')
      .required(),
    password: yup.string().min(8, '').required('Нужно заполнить'),
  })
  .required();
export default function Login() {
  const dispatch = useAppDispatch();
  console.log(dispatch);
  const [tokenApi, { data: tokenData, isSuccess: tokenSuccess }] =
    useTokenApiMutation();
  console.log(tokenApi);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginType>({ resolver: yupResolver(schema) });
  const onSubmit = (loginData: LoginType) => {
    console.log(`loginData`, loginData);

    console.log(tokenApi(loginData));
    reset();
  };
  useEffect(() => {
    if (tokenSuccess) {
      dispatch(setUser({ token: tokenData.token }));
    }
  }, [tokenSuccess]);

  return (
    <main className={`${style.login} ${inter.className}`}>
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
              <span className={style.errorText}>{errors.email.message}</span>
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
            onClick={() => console.log('click')}
            type="submit"
          />
        </form>
      </div>
    </main>
  );
}
