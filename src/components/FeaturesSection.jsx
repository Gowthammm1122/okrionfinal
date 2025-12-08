import { imgSvg6, imgSvg7, imgSvg8, imgSvg9 } from './assets';

import { forwardRef } from 'react';

const FeaturesSection = forwardRef(function FeaturesSection({ isVisible }, ref) {
  const features = [
    { icon: imgSvg6, title: "Data Normalization", desc: "The system cleans and standardizes all academic, administrative, and departmental data so every report stays error-free and NAAC-ready." },
    { icon: imgSvg7, title: "Auto Task Allocation", desc: "Each metric and requirement is automatically assigned to the right department or user. Everyone knows what to do, when to do it, and what proof to submit." },
    { icon: imgSvg8, title: "AI Sheet", desc: "An AI-driven workspace that analyzes submitted data, checks for gaps, predicts scores, and guides teams toward compliance and improvements." },
    { icon: imgSvg9, title: "Automated NAAC Guidance", desc: "The platform reviews your data and generates actionable steps to improve your score. It supports a clear upgrade path from C to B, B to A, A to A++ with real-time recommendations." }
  ];

  return (
    <section id="features" className={`relative px-4 md:px-8 lg:px-[60px] xl:px-[106px] py-[60px] md:py-[80px] max-w-[1440px] mx-auto lg:mr-[440px] xl:mr-[520px] transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} ref={ref} data-node-id="79:3168">
      <div className="mb-[30px] md:mb-[18px]">
        <h2 className="text-[#0f1729] text-[32px] md:text-[40px] lg:text-[44px] font-bold leading-[38px] md:leading-[44px] lg:leading-[48px] tracking-[-1px] md:tracking-[-1.1px] lg:tracking-[-1.2px] mb-[12px] md:mb-[18px]">
          Powerful Features
        </h2>
        <p className="text-[#65758b] text-[16px] md:text-[18px] font-normal leading-[24px] md:leading-[28px]">
          Everything you need to streamline your accreditation process
        </p>
      </div>
      
      <div className="space-y-[20px] md:space-y-[24px]">
        {features.map((feature, index) => (
          <div key={index} className="bg-white border border-[#e1e1e1] rounded-[8px] p-[24px] md:p-[32px] flex flex-col sm:flex-row gap-[20px] md:gap-[24px] items-start hover:shadow-lg transition-all duration-300 transform hover:scale-[1.01]">
            <div className="bg-[rgba(29,152,131,0.1)] rounded-[16px] w-[48px] h-[48px] md:w-[56px] md:h-[56px] flex items-center justify-center flex-shrink-0">
              <img alt="" className="w-6 h-6 md:w-7 md:h-7" src={feature.icon} />
            </div>
            <div>
              <h3 className="text-[#0f1729] text-[18px] md:text-[20px] font-bold leading-[24px] md:leading-[28px] tracking-[-0.4px] md:tracking-[-0.5px] mb-[12px] md:mb-[16px]">{feature.title}</h3>
              <p className="text-[#65758b] text-[14px] md:text-[16px] font-normal leading-[22px] md:leading-[26px]">
                {feature.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
});

export default FeaturesSection;

