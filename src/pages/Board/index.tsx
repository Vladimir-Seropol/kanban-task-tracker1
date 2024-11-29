/* eslint-disable @next/next/no-img-element */
import Button from '@/components/Button';
import style from './style.module.css';

export default function Board() {
  return (
    <div className="container">
      <main className="main">
        <div className={style.board}>
          <div className={style.board__left}>
            <div className={style.board__left_header}>
              <img src="/logo_board.png" alt="logo_board" />
              <img src="icon_board1.svg" alt="icon_board" />
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
              />
            </div>
            <div className={style.board__left_project}>
              <img src="icon_board3.svg" alt="icon_board" />
              <h4 style={{ color: '#fff' }}>Проекты</h4>
            </div>
          </div>
          <div className={style.board__right}>
            <div className={style.board__right_header} />
            <div className={style.board__right_title}>
              <div className={style.board__right_title_checkbox}>
                <h2>Demo Project</h2>
                <input type="checkbox" />
              </div>

              <Button text="Добавить задачу" type="button" />
            </div>
            <div className={style.board__right_selection}>
              <div>
                <p>Название задачи</p>
                <input type="text" />
              </div>
              <div>
                <p>Выбрать пользователей</p>
                <select name="" id="">
                  Пользователь
                </select>
              </div>
              <div>
                <p>Выбрать тип</p>
                <select name="" id="">
                  Выбрать тип
                </select>
              </div>
              <div>
                <p>Выбрать компонент</p>
                <select name="" id="">
                  Выбрать компонент
                </select>
              </div>
            </div>
            <div className={style.board__right_tasks} />
          </div>
        </div>
      </main>
    </div>
  );
}
