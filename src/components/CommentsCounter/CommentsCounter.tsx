import { useEffect, useState } from 'react';
import { inter } from '@/assets/fonts/fonts';
import style from './CommentsCounter.module.css';

interface CommentsCounterProps {
  count?: number;
}

export default function CommentsCounter(props: CommentsCounterProps) {
  const { count } = props;

  const [isNewMessage, setIsNewMessage] = useState(false);

  useEffect(() => {
    if (count && count > 0) {
      setIsNewMessage(true);
    }
  }, [count]);

  return (
    <div className={style.commentsCounter}>
      <div className={`${isNewMessage && style.newMessage}`}>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.2518 14.4001C5.58119 14.4001 5.8239 14.2302 6.22263 13.8602L8.20476 12.0282H11.6836C13.423 12.0282 14.3996 10.9726 14.3996 9.1709V4.45735C14.3996 2.65564 13.423 1.6001 11.6836 1.6001H4.31564C2.582 1.6001 1.59961 2.65564 1.59961 4.45735V9.1709C1.59961 10.9787 2.6109 12.0282 4.27519 12.0282H4.51212V13.5144C4.51212 14.0543 4.78372 14.4001 5.2518 14.4001ZM5.54074 13.0412V11.3123C5.54074 10.9544 5.39049 10.8149 5.06688 10.8149H4.35609C3.26968 10.8149 2.74959 10.2386 2.74959 9.13451V4.49375C2.74959 3.38967 3.26968 2.81337 4.35609 2.81337H11.6489C12.7295 2.81337 13.2496 3.38967 13.2496 4.49375V9.13451C13.2496 10.2386 12.7295 10.8149 11.6489 10.8149H8.14119C7.78868 10.8149 7.61532 10.8755 7.37261 11.1425L5.54074 13.0412ZM5.21713 7.72105C5.69099 7.72105 6.07239 7.3146 6.07239 6.81109C6.07239 6.31365 5.69099 5.90721 5.21713 5.90721C4.73749 5.90721 4.35031 6.31365 4.35031 6.81109C4.35031 7.3146 4.73749 7.72105 5.21713 7.72105ZM8.0025 7.72105C8.47636 7.72105 8.86354 7.3146 8.86354 6.81109C8.86354 6.31365 8.47636 5.90721 8.0025 5.90721C7.52864 5.90721 7.14146 6.31365 7.14146 6.81109C7.14146 7.3146 7.52864 7.72105 8.0025 7.72105ZM10.7936 7.72105C11.2675 7.72105 11.6547 7.3146 11.6547 6.81109C11.6547 6.31365 11.2675 5.90721 10.7936 5.90721C10.3198 5.90721 9.93261 6.31365 9.93261 6.81109C9.93261 7.3146 10.3198 7.72105 10.7936 7.72105Z"
            fill="#D2D2D2"
          />
        </svg>
      </div>
      {count && count > 0 && (
        <span className={style.commentsCounter}>{count}</span>
      )}
    </div>
  );
}

CommentsCounter.defaultProps = {
  count: 0,
};
