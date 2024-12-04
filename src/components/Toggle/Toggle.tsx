import style from './Toggle.module.css';

export default function Toggle() {
  return (
    <div className={style.toggle}>
      <input type="checkbox" id="toggle" />
      <label htmlFor="toggle" className={style.toggleLabel}></label>
    </div>
  );
}
