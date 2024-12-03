import React, { useEffect, useState } from 'react';
import { inter } from '@/assets/fonts/fonts';
import styles from './TaskType.module.css';

interface TaskTypeProps {
  id: number;
  name?: string;
}

export default function TaskType(props: TaskTypeProps) {
  const { id, name } = props;

  const [visible, setVisible] = useState(true);
  const [taskTypeName, setTaskTypeName] = useState(name);
  const [color, setColor] = useState('#000000');
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');

  useEffect(() => {
    switch (id) {
      case 1:
        setColor('#ff5a4f');
        setBackgroundColor('#fff1f0');
        setTaskTypeName(name || 'Баг');
        break;
      case 2:
        setColor('#3787eb');
        setBackgroundColor('#eef5fc');
        setTaskTypeName(name || 'Задача');
        break;
      case 3:
        setColor('#32c997');
        setBackgroundColor('#f1fbf8');
        setTaskTypeName(name || 'Улучшение');
        break;
      case 4:
        setColor('#ffa826');
        setBackgroundColor('#fff8ec');
        setTaskTypeName(name || 'Новая функциональность');
        break;
      case 5:
        setColor('#6457fa');
        setBackgroundColor('#f0eeff');
        setTaskTypeName(name || 'Эпик');
        break;
      case 6:
        setColor('#ff6e41');
        setBackgroundColor('#fff1ec');
        setTaskTypeName(name || 'Релиз');
        break;
      case 8:
        setColor('#ff6e41');
        setBackgroundColor('#fff1ec');
        setTaskTypeName(name || 'Гарантия');
        break;
      default:
        setVisible(false);
    }
  }, [color, backgroundColor, id, name]);

  return (
    visible && (
      <span
        className={`${styles.taskComponent} ${inter.className}`}
        style={{ backgroundColor, color }}
      >
        {taskTypeName}
      </span>
    )
  );
}

TaskType.defaultProps = {
  name: '',
};
