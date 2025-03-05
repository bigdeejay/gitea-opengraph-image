import localFont from 'next/font/local';

// 로컬 폰트 불러오기
export const wantedSans = localFont({
  src: [
    {
      path: '../public/fonts/WantedSans-1.0.3/webfonts/static/complete/woff2/WantedSans-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/WantedSans-1.0.3/webfonts/static/complete/woff2/WantedSans-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-wanted-sans', // CSS 변수로 활용 가능
  display: 'swap',
});
