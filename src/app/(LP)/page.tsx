
import React from 'react';
import LPHeader from './LPHeader';
import HeroSection from './HeroSection';
import FeaturesSection from './FeaturesSection';
import HowItWorksSection from './HowItWorksSection';
import ProductsSection from './ProductsSection';
import CTASection from './CTASection';
import LPFooter from './LPFooter';

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <LPHeader />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <ProductsSection />
      <CTASection />
      <LPFooter />
    </div>
  );
}
