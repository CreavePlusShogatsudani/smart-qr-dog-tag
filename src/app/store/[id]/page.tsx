import ProductDetailClient from './ProductDetailClient';

export async function generateStaticParams() {
  return [
    { id: 'premium-tag' },
    { id: 'qr-harness' },
    { id: 'qr-collar' },
    { id: 'silicone-tag' },
  ];
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ProductDetailClient productId={id} />;
}
