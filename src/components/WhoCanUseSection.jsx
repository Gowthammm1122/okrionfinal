import { imgSvg10, imgSvg11, imgSvg12, imgSvg13, imgSvg14, imgSvg15, imgSvg16, imgSvg17 } from './assets';

import { forwardRef } from 'react';

const WhoCanUseSection = forwardRef(function WhoCanUseSection({ isVisible }, ref) {
  const items = [
    { icon: imgSvg10, label: "Universities" },
    { icon: imgSvg11, label: "Autonomous Colleges" },
    { icon: imgSvg12, label: "Management Institutions" },
    { icon: imgSvg13, label: "IQAC Teams" },
    { icon: imgSvg14, label: "Engineering Institutions" },
    { icon: imgSvg15, label: "Arts & Science Colleges" },
    { icon: imgSvg16, label: "HODs and Faculty" },
    { icon: imgSvg17, label: "Students, Office Staff & Administrators" }
  ];

  return (
    <section id="who-can-use" className={`relative px-4 md:px-8 lg:px-[60px] xl:px-[105px] py-[60px] md:py-[80px] max-w-[1440px] mx-auto lg:mr-[440px] xl:mr-[520px] transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} ref={ref} data-node-id="79:3214">
      <h2 className="text-[#151515] text-[32px] md:text-[40px] lg:text-[48px] font-bold leading-[38px] md:leading-[44px] lg:leading-[48px] tracking-[-1px] md:tracking-[-1.1px] lg:tracking-[-1.2px] mb-[12px] md:mb-[16px]">
        Who Can Use This Platform
      </h2>
      <p className="text-[#151515] text-[16px] md:text-[18px] font-normal leading-[24px] md:leading-[28px] mb-[30px] md:mb-[40px]">
        Designed for everyone involved in the accreditation process
      </p>
      
      <div className="grid grid-cols-2 sm:grid-cols-2 gap-[20px] md:gap-[24px]">
        {items.map((item, index) => (
          <div key={index} className="bg-white border border-[#e1e1e1] rounded-[8px] h-[130px] md:h-[150px] flex flex-col items-center justify-center gap-[12px] md:gap-[16px] hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]">
            <div className="bg-[rgba(29,152,131,0.1)] rounded-[16px] w-[56px] h-[56px] md:w-[64px] md:h-[64px] flex items-center justify-center">
              <img alt="" className="w-7 h-7 md:w-8 md:h-8" src={item.icon} />
            </div>
            <p className="text-[#0f1729] text-[13px] md:text-[14px] font-normal leading-[18px] md:leading-[20px] text-center px-2">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
});

export default WhoCanUseSection;

