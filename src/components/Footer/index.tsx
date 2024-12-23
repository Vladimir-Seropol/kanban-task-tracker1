import style from './style.module.css';

export default function Footer() {
  return (
    <footer className={style.footer}>
      <div className="container">
        <div className={style.footerContent}>
          <div className={style.topDevelopers}>
            <strong>Developer:</strong>
            <p>Vladimir Seropol</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
