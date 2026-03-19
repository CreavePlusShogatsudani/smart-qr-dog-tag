import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const data = searchParams.get('data');
  const tagHash = searchParams.get('tagHash');

  if (!data || !tagHash) {
    return new NextResponse('Missing parameters', { status: 400 });
  }

  // 外部APIを使用してQRコード画像を生成
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(data)}&margin=20`;

  try {
    const response = await fetch(qrUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch QR code from external API');
    }

    const imageBuffer = await response.arrayBuffer();

    // 画像を強制的にダウンロード（添付ファイル）として返す
    return new NextResponse(imageBuffer, {
      headers: {
        'Content-Type': 'image/png',
        'Content-Disposition': `attachment; filename="LIEN_QR_TAG_${tagHash.slice(0, 8)}.png"`,
        // 念のためキャッシュさせない
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      },
    });
  } catch (error) {
    console.error('QR download proxy error:', error);
    return new NextResponse('Error generating or downloading QR code', { status: 500 });
  }
}
