import localFont from 'next/font/local';

export const inter = localFont({
  src: [
    {
      path: './Inter-Regular.ttf',
      weight: '400',
    },
    {
      path: './Inter-Medium.ttf',
      weight: '500',
    },
    {
      path: './Inter-SemiBold.ttf',
      weight: '600',
    },
  ],
  variable: '--font-inter',
});