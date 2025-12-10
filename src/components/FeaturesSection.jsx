import { imgSvg6, imgSvg7, imgSvg8, imgSvg9 } from './assets';

import { forwardRef } from 'react';

const FeaturesSection = forwardRef(function FeaturesSection({ isVisible }, ref) {
  const features = [
    { 
      icon: imgSvg6, 
      title: "Data Normalisation", 
      desc: "Convert unstructured data into clean, standardised information. Every report stays accurate, consistent, and accreditation-ready on your pathway."
    },
    { 
      icon: imgSvg7, 
      title: "Auto Task Allocation", 
      desc: "Tasks auto-generate from gaps and instantly route to the right teams. Every criterion moves forward without detours or delays."
    },
    { 
      icon: imgSvg8, 
      title: "Report Builder", 
      desc: "Turn simple prompts into complete, submission-ready reports in seconds. Intelligence automation keeps you on the right accreditation route."
    },
    { 
      icon: imgSvg9, 
      title: "Automated Compliance Guidance", 
      desc: "Auto-generate compliance reports and scorecards from live data. NAAC, NBA, and NIRF requirements stay updated in real-time, always on track."
    }
  ];

  return (
    <section id="features" className={`relative px-4 md:px-8 lg:px-[60px] xl:px-[106px] py-[60px] md:py-[80px] max-w-[1440px] mx-auto lg:mr-[440px] xl:mr-[520px] transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} ref={ref} data-node-id="79:3168">
      <div className="mb-[30px] md:mb-[40px]">
        <h2 className="text-[#0f1729] text-[32px] md:text-[40px] lg:text-[44px] font-bold leading-[38px] md:leading-[44px] lg:leading-[48px] tracking-[-1px] md:tracking-[-1.1px] lg:tracking-[-1.2px] mb-[12px] md:mb-[18px]">
          Powerful Features
        </h2>
        <p className="text-[#65758b] text-[16px] md:text-[18px] font-normal leading-[24px] md:leading-[28px]">
          Everything built to chart the clearest pathway toward your highest rank
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px] md:gap-[30px]">
        {features.map((feature, index) => (
          <div key={index} className="bg-[#F8F8F9] relative rounded-[8px] shrink-0 w-full">
            {/* Card Content */}
            <div className="content-stretch flex flex-col gap-[24px] items-start overflow-clip p-[24px] relative rounded-[inherit] w-full">
              {/* Image Section */}
              <div className="h-[200px] md:h-[250px] lg:h-[300px] pointer-events-none relative rounded-[12px] shrink-0 w-full overflow-hidden">
                <div className="absolute inset-0 overflow-hidden rounded-[12px] bg-gradient-to-br from-[rgba(29,152,131,0.1)] to-[rgba(29,152,131,0.05)] flex items-center justify-center">
                  <div className="w-32 h-32 md:w-40 md:h-40 flex items-center justify-center">
                    <img 
                      src={feature.icon} 
                      alt={feature.title}
                      className="w-full h-full object-contain opacity-80"
                    />
                  </div>
                </div>
                <div aria-hidden="true" className="absolute border border-[#C1C1C1] border-solid inset-0 rounded-[12px]" />
              </div>

              {/* Frame with Icon and Text */}
              <div className="content-stretch flex gap-[20px] items-start relative shrink-0 w-full">
                {/* Icon Overlay */}
                <div className="bg-[rgba(29,152,131,0.1)] relative rounded-[16px] shrink-0 size-[48px] md:size-[56px] flex items-center justify-center flex-shrink-0">
                  <div className="w-6 h-6 md:w-7 md:h-7 flex items-center justify-center">
                    <img 
                      src={feature.icon} 
                      alt=""
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>

                {/* Helper Text */}
                <div className="content-stretch flex flex-col gap-[12px] md:gap-[17px] items-start leading-[0] not-italic relative shrink-0 flex-1">
                  <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-auto justify-center relative shrink-0 text-[#0F1729] text-[18px] md:text-[20px] tracking-[-0.4px] md:tracking-[-0.5px] w-full">
                    <p className="leading-[24px] md:leading-[28px]">{feature.title}</p>
                  </div>
                  <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-auto justify-center leading-[22px] md:leading-[26px] relative shrink-0 text-[#65758B] text-[14px] md:text-[16px] w-full">
                    <p className="mb-0">{feature.desc}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Border */}
            <div aria-hidden="true" className="absolute border border-[#E1E1E1] border-solid inset-0 pointer-events-none rounded-[8px]" />
          </div>
        ))}
      </div>
    </section>
  );
});

export default FeaturesSection;

