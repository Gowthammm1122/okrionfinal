import { imgSvg2, imgSvg3, imgSvg4, imgSvg5 } from './assets';

import { forwardRef } from 'react';

const WhyUsSection = forwardRef(function WhyUsSection({ isVisible }, ref) {
  const features = [
    { icon: imgSvg2, title: "AI-Driven Accuracy", desc: "Ensures error-free data and boosts scoring potential." },
    { icon: imgSvg3, title: "Accreditation Milestones", desc: "Guides your institution toward excellence with clear checkpoints and proven pathways across NAAC, NBA, and NIRF." },
    { icon: imgSvg4, title: "Customizable & Institution-Friendly", desc: "Fits seamlessly into your unique workflows." },
    { icon: imgSvg5, title: "Faster, Stress-Free Accreditation", desc: "Cuts manual effort and eliminates last-minute pressure." }
  ];

  return (
    <section id="why-us" className={`relative px-4 md:px-8 lg:px-[60px] xl:px-[105px] py-[60px] md:py-[80px] max-w-[1440px] mx-auto lg:mr-[440px] xl:mr-[520px] transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} ref={ref} data-node-id="79:3133">
      <h2 className="text-slate-900 text-[32px] md:text-[44px] lg:text-5xl font-bold leading-[38px] md:leading-[44px] lg:leading-[48px] mb-[12px] md:mb-[16px]">
        Why OKRion?
      </h2>
      <p className="text-slate-500 text-[16px] md:text-lg font-normal leading-[24px] md:leading-7 mb-[30px] md:mb-[40px] max-w-[689px]">
        OKRion becomes your navigation partner showing exact routes, your position on each pathway, and how to reach excellence.
      </p>
      
      <div className="bg-[#1d9883] rounded-lg grid grid-cols-2 sm:grid-cols-2 gap-[1px]" data-name="Background" data-node-id="79:3136">
        {features.map((item, index) => (
          <div 
            key={index} 
            className="group bg-white p-[20px] md:p-[23px] flex flex-col items-center gap-3 transition-all duration-300 ease-out hover:shadow-lg cursor-pointer"
          >
            {/* Icon container */}
            <div className="w-14 h-14 bg-[#1d9883]/10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:bg-[#1d9883]/15">
              <img alt="" className="w-6 h-6 transition-transform duration-300 group-hover:scale-105" src={item.icon} />
            </div>
            
            {/* Content */}
            <div className="flex flex-col items-center gap-3 w-full">
              <h3 className="text-xl font-bold leading-7 text-center w-full transition-colors duration-300 text-slate-900 group-hover:text-[#1d9883]">
                {item.title}
              </h3>
              <p className="text-slate-500 text-base font-normal leading-5 text-center w-full">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
});

export default WhyUsSection;

