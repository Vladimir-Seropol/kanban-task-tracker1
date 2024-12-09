import React, { useEffect, useState } from 'react';
import { inter } from '@/assets/fonts/fonts';
import styles from './TaskComponent.module.css';

interface TaskComponentProps {
  id: number;
  name?: string;
  color?: string;
}

export default function TaskComponent(props: TaskComponentProps) {
  const { id, name, color } = props;

  const [visible, setVisible] = useState(true);
  const [nameTaskComponent, setNameTaskComponent] = useState(name);
  const [backgroundColor, setBackgroundColor] = useState(color);

  useEffect(() => {
    switch (id) {
      case 1:
        setNameTaskComponent(name || 'Дизайн');
        setBackgroundColor('#EA5471');
        break;
      case 2:
        setNameTaskComponent(name || 'Вёрстка');
        setBackgroundColor('#FFA826');
        break;
      case 3:
        setNameTaskComponent(name || 'Разработка');
        setBackgroundColor('#3787EB');
        break;
      case 4:
        setNameTaskComponent(name || 'Тестирование');
        setBackgroundColor('#18BACE');
        break;
      case 5:
        setNameTaskComponent(name || 'Контент');
        setBackgroundColor('#FF5A4F');
        break;
      case 6:
        setNameTaskComponent(name || 'Менеджмент');
        setBackgroundColor('#FF6E41');
        break;
      case 7:
        setNameTaskComponent(name || 'Фронтенд');
        setBackgroundColor('#32C997');
        break;
      case 8:
        setNameTaskComponent(name || 'Администрирование');
        setBackgroundColor('#4761EE');
        break;
      case 9:
        setNameTaskComponent(name || 'Аналитика');
        setBackgroundColor('#4C33FF');
        break;
      case 10:
        setNameTaskComponent(name || 'Копирайт');
        setBackgroundColor('#13B4ED');
        break;
      default:
        setVisible(false);
    }
  }, [id, name, color]);

  return (
    visible && (
      <span
        className={styles.taskComponent}
        style={{ backgroundColor }}
      >
        {nameTaskComponent}
      </span>
    )
  );
}

TaskComponent.defaultProps = {
  name: '',
  color: '',
};
