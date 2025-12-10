import { imgSvg10, imgSvg11, imgSvg12, imgSvg13, imgSvg14, imgSvg15, imgSvg16, imgSvg17 } from './assets';
import { forwardRef } from 'react';

const WhoCanUseSection = forwardRef(function WhoCanUseSection({ isVisible }, ref) {
  const items = [
    { icon: imgSvg10, label: 'Universities' },
    { icon: imgSvg11, label: 'Autonomous Colleges' },
    { icon: imgSvg12, label: 'Affiliated Colleges' },
    { icon: imgSvg13, label: 'Medical Colleges' },
    { icon: imgSvg14, label: 'Arts & Science Colleges' },
    { icon: imgSvg15, label: 'Law Colleges' },
    { icon: imgSvg16, label: 'Polytechnic Institutions' },
    { icon: imgSvg17, label: 'Management / Business Schools' },
  ];

  return (
    <section
      id="who-can-use"
      ref={ref}
      className={`
        relative px-4 md:px-8 lg:px-[60px] xl:px-[105px] py-[60px] md:py-[80px]
        max-w-[1440px] mx-auto lg:mr-[440px] xl:mr-[520px]
        transition-all duration-1000
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
      `}
      data-node-id="79:3214"
    >
      <div className="mb-[30px] md:mb-[40px]">
        <h2 className="text-[#020617] text-[30px] md:text-[38px] lg:text-[42px] font-semibold tracking-[-0.04em] mb-[10px]">
          Who Can Use This Platform
        </h2>
        <p className="text-[#64748b] text-[15px] md:text-[17px] leading-[24px] max-w-[520px]">
          Built for every institution navigating NAAC, NBA, and NIRF journeys.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-[14px] md:gap-[18px] lg:gap-[20px]">
        {items.map((item, index) => (
           <div
             key={index}
             className="
               group relative flex h-[120px] md:h-[130px] lg:h-[140px]
               flex-col items-center justify-center gap-[10px] md:gap-[12px]
               rounded-2xl border border-slate-200/70 bg-white/80
               shadow-[0_10px_30px_rgba(15,23,42,0.04)]
               backdrop-blur-sm
               transition-all duration-300 ease-out
               hover:-translate-y-[3px] hover:scale-[1.02]
               hover:shadow-[0_18px_45px_rgba(15,23,42,0.10)]
               hover:border-[#1D988399]
             "
           >
             <div
               className="
                 flex items-center justify-center
                 h-[50px] w-[50px] md:h-[54px] md:w-[54px]
                 rounded-2xl bg-[rgba(29,152,131,0.1)]
                 ring-1 ring-[rgba(29,152,131,0.15)]
                 transition-all duration-300
                 group-hover:bg-[rgba(29,152,131,0.15)]
               "
             >
              <img
                src={item.icon}
                alt={item.label}
                className="
                  h-6 w-6 md:h-7 md:w-7
                  transition-transform duration-300
                  group-hover:scale-[1.05]
                "
              />
            </div>

            <p
              className="
                px-3 text-center text-[12px] md:text-[13px] lg:text-[14px]
                font-medium leading-[18px] md:leading-[20px]
                text-slate-800
              "
            >
              {item.label}
            </p>

             {/* subtle underline accent on hover */}
             <span
               aria-hidden="true"
               className="
                 pointer-events-none mt-1 h-[2px] w-[36px]
                 rounded-full
                 opacity-0 transition-opacity duration-300
                 group-hover:opacity-100
               "
               style={{
                 background: 'linear-gradient(to right, rgba(29,152,131,0) 0%, rgba(29,152,131,0.6) 50%, rgba(29,152,131,0) 100%)'
               }}
             />
          </div>
        ))}
      </div>
    </section>
  );
});

export default WhoCanUseSection;
