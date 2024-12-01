/* eslint-disable react/require-default-props */
/* eslint-disable prettier/prettier */
/* eslint-disable @next/next/no-img-element */
import style from './style.module.css';

interface CardInternalProps {
  width?: string;  // Пропс для ширины (например, '200px' или '50%')
  height?: string; // Пропс для высоты (например, '300px' или 'auto')
}

export default function CardInternal({ width = '', height = '' }: CardInternalProps) {
  return (
    <div className={style.board__right_projects} style={{ width, height }}>
      <div className={style.board__right_selected_projects}>
        <img
          src="/icon_work.svg"
          alt="icon"
          style={{
            marginBottom: '12px',
          }}
        />
        <div className={style.board__right_selected_project_item}>
          DS Внутренние проекты
        </div>
        <p>12 сотрудников</p>
      </div>
    </div>
  );
}
