import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';
// App router includes @vercel/og.
// No need to install it.
export const runtime = "edge"; // Use Edge runtime for performance

// 폰트 파일 URL
const FONT_URL = `https://github.com/orioncactus/pretendard/raw/refs/heads/main/packages/pretendard-gov/dist/public/static/alternative/PretendardGOV-Bold.ttf`;

// 폰트 불러오기 함수
const fetchFont = async () => {
  const res = await fetch(FONT_URL);
  if (!res.ok) {
    throw new Error('Failed to fetch font');
  }
  return await res.arrayBuffer();
};
 
export async function GET(request: NextRequest) {
  const fontData = await fetchFont();

  const { searchParams } = new URL(request.url);
  
  const avatarUrl = searchParams.get('avatarUrl');
  const author = searchParams.get('author') || "익명의 사용자";
  const description = searchParams.get('description') || "레포지토리 설명이 없습니다.";
  const title = searchParams.get('title')

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'linear-gradient(145deg, #f2f2f7, #e5e5ea)',
          color: '#1d1d1f',
          padding: '50px',
          fontFamily: 'Wanted Sans',
          borderRadius: '20px',
          overflow: 'hidden',
        }}
      >
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          width: '100%',
          marginBottom: '40px',
        }}>
          {avatarUrl && (
            <img
              src={avatarUrl}
              width="80"
              height="80"
              style={{ 
                borderRadius: '50%', 
                marginRight: '20px', 
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                border: '3px solid #ffffff'
              }}
            />
          )}
          {author && (
            <h1 style={{ 
              fontSize: '32px', 
              fontWeight: 'bold', 
              color: '#1d1d1f', 
              margin: 0,
              letterSpacing: '-0.5px'
            }}>
              {author}
            </h1>
          )}
        </div>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
          width: '100%',
        }}>
          <p style={{ 
            fontSize: '72px', 
            fontWeight: 'bold',
            textAlign: 'center', 
            color: '#1d1d1f', 
            margin: '0 0 20px 0',
            letterSpacing: '-1px',
            maxWidth: '90%',
            lineHeight: 1.2
          }}>
            {title}
          </p>

          {description && (
            <p style={{ 
              fontSize: '36px', 
              textAlign: 'center', 
              color: '#86868b', 
              maxWidth: '80%',
              lineHeight: 1.4,
              margin: 0
            }}>
              {description}
            </p>
          )}
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          marginTop: '40px',
        }}>
          <div style={{
            padding: '10px 20px',
            background: 'rgba(0, 0, 0, 0.05)',
            borderRadius: '30px',
            fontSize: '24px',
            color: '#86868b',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            {process.env.FOOTER_NAME}
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Pretendard',
          data: fontData,
          weight: 700,
          style: "normal",
        },
      ],
    }
  );
}