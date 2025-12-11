import { useState, useEffect, forwardRef } from 'react';
import datanormalImg from '../assets/images/Datanormalisation.png';
import automatedImg from '../assets/images/Autotask.png';
import reportImg from '../assets/images/reportbuilder.png';
import guidanceImg from '../assets/images/Automatedcoply.png';

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
  </svg>
);

const FeaturesSection = forwardRef(function FeaturesSection({ isVisible }, ref) {
  const [selectedImage, setSelectedImage] = useState(null);

  const features = [
    { 
      image: datanormalImg,
      title: "Data Normalisation", 
      desc: "Convert unstructured data into clean, standardised information so every report stays accurate, consistent, and accreditation-ready."
    },
    { 
      image: automatedImg,
      title: "Auto Task Allocation", 
      desc: "Tasks auto-generate from gaps and instantly route to the right teams so every criterion keeps moving without detours."
    },
    { 
      image: reportImg,
      title: "Report Builder", 
      desc: "Turn simple prompts into submission-ready reports in seconds with automation that keeps you on the right accreditation route."
    },
    { 
      image: guidanceImg,
      title: "Automated Compliance Guidance", 
      desc: "Auto-generate compliance reports and scorecards from live data so NAAC, NBA, and NIRF requirements stay always on track."
    }
  ];

  // Close modal on ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setSelectedImage(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedImage]);

  return (
    <>
      <section
        id="features"
        ref={ref}
        className={`
          relative px-4 md:px-8 lg:px-[60px] xl:px-[106px] py-[60px] md:py-[80px]
          max-w-[1440px] mx-auto lg:mr-[440px] xl:mr-[520px]
          transition-all duration-1000
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
        `}
        data-node-id="79:3168"
      >
        <div className="mb-[30px] md:mb-[40px]">
          <h2 className="text-[#020617] text-[30px] md:text-[38px] lg:text-[42px] font-semibold tracking-[-0.04em] mb-[10px]">
            Powerful features for your pathway
          </h2>
          <p className="text-[#64748b] text-[15px] md:text-[17px] leading-[24px] max-w-[520px]">
            Everything is designed to give institutions a clearer, faster route to their highest accreditation rank.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-[20px] md:gap-[24px] lg:gap-[28px]">
          {features.map((feature, index) => (
            <article
              key={index}
              className="
                group relative w-full h-full
                rounded-2xl border border-slate-200/70 bg-white/80
                shadow-[0_18px_45px_rgba(15,23,42,0.06)]
                hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)]
                backdrop-blur-sm
                transition-all duration-300 ease-out
                hover:-translate-y-1 hover:scale-[1.01]
              "
            >
              <div className="flex h-full flex-col gap-5 p-5 md:p-6">
                
                {/* Image Container - Now Clickable */}
                <div 
                  className="relative w-full aspect-video overflow-hidden rounded-xl bg-slate-950/5 cursor-zoom-in"
                  onClick={() => setSelectedImage(feature.image)}
                >
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="
                      h-full w-full object-cover
                      transition-transform duration-700 ease-out
                      group-hover:scale-[1.05]
                    "
                  />
                  
                  {/* Overlay Gradient */}
                  <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-t from-slate-950/20 via-transparent to-transparent" />
                  
                  {/* Hover Overlay with Icon - "Click to view" indicator */}
                  <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 transition-colors duration-300 flex items-center justify-center">
                  </div>

                  <div className="pointer-events-none absolute inset-0 rounded-xl border border-white/40" />
                </div>

                {/* Text Content */}
                <div className="flex flex-1 flex-col gap-3 pointer-events-none md:pointer-events-auto">
                  <div className="inline-flex items-center gap-2">
                    <span className="
                      inline-flex h-8 w-8 items-center justify-center
                      rounded-full bg-slate-900/5 text-[13px] font-medium text-slate-900
                      ring-1 ring-slate-900/5
                    ">
                      {index + 1}
                    </span>
                    <h3 className="
                      text-[18px] md:text-[20px] font-semibold tracking-[-0.03em]
                      text-slate-900
                    ">
                      {feature.title}
                    </h3>
                  </div>

                  <p className="text-[14px] md:text-[15px] leading-[22px] md:leading-[24px] text-slate-600">
                    {feature.desc}
                  </p>
                </div>

                 {/* Mild bottom accent on hover */}
                 <div
                   aria-hidden="true"
                   className="
                     pointer-events-none mt-1 h-[2px] w-full rounded-full
                     opacity-0 transition-opacity duration-300 group-hover:opacity-100
                   "
                   style={{
                     background: 'linear-gradient(to right, rgba(29,152,131,0) 0%, rgba(29,152,131,0.4) 50%, rgba(29,152,131,0) 100%)'
                   }}
                 />
               </div>

              {/* Outer focus / hover ring */}
              <div
                aria-hidden="true"
                className="
                  pointer-events-none absolute inset-0 rounded-2xl
                  ring-1 ring-slate-900/5
                  group-hover:ring-[#1D988366] group-hover:ring-offset-0
                  transition-colors duration-300
                "
              />
            </article>
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
        >
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-md transition-opacity" 
            onClick={() => setSelectedImage(null)}
          />

          {/* Close Button */}
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-5 right-5 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-colors border border-white/10"
            aria-label="Close image view"
          >
            <CloseIcon />
          </button>

          {/* Image */}
          <div className="relative z-10 max-w-5xl w-full max-h-full flex items-center justify-center">
             <img 
               src={selectedImage} 
               alt="Full view"
               className="
                 max-w-full max-h-[85vh] object-contain rounded-lg 
                 shadow-[0_20px_60px_rgba(0,0,0,0.5)]
                 animate-in zoom-in-95 duration-300
               "
               onClick={(e) => e.stopPropagation()} // Prevent clicking image from closing
             />
          </div>
        </div>
      )}
    </>
  );
});

export default FeaturesSection;