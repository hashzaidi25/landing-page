"use client";

import HeroSection from '@/components/HeroSection';
import FeatureSection from '@/components/FeatureSection';
import CTASection from '@/components/CTASection';
import TestimonialSection from '@/components/TestimonialSection';
import FAQSection from '@/components/FAQSection';
import FooterSection from '@/components/FooterSection';
import ComparisonTable from '@/components/ComparisonTable';
import IsThisForMeSection from '@/components/IsThisForMeSection';
import SocialMediaHighlight from '@/components/SocialMediaHighlight';

export default function Home() {
  return (
    <div className="relative min-h-screen w-full bg-white overflow-hidden">
      <div className="relative z-10">
        <HeroSection />
        <SocialMediaHighlight instagramFollowers={50000} youtubeSubscribers={10000} />
        <FeatureSection />
        <CTASection />
        <ComparisonTable />
        <IsThisForMeSection />
        <TestimonialSection />
        <FAQSection />
        <FooterSection />
      </div>
    </div>
  );
}
