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
            <div className={style.board__right_header} />
            <div className={style.board__right_title}>
              <div className={style.board__right_title_checkbox}>
                <h2>Demo Project</h2>
                <input type="checkbox" />
              </div>

              <Button
                svg={
                  <img
                    src="/icon_create.svg"
                    alt="icon_create"
                    style={{ verticalAlign: 'middle', marginRight: '8px' }}
                  />
                }
                text="Добавить задачу"
                type="button"
                // eslint-disable-next-line no-console
                onClick={() => console.log('click')}
              />
            </div>
            <div className={style.board__right_selection}>
              <div className={style.board__right_selection_item}>
                <p>Название задачи</p>
                <input type="text" placeholder="Название задачи" />
              </div>
              <div className={style.board__right_selection_item}>
                <p>Выбрать пользователей</p>
                <select name="" id="">
                  Пользователь
                </select>
              </div>
              <div className={style.board__right_selection_item}>
                <p>Выбрать тип</p>
                <select name="" id="">
                  Выбрать тип
                </select>
              </div>
              <div className={style.board__right_selection_item}>
                <p>Выбрать компонент</p>
                <select name="" id="">
                  Выбрать компонент
                </select>
              </div>
            </div>
            <div className={style.board__right_date}>
              <input
                className={style.doard__right_date_input}
                type="date"
                id="startDate"
                name="startDate"
              />
              <input
                className={style.doard__right_date_input}
                type="date"
                id="endDate"
                name="endDate"
              />
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
