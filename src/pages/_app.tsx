import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { inter } from '@/assets/fonts/fonts';
import { store } from '@/redux/store';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <div className={inter.className}>
        <Component {...pageProps} />
      </div>
    </Provider>
  );
}
