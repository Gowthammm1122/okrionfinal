import { imgLine1, hiwDataCollection, hiwTaskAllocation, hiwApprovals, hiwScoreTracking } from './assets';
import { forwardRef, useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HowItWorksSection = forwardRef(function HowItWorksSection({ isVisible }, ref) {
  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = useRef([]);
  const numberRefs = useRef([]);
  const cardRefs = useRef([]);
  const iconRefs = useRef([]);
  const lineRef = useRef(null);
  const lineContainerRef = useRef(null);

  const steps = [
    { num: 1, icon: hiwDataCollection, title: "Data Collection", desc: "Gather all required metrics, evidence, and documents in one unified, automated workflow." },
    { num: 2, icon: hiwTaskAllocation, title: "Task Allocation", desc: "Assign tasks instantly to the right departments or users with intelligent auto-routing." },
    { num: 3, icon: hiwApprovals, title: "Approvals", desc: "Streamline validations with a clear, role-based approval flow for every submission." },
    { num: 4, icon: hiwScoreTracking, title: "Score & Grade Tracking", desc: "Monitor real-time scores, gaps, and predicted grades to stay on track for top performance." }
  ];

  useEffect(() => {
    const triggers = [];

    // Initialize line - start with scaleY 0
    if (lineRef.current) {
      gsap.set(lineRef.current, { scaleY: 0, transformOrigin: "top" });
    }

    stepRefs.current.forEach((stepRef, index) => {
      if (!stepRef) return;

      // Set initial state
      gsap.set(stepRef, { opacity: 1 });
      if (numberRefs.current[index]) {
        gsap.set(numberRefs.current[index], { backgroundColor: "#eff8f6", scale: 1 });
      }
      if (cardRefs.current[index]) {
        gsap.set(cardRefs.current[index], { borderWidth: "1px", boxShadow: "none", y: 0 });
      }
      if (iconRefs.current[index]) {
        gsap.set(iconRefs.current[index], { scale: 1 });
      }

      // Create ScrollTrigger for each step
      const trigger = ScrollTrigger.create({
        trigger: stepRef,
        start: "top 75%",
        end: "bottom 25%",
        onEnter: () => {
          setActiveStep(index);
          // Animate line progression - slow animation
          if (lineRef.current) {
            const progress = (index + 1) / steps.length;
            gsap.to(lineRef.current, {
              scaleY: progress,
              duration: 1.5,
              ease: "power1.inOut"
            });
          }
          // Animate number circle - minimal, no rotation
          if (numberRefs.current[index]) {
            gsap.to(numberRefs.current[index], {
              backgroundColor: "#1d9883",
              scale: 1.05,
              duration: 0.4,
              ease: "power2.out"
            });
            const span = numberRefs.current[index].querySelector('span');
            if (span) {
              gsap.to(span, {
                color: "#ffffff",
                duration: 0.3
              });
            }
          }
          // Animate card - subtle lift
          if (cardRefs.current[index]) {
            gsap.to(cardRefs.current[index], {
              borderWidth: "2px",
              boxShadow: "0 8px 24px -8px rgba(29, 152, 131, 0.25)",
              y: -4,
              duration: 0.4,
              ease: "power2.out"
            });
          }
          // Animate icon - minimal scale
          if (iconRefs.current[index]) {
            gsap.to(iconRefs.current[index], {
              scale: 1.1,
              backgroundColor: "rgba(29,152,131,0.15)",
              duration: 0.4,
              ease: "power2.out"
            });
          }
        },
        onEnterBack: () => {
          setActiveStep(index);
          // Animate line progression - slow animation
          if (lineRef.current) {
            const progress = (index + 1) / steps.length;
            gsap.to(lineRef.current, {
              scaleY: progress,
              duration: 1.5,
              ease: "power1.inOut"
            });
          }
          if (numberRefs.current[index]) {
            gsap.to(numberRefs.current[index], {
              backgroundColor: "#1d9883",
              scale: 1.05,
              duration: 0.4,
              ease: "power2.out"
            });
            const span = numberRefs.current[index].querySelector('span');
            if (span) {
              gsap.to(span, {
                color: "#ffffff",
                duration: 0.3
              });
            }
          }
          if (cardRefs.current[index]) {
            gsap.to(cardRefs.current[index], {
              borderWidth: "2px",
              boxShadow: "0 8px 24px -8px rgba(29, 152, 131, 0.25)",
              y: -4,
              duration: 0.4,
              ease: "power2.out"
            });
          }
          if (iconRefs.current[index]) {
            gsap.to(iconRefs.current[index], {
              scale: 1.1,
              backgroundColor: "rgba(29,152,131,0.15)",
              duration: 0.4,
              ease: "power2.out"
            });
          }
        },
        onLeave: () => {
          // Keep active state when scrolling past (don't reset)
        },
        onLeaveBack: () => {
          // Reset when scrolling back up past the step
          // Update line progress - slow animation
          if (lineRef.current && index > 0) {
            const progress = index / steps.length;
            gsap.to(lineRef.current, {
              scaleY: progress,
              duration: 1.5,
              ease: "power1.inOut"
            });
          } else if (lineRef.current && index === 0) {
            gsap.to(lineRef.current, {
              scaleY: 0,
              duration: 1.5,
              ease: "power1.inOut"
            });
          }
          if (numberRefs.current[index]) {
            gsap.to(numberRefs.current[index], {
              backgroundColor: "#eff8f6",
              scale: 1,
              duration: 0.4,
              ease: "power2.out"
            });
            const span = numberRefs.current[index].querySelector('span');
            if (span) {
              gsap.to(span, {
                color: "#1d9883",
                duration: 0.3
              });
            }
          }
          if (cardRefs.current[index]) {
            gsap.to(cardRefs.current[index], {
              borderWidth: "1px",
              boxShadow: "none",
              y: 0,
              duration: 0.5,
              ease: "power2.out"
            });
          }
          if (iconRefs.current[index]) {
            gsap.to(iconRefs.current[index], {
              scale: 1,
              backgroundColor: "rgba(29,152,131,0.1)",
              duration: 0.4,
              ease: "power2.out"
            });
          }
        }
      });

      triggers.push(trigger);
    });

    return () => {
      triggers.forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section id="how-it-works" className={`relative px-4 md:px-8 lg:px-[60px] xl:px-[108px] py-[60px] md:py-[80px] max-w-[1440px] mx-auto lg:mr-[440px] xl:mr-[520px] transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} ref={ref} data-node-id="79:3288">
      <div className="mb-[30px] md:mb-[40px]">
        <h2 className="text-[#020617] text-[30px] md:text-[38px] lg:text-[42px] font-semibold tracking-[-0.04em] mb-[10px]">
          How It Works
        </h2>
        <p className="text-[#64748b] text-[15px] md:text-[17px] leading-[24px] max-w-[520px]">
          Four Simple Steps to Navigate Your Highest Rank
        </p>
      </div>
      
      <div className="relative">
        {/* Vertical connecting line */}
        <div 
          ref={lineContainerRef}
          className="absolute left-[28px] md:left-[33px] top-0 w-[2px] bottom-0 flex items-start justify-center pointer-events-none z-0"
        >
          <div 
            ref={lineRef}
            className="w-full bg-[#1d9883] rounded-full"
            style={{ 
              height: '100%',
              transformOrigin: 'top',
              minHeight: '400px'
            }}
          />
        </div>
        
        {steps.map((step, index) => (
          <div 
            key={index} 
            ref={el => stepRefs.current[index] = el}
            className="relative z-10 flex flex-row items-start gap-[20px] md:gap-[24px] mb-[32px] md:mb-[48px]"
          >
            <div 
              ref={el => numberRefs.current[index] = el}
              className="bg-[#eff8f6] rounded-[33px] w-[56px] h-[56px] md:w-[66px] md:h-[66px] flex items-center justify-center flex-shrink-0 transition-all duration-300 cursor-pointer group/number"
            >
              <span className="text-[36px] md:text-[44px] font-bold tracking-[-1px] md:tracking-[-1.2789px] text-[#1d9883] transition-colors duration-300">
                {step.num}
              </span>
            </div>
            <div 
              ref={el => cardRefs.current[index] = el}
              className="bg-white border border-[#1d9883] rounded-[8px] p-[20px] md:p-[25px] flex-1 w-full transition-all duration-300 group/card"
            >
              <div className="flex flex-col sm:flex-row gap-[16px] md:gap-[18px] items-start">
                <div 
                  ref={el => iconRefs.current[index] = el}
                  className="bg-[rgba(29,152,131,0.1)] rounded-[12px] w-[44px] h-[44px] md:w-[48px] md:h-[48px] flex items-center justify-center flex-shrink-0 transition-all duration-300"
                >
                  <img alt="" className="w-5 h-5 md:w-6 md:h-6 transition-transform duration-300" src={step.icon} />
                </div>
                <div className="flex-1">
                  <h3 className="text-[#0f1729] text-[18px] md:text-[20px] font-bold leading-[24px] md:leading-[28px] tracking-[-0.4px] md:tracking-[-0.5px] mb-[10px] md:mb-[12px] transition-colors duration-300 group-hover/card:text-[#1d9883]">
                    {step.title}
                  </h3>
                  <p className="text-[#65758b] text-[14px] md:text-[16px] font-normal leading-[20px] md:leading-[24px] transition-colors duration-300">
                    {step.desc}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
});

export default HowItWorksSection;

