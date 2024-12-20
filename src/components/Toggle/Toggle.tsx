/* eslint-disable react/self-closing-comp */
/* eslint-disable jsx-a11y/label-has-associated-control */
import style from './Toggle.module.css';

export default function Toggle() {
  return (
    <div className={style.toggle}>
      <input type="checkbox" id="toggle" />
      <label htmlFor="toggle" className={style.toggleLabel}></label>
    </div>
  );
}
