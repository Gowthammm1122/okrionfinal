import { imgSvg } from './assets';

import { forwardRef } from 'react';

const HeroSection = forwardRef(function HeroSection({ isVisible }, ref) {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className={`relative min-h-[600px] md:h-[840px] transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} ref={ref} data-name="Section" data-node-id="79:3106">
      {/* Full-width gradient background */}
      <div className="absolute inset-0 w-full" style={{ background: 'linear-gradient(to top, rgba(29,152,131,0.12) 0%, rgba(29,152,131,0.08) 50%, transparent 100%)' }}></div>
      
      {/* Content container */}
      <div className="relative pt-[90px] md:pt-[100px] px-4 md:px-8 lg:px-[60px] xl:px-[108px] max-w-[1440px] mx-auto lg:mr-[440px] xl:mr-[520px]">
      <div className="pt-[40px] md:pt-[76px]">
        <div className="max-w-[705px] w-full">
          <div className="bg-[rgba(29,152,131,0.1)] inline-flex items-center gap-[6px] px-[12px] md:px-[16px] py-[6px] md:py-[8px] rounded-[9999px] mb-[20px] md:mb-[24px] animate-fade-in" data-name="Overlay" data-node-id="79:3107">
            <div className="w-3 h-3 md:w-4 md:h-4" data-name="SVG" data-node-id="79:3109">
              <img alt="" className="block max-w-none w-full h-full" src={imgSvg} />
            </div>
            <span className="text-[#1d9883] text-[12px] sm:text-[13px] md:text-[14px] lg:text-[14px] font-normal leading-[18px] sm:leading-[19px] md:leading-[20px] lg:leading-[20px]">AI-Powered Accreditation Tool</span>
          </div>
          
          <h1 className="text-[32px] sm:text-[38px] md:text-[44px] lg:text-[50px] xl:text-[54px] font-bold leading-[38px] sm:leading-[44px] md:leading-[50px] lg:leading-[56px] xl:leading-[60px] tracking-[-1px] sm:tracking-[-1.2px] md:tracking-[-1.5px] lg:tracking-[-1.6px] xl:tracking-[-1.8px] mb-[20px] md:mb-[24px] animate-slide-up" data-node-id="79:3116">
            <span className="text-[#0f1729]">Turn </span>
            <span className="bg-clip-text bg-gradient-to-r from-[#1d9883] to-[#098a74] text-transparent">NAAC, NBA, and NIRF</span>
            <br className="block" />
            <span className="text-[#0f1729]">Into an Auto-Guided Journey.</span>
          </h1>
          
          <p className="text-[#65758b] text-[16px] sm:text-[17px] md:text-[18px] lg:text-[19px] xl:text-[20px] font-normal leading-[24px] sm:leading-[25px] md:leading-[26px] lg:leading-[27px] xl:leading-[28px] mb-[30px] md:mb-[40px] max-w-[682px] animate-fade-in-delay" data-node-id="79:3117">
            OKRion automatically charts your accreditation roadmap. Normalise data, auto-allocate tasks, predict scores, generate compliance reports, and navigate institutions toward excellence across NAAC, NBA, and NIRF with AI insights.
          </p>
          
          <div className="mb-[30px] md:mb-[40px]" data-node-id="79:3118">
              <button 
                onClick={() => scrollToSection('features')}
                className="bg-[rgba(29,152,131,1)] h-[50px] md:h-[56px] px-6 rounded-[12px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] text-white text-[14px] sm:text-[15px] md:text-[16px] lg:text-[16px] font-bold leading-[20px] sm:leading-[22px] md:leading-[24px] lg:leading-[24px] hover:bg-[#098a74] transition-all duration-300 transform hover:scale-105 active:scale-95" 
                data-name="Button" 
                data-node-id="79:3124"
              >
                Explore Features
              </button>
          </div>
          
          <div className="text-left text-[#65758b] text-[14px] sm:text-[15px] md:text-[16px] lg:text-[16px] font-bold leading-[18px] sm:leading-[19px] md:leading-[20px] lg:leading-[20px] mb-[12px] md:mb-[16px] px-4 md:px-0" data-node-id="79:3126">
            Key Performance Gainers:
          </div>
          
          <div className="flex flex-row items-center justify-start gap-[8px] sm:gap-[12px] md:gap-[14px] lg:gap-[20px] text-[rgba(0,0,0,0.6)] text-[12px] sm:text-[14px] md:text-[16px] lg:text-[16px] font-bold leading-[22px] sm:leading-[24px] md:leading-[26px] lg:leading-[28px] px-4 md:px-0 w-full pt-2" data-node-id="79:3127">
            <span className="whitespace-nowrap">90% Workflow Automation</span>
            <div className="bg-[#0f1729] h-[24px] w-px flex-shrink-0" data-name="Vertical Divider" data-node-id="79:3129" />
            <span className="whitespace-nowrap">95% Better Team Coordination</span>
            <div className="bg-[#0f1729] h-[24px] w-px flex-shrink-0" data-name="Vertical Divider" data-node-id="79:3131" />
            <span className="whitespace-nowrap">95% Quality Excellence</span>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
});

export default HeroSection;

