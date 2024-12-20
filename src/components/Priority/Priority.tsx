import React, { useEffect, useState } from 'react';
import styles from './Priority.module.css';

interface PriorityProps {
  id: number;
  name?: string;
}

export default function Priority(props: PriorityProps) {
  const { id, name } = props;

  const [visible, setVisible] = useState(true);
  const [namePriority, setNamePriority] = useState(name);
  const [color, setColor] = useState('#000000');
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');

  useEffect(() => {
    switch (id) {
      case 1:
        setColor('#ff5a4f');
        setBackgroundColor('#fff1f0');
        setNamePriority(name || 'Высокий');
        break;
      case 2:
        setColor('#ffa826');
        setBackgroundColor('#fff8ec');
        setNamePriority(name || 'Средний');
        break;
      case 3:
        setColor('#32c997');
        setBackgroundColor('#f1fbf8');
        setNamePriority(name || 'Низкий');
        break;
      default:
        setVisible(false);
    }
  }, [color, backgroundColor, id, name]);

  return (
    visible && (
      <div className={styles.priority} style={{ color, backgroundColor }}>
        <span>{namePriority}</span>
      </div>
    )
  );
}

Priority.defaultProps = {
  name: '',
};
