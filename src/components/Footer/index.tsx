import style from './style.module.css';

export default function Footer() {
  return (
    <footer className={style.footer}>
      <div className="container">
        <div className={style.footerContent}>
          <div className={style.topDevelopers}>
            <strong>Developers:</strong>
            <p>Дмитрий Варенов</p>
            <p>Vladimir S</p>
            <p>Aleksandr</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
