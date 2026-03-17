'use client';

import { useState } from 'react';

export default function ProductHero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const images = [
    'https://readdy.ai/api/search-image?query=A%20premium%20brass%20pet%20ID%20tag%20with%20elegant%20engraving%20attached%20to%20a%20soft%20brown%20leather%20collar%2C%20photographed%20on%20a%20clean%20white%20marble%20surface%20with%20soft%20natural%20lighting%20from%20the%20side%2C%20minimalist%20composition%20with%20subtle%20shadows%2C%20professional%20product%20photography%20style%2C%20shallow%20depth%20of%20field%2C%20warm%20tones%2C%20high-end%20boutique%20aesthetic&width=800&height=800&seq=pawtag-product-hero-1&orientation=squarish',
    'https://readdy.ai/api/search-image?query=Close-up%20detail%20shot%20of%20a%20brass%20pet%20ID%20tag%20showing%20fine%20engraving%20and%20QR%20code%20pattern%2C%20placed%20on%20white%20linen%20fabric%20with%20soft%20diffused%20lighting%2C%20macro%20photography%20style%2C%20elegant%20and%20refined%2C%20warm%20golden%20tones%2C%20luxury%20product%20detail%20shot&width=800&height=800&seq=pawtag-product-hero-2&orientation=squarish',
    'https://readdy.ai/api/search-image?query=A%20stylish%20acrylic%20pet%20ID%20tag%20in%20translucent%20amber%20color%20attached%20to%20a%20modern%20nylon%20collar%2C%20photographed%20against%20pure%20white%20background%20with%20studio%20lighting%2C%20clean%20and%20minimal%20composition%2C%20professional%20e-commerce%20product%20photo%2C%20sharp%20focus%2C%20contemporary%20design%20aesthetic&width=800&height=800&seq=pawtag-product-hero-3&orientation=squarish',
  ];

  return (
    <div className="relative w-full aspect-square bg-gray-50">
      <div className="relative w-full h-full overflow-hidden">
        {images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`Product view ${idx + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              idx === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
              idx === currentSlide ? 'bg-white w-6' : 'bg-white/50'
            }`}
            aria-label={`Slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}