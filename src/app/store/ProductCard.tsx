'use client';

import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  subtitle: string;
  price: string;
  badge?: string;
  image: string;
  tags: string[];
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 flex flex-col">
      <Link href={`/store/${product.id}`} className="block">
        <div className="relative w-full aspect-square bg-gray-50">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover object-top"
          />
          {product.badge && (
            <span className="absolute top-3 left-3 bg-[#E07A5F] text-white text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
              {product.badge}
            </span>
          )}
        </div>
      </Link>
      <div className="p-3 flex flex-col flex-1">
        <Link href={`/store/${product.id}`} className="block mb-1">
          <h3 className="text-sm font-bold text-gray-900 leading-tight">{product.name}</h3>
        </Link>
        <p className="text-xs text-gray-500 mb-2">{product.subtitle}</p>
        <div className="flex flex-wrap gap-1 mb-3">
          {product.tags.map((tag) => (
            <span key={tag} className="text-xs bg-teal-50 text-teal-700 px-2 py-0.5 rounded-full font-medium">
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-auto flex flex-col gap-2">
          <span className="text-lg font-bold text-gray-900">{product.price}</span>
          <button
            onClick={() => onAddToCart(product)}
            className="w-full flex items-center justify-center gap-1.5 bg-[#E07A5F] text-white text-sm font-bold py-2.5 rounded-xl cursor-pointer whitespace-nowrap hover:opacity-90 active:scale-95 transition-all"
          >
            <i className="ri-shopping-cart-line text-base"></i>
            カートへ
          </button>
        </div>
      </div>
    </div>
  );
}
