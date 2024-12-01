/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import Link from 'next/link';
// eslint-disable-next-line import/order
import Button from '../../components/Button';
// eslint-disable-next-line import/order
import style from './style.module.css';
// eslint-disable-next-line import/order
import TextInput from '@/components/Inputs/TextInput/TextInput';
import CardInternal from '@/components/ProjectsCard/CardInternal';
import CardDemo from '@/components/ProjectsCard/CardDemo';

export default function Board() {
  const [isClicked, setIsClicked] = useState(false); // Состояние для отслеживания клика

  const handleClick = () => {
    setIsClicked(!isClicked); // Меняем состояние при клике
  };

  return (
    <main className="main">
      <div className={style.board}>
        <div
          className={`${style.board__left} ${isClicked ? style.is_clicked : ''}`}
        >
          <div className={style.board__left_header}>
            <img
              className={style.board__left_header_logo}
              src="/logo_board.png"
              alt="logo_board"
            />
            <img
              className={style.board__left_header_icon}
              src="/icon_board1.svg"
              alt="icon_board"
              onClick={handleClick}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleClick();
                }
              }}
              // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
              role="button"
              tabIndex={0}
              style={{ cursor: 'pointer' }}
            />
          </div>
          <div className={style.board__left_user}>
            <h2 style={{ color: '#fff' }}>User</h2>
            <Button
              text="Выйти"
              inlineStyle={{
                width: '100%',
                height: '24px',
                padding: '4.5px',
                background: '#2D2D2D',
                fontSize: '12px',
                lineHeight: '14.52px',
                color: '#787878',
              }}
              type="button"
              // eslint-disable-next-line no-console
              onClick={() => console.log('click')}
            />
          </div>
          <div className={style.board__left_project}>
            <img src="icon_board3.svg" alt="icon_board" />
            <h4 style={{ color: '#fff' }}>Проекты</h4>
          </div>
        </div>
        <div className={style.board__right}>
          <div className={style.board__right_header}>
            <nav>
              <Link href="/">
                <span>Главная /</span>{' '}
              </Link>
              <span>Проекты</span>
            </nav>
          </div>
          <div className={style.board__right_title}>
            <div className={style.board__right_title_checkbox}>
              <h2>Проекты</h2>
            </div>
          </div>
          <div className={style.board__right_selection}>
            <div className={style.board__right_selection_item}>
              <TextInput
                // eslint-disable-next-line react/jsx-curly-brace-presence
                label={'Название проекта'}
                placeholder="Введите название проекта"
                // eslint-disable-next-line react/jsx-curly-brace-presence
                value={''}
                // eslint-disable-next-line react/jsx-no-bind, func-names, @typescript-eslint/no-unused-vars
                onChange={function (_value: string): void {
                  throw new Error('Function not implemented.');
                }}
              />
            </div>
            <div className={style.board__right_selection_item}>
              <TextInput
                // eslint-disable-next-line react/jsx-curly-brace-presence
                label={'Номер задачи'}
                placeholder="Введите номер задачи"
                // eslint-disable-next-line react/jsx-curly-brace-presence
                value={''}
                // eslint-disable-next-line react/jsx-no-bind, func-names, @typescript-eslint/no-unused-vars
                onChange={function (_value: string): void {
                  throw new Error('Function not implemented.');
                }}
              />
            </div>
          </div>
          <div className={style.board__right_selection_checkbox}>
            <input type="checkbox" id="checkbox" />
            <label htmlFor="checkbox">Показать архивные проекты</label>
          </div>

          <div className={style.board__right_projects}>
            <h5 style={{ marginBottom: '16px' }}>Избранные проекты</h5>
            <div className={style.board__right_selected_projects}>
              <CardInternal />
              <CardDemo />
            </div>

            <div className={style.board__right_internal_projects}>
              {Array.from({ length: 16 }).map((_, index) => (
                <div
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                  className={style.board__right_selected_internal_item}
                >
                  <CardInternal />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
