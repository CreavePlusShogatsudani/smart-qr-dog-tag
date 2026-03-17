'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function LPHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-500" style={{backgroundColor:'rgba(255,250,247,0.97)', backdropFilter:'blur(12px)', borderBottom:'1px solid #f5e6df'}}>
      <div className="w-full px-10 md:px-16 lg:px-20 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{backgroundColor:'#f9d5c8'}}>
            <i className="ri-heart-line text-sm" style={{color:'#d4735a'}}></i>
          </div>
          <span className="text-base font-bold tracking-widest" style={{color:'#5a3a2e'}}>LIEN</span>
        </div>
        <nav className="hidden md:flex items-center gap-10">
          <a href="#features" className="text-xs tracking-widest font-medium transition-opacity cursor-pointer hover:opacity-60" style={{color:'#8a6a5e'}}>特徴</a>
          <a href="#howitworks" className="text-xs tracking-widest font-medium transition-opacity cursor-pointer hover:opacity-60" style={{color:'#8a6a5e'}}>使い方</a>
          <a href="#products" className="text-xs tracking-widest font-medium transition-opacity cursor-pointer hover:opacity-60" style={{color:'#8a6a5e'}}>商品</a>
        </nav>
        <a className="text-xs tracking-widest font-semibold px-6 py-2.5 rounded-full whitespace-nowrap transition-all cursor-pointer text-white shadow-sm hover:shadow-md hover:opacity-90" style={{backgroundColor:'#e8836a'}} href="/login">無料ではじめる</a>
      </div>
    </header>
  );
}
