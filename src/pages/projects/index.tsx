/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import Button from '../../components/Button';
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
                <p>Название проекта</p>
                <input type="text" placeholder="Введите название проекта" />
              </div>
              <div className={style.board__right_selection_item}>
                <p>Номер задачи</p>
                <input type="text" placeholder="Введите номер задачи" />
              </div>
            </div>
            <div className={style.board__right_selection_checkbox}>
              <input type="checkbox" />
              <label htmlFor="checkbox">Показать архивные проекты</label>
            </div>

            <div className={style.board__right_tasks}>
              <div className={style.board__right_tasks_item}>Новые</div>
              <div className={style.board__right_tasks_item}>В работе</div>
              <div className={style.board__right_tasks_item}>Выполнено</div>
              <div className={style.board__right_tasks_item}>В ревью</div>
              <div className={style.board__right_tasks_item}>
                Готовы к тестированию
              </div>
              <div className={style.board__right_tasks_item}>
                В тестировании
              </div>
              <div className={style.board__right_tasks_item}>Решены</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
