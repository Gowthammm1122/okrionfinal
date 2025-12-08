import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useScrollAnimation } from './hooks';
import Header from './Header';
import HeroSection from './HeroSection';
import DemoForm from './DemoForm';
import WhyUsSection from './WhyUsSection';
import FeaturesSection from './FeaturesSection';
import WhoCanUseSection from './WhoCanUseSection';
import HowItWorksSection from './HowItWorksSection';
import Footer from './Footer';

gsap.registerPlugin(ScrollTrigger);

export default function Component1440WLight() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const formRef = useRef(null);
  const footerRef = useRef(null);
  const [heroRef, heroVisible] = useScrollAnimation();
  const [whyUsRef, whyUsVisible] = useScrollAnimation();
  const [featuresRef, featuresVisible] = useScrollAnimation();
  const [whoCanUseRef, whoCanUseVisible] = useScrollAnimation();
  const [howItWorksRef, howItWorksVisible] = useScrollAnimation();

  // GSAP ScrollTrigger for smooth form positioning - fixed until footer, then scrolls above
  useEffect(() => {
    if (!formRef.current || !footerRef.current) return;

    const form = formRef.current;
    const footer = footerRef.current;
    let trigger = null;
    let handleResize = null;
    let onScroll = null;
    
    // Wait for next frame to ensure element is rendered
    requestAnimationFrame(() => {
      const formHeight = form.offsetHeight || 770;
      
      // ===== CONFIGURATION CONSTANTS =====
      // Gap between form and footer (increase this to add more space)
      const FOOTER_GAP = 100; // Change this value to increase/decrease gap (default: 40px)
      
      // Minimum distance from top of viewport when form moves up (allows form to go higher)
      const MIN_TOP_DISTANCE = 20; // Change this to allow form to go higher (smaller = higher up)
      
      // Account for navbar height (80px) + some spacing
      const defaultTop = 100; // 80px navbar + 20px spacing
      const rightPos = window.innerWidth >= 1280 ? "108px" : "40px";
      
      // Control when form should stop being fixed and start scrolling
      // Options:
      // 1. Use a section ref - form will stop being fixed when that section ends
      //    Example: const stopSection = howItWorksRef.current;
      // 2. Use null - form will stay fixed until footer (current behavior)
      //    Example: const stopSection = null;
      const stopSection = null; // Change to howItWorksRef.current or any section ref
      // ====================================

      // Set initial form position - ensure it's on the right
      gsap.set(form, {
        position: "fixed",
        top: `${defaultTop}px`,
        right: rightPos,
        left: "auto",
        marginLeft: "auto",
        marginRight: "0",
        opacity: 1,
        visibility: "visible"
      });

      // Determine what element to use as the stop point
      const stopElement = stopSection || footer;
      
      // Create ScrollTrigger to adjust form position when stop element approaches
      trigger = ScrollTrigger.create({
        trigger: stopElement,
        start: "top bottom",
        end: "bottom bottom",
        onUpdate: (self) => {
          const stopRect = stopElement.getBoundingClientRect();
          const stopTop = stopRect.top;
          const currentRightPos = window.innerWidth >= 1280 ? "108px" : "40px";
          
          // Get current form position
          const formRect = form.getBoundingClientRect();
          const formBottom = formRect.bottom;
          const formTop = formRect.top;
          
          // Calculate what the form bottom should be to maintain gap
          const maxAllowedBottom = stopTop - FOOTER_GAP;
          const currentFormBottom = formTop + formHeight;
          
          // Check if form has moved up enough and should switch to absolute
          // Switch when form reaches near top and footer is approaching
          if (formTop <= MIN_TOP_DISTANCE + 10 && stopTop < formBottom + FOOTER_GAP + 100) {
            // Form has moved up enough and footer is close - switch to absolute positioning
            const scrollY = window.scrollY || window.pageYOffset;
            // Calculate absolute position based on current visual position
            const absoluteTop = scrollY + formRect.top;
            
            gsap.set(form, {
              position: "absolute",
              top: `${absoluteTop}px`,
              right: currentRightPos,
              left: "auto",
              opacity: 1,
              visibility: "visible",
              clearProps: "transform"
            });
          } else if (currentFormBottom > maxAllowedBottom && stopTop > 0) {
            // Calculate new top position to ensure gap is maintained
            // Allow form to go higher (smaller top value) when footer approaches
            const newTop = stopTop - formHeight - FOOTER_GAP;
            // Allow form to go up to MIN_TOP_DISTANCE from top of viewport
            const finalTop = Math.max(MIN_TOP_DISTANCE, newTop);
            
            gsap.set(form, {
              top: `${finalTop}px`,
              right: currentRightPos,
              left: "auto",
              position: "fixed",
              opacity: 1,
              visibility: "visible"
            });
          } else if (stopTop > (formTop + formHeight + FOOTER_GAP + 100)) {
            // Stop element is far enough - restore default position
            gsap.set(form, {
              top: `${defaultTop}px`,
              right: currentRightPos,
              left: "auto",
              position: "fixed",
              opacity: 1,
              visibility: "visible"
            });
          }
        },
        onEnter: () => {
          // Stop element entered viewport - check and adjust if needed
          const stopRect = stopElement.getBoundingClientRect();
          const stopTop = stopRect.top;
          const formRect = form.getBoundingClientRect();
          const formTop = formRect.top;
          const currentRightPos = window.innerWidth >= 1280 ? "108px" : "40px";
          
          // Calculate maximum allowed form bottom
          const maxAllowedBottom = stopTop - FOOTER_GAP;
          const currentFormBottom = formTop + formHeight;
          
          if (currentFormBottom > maxAllowedBottom && stopTop > 0) {
            const newTop = stopTop - formHeight - FOOTER_GAP;
            // Allow form to go higher (up to MIN_TOP_DISTANCE from top) when footer approaches
            const finalTop = Math.max(MIN_TOP_DISTANCE, newTop);
            
            gsap.set(form, {
              top: `${finalTop}px`,
              right: currentRightPos,
              left: "auto",
              position: "fixed",
              opacity: 1,
              visibility: "visible"
            });
          } else {
            gsap.set(form, {
              opacity: 1,
              visibility: "visible",
              right: currentRightPos,
              left: "auto"
            });
          }
        },
        onLeave: () => {
          // Stop element passed - switch to absolute positioning so form scrolls with page
          const formRect = form.getBoundingClientRect();
          const scrollY = window.scrollY || window.pageYOffset;
          const currentRightPos = window.innerWidth >= 1280 ? "108px" : "40px";
          
          // Calculate absolute position based on current visual position
          // This prevents any jump when switching from fixed to absolute
          const absoluteTop = scrollY + formRect.top;
          
          // Switch to absolute positioning - form will now scroll with page
          gsap.set(form, {
            position: "absolute",
            top: `${absoluteTop}px`,
            right: currentRightPos,
            left: "auto",
            opacity: 1,
            visibility: "visible",
            clearProps: "transform"
          });
        },
        onEnterBack: () => {
          // Scrolling back up - check if we should switch back to fixed
          const formRect = form.getBoundingClientRect();
          const computedStyle = window.getComputedStyle(form);
          const isAbsolute = computedStyle.position === 'absolute';
          const currentRightPos = window.innerWidth >= 1280 ? "108px" : "40px";
          
          // If form is absolute and we're scrolling back up, switch to fixed
          if (isAbsolute) {
            // Calculate where form should be in fixed position
            const scrollY = window.scrollY || window.pageYOffset;
            const formTopInViewport = formRect.top;
            
            // If form is high enough in viewport, switch back to fixed
            if (formTopInViewport >= defaultTop - 50) {
              gsap.set(form, {
                position: "fixed",
                top: `${defaultTop}px`,
                right: currentRightPos,
                left: "auto",
                opacity: 1,
                visibility: "visible",
                clearProps: "transform"
              });
            }
          } else {
            // Already fixed, just ensure it's at default position
            gsap.set(form, {
              position: "fixed",
              top: `${defaultTop}px`,
              right: currentRightPos,
              left: "auto",
              opacity: 1,
              visibility: "visible"
            });
          }
        }
      });

      // Handle window resize
      handleResize = () => {
        const newRightPos = window.innerWidth >= 1280 ? "108px" : "40px";
        if (trigger) trigger.refresh();
        gsap.set(form, {
          right: newRightPos,
          left: "auto"
        });
      };
      window.addEventListener('resize', handleResize);

      // Also add scroll listener to continuously check for stop element overlap
      const handleScroll = () => {
        if (!form || !stopElement) return;
        
        const formRect = form.getBoundingClientRect();
        const computedStyle = window.getComputedStyle(form);
        const isFixed = computedStyle.position === 'fixed';
        
        // If form is fixed, check if it needs to move up or switch to absolute
        if (isFixed) {
          const stopRect = stopElement.getBoundingClientRect();
          const stopTop = stopRect.top;
          const formTop = formRect.top;
          const formBottom = formRect.bottom;
          const currentRightPos = window.innerWidth >= 1280 ? "108px" : "40px";
          
          // Calculate maximum allowed form bottom to maintain gap
          const maxAllowedBottom = stopTop - FOOTER_GAP;
          const currentFormBottom = formTop + formHeight;
          
          // Check if form has reached minimum top distance (form has moved up enough)
          // If so, and footer is very close, switch to absolute positioning
          if (formTop <= MIN_TOP_DISTANCE + 10 && stopTop < formBottom + FOOTER_GAP + 50) {
            // Form has moved up enough and footer is close - switch to absolute
            const scrollY = window.scrollY || window.pageYOffset;
            const absoluteTop = scrollY + formRect.top;
            
            gsap.set(form, {
              position: "absolute",
              top: `${absoluteTop}px`,
              right: currentRightPos,
              left: "auto",
              opacity: 1,
              visibility: "visible"
            });
          } else if (currentFormBottom > maxAllowedBottom && stopTop > 0) {
            // Still need to move form up while fixed
            const newTop = stopTop - formHeight - FOOTER_GAP;
            const finalTop = Math.max(MIN_TOP_DISTANCE, newTop);
            
            gsap.set(form, {
              top: `${finalTop}px`,
              right: currentRightPos,
              left: "auto",
              position: "fixed",
              opacity: 1,
              visibility: "visible"
            });
          } else if (stopTop > (formTop + formHeight + FOOTER_GAP + 100)) {
            // Stop element is far enough - restore default position
            gsap.set(form, {
              top: `${defaultTop}px`,
              right: currentRightPos,
              left: "auto",
              position: "fixed",
              opacity: 1,
              visibility: "visible"
            });
          }
        } else {
          // Form is absolute - check if we should switch back to fixed when scrolling up
          const stopRect = stopElement.getBoundingClientRect();
          const stopTop = stopRect.top;
          const formRect = form.getBoundingClientRect();
          const formTop = formRect.top;
          const formBottom = formRect.bottom;
          const scrollY = window.scrollY || window.pageYOffset;
          const currentRightPos = window.innerWidth >= 1280 ? "108px" : "40px";
          
          // Check if footer is below viewport (we've scrolled past it)
          const footerIsBelowViewport = stopTop > window.innerHeight;
          
          // Check if footer is well above the form (far enough away)
          const footerIsFarAbove = stopTop > formBottom + FOOTER_GAP + 200;
          
          // Switch back to fixed if:
          // 1. Footer is below viewport (we've scrolled past it) - always switch back
          // 2. OR footer is far above the form AND form's viewport position is reasonable
          if (footerIsBelowViewport || (footerIsFarAbove && formTop >= defaultTop - 100)) {
            // Switch back to fixed positioning
            gsap.set(form, {
              position: "fixed",
              top: `${defaultTop}px`,
              right: currentRightPos,
              left: "auto",
              opacity: 1,
              visibility: "visible",
              clearProps: "transform"
            });
          } else if (formBottom + FOOTER_GAP > stopTop && stopTop > 0 && stopTop < window.innerHeight) {
            // Form would overlap footer - adjust absolute position
            const stopAbsoluteTop = scrollY + stopTop;
            const currentAbsoluteTop = parseFloat(form.style.top) || (scrollY + formTop);
            const newAbsoluteTop = stopAbsoluteTop - formHeight - FOOTER_GAP;
            const finalAbsoluteTop = Math.max(0, newAbsoluteTop);
            
            // Only update if we need to prevent overlap and position actually needs to change
            if (Math.abs(currentAbsoluteTop - finalAbsoluteTop) > 1) {
              gsap.set(form, {
                top: `${finalAbsoluteTop}px`,
                right: currentRightPos,
                left: "auto",
                position: "absolute",
                opacity: 1,
                visibility: "visible",
                clearProps: "transform"
              });
            }
          }
          // Otherwise, let the form scroll naturally with the page
        }
      };
      
      // Use requestAnimationFrame for smooth scroll handling
      let ticking = false;
      onScroll = () => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            handleScroll();
            ticking = false;
          });
          ticking = true;
        }
      };
      
      window.addEventListener('scroll', onScroll, { passive: true });
      
      // Initial check
      handleScroll();
    });

    // Cleanup on unmount
    return () => {
      if (trigger) {
        trigger.kill();
      }
      if (handleResize) {
        window.removeEventListener('resize', handleResize);
      }
      if (onScroll) {
        window.removeEventListener('scroll', onScroll);
      }
    };
  }, [footerRef]);


  return (
    <div className="bg-white relative min-h-screen w-full overflow-x-hidden" data-name="1440w light" data-node-id="79:3105">
      <Header 
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        setIsFormModalOpen={setIsFormModalOpen}
      />

      <HeroSection 
        isVisible={heroVisible}
        ref={heroRef}
      />

      {/* Fixed Demo Form - Desktop/Laptop (1024px+) */}
      <div 
        ref={formRef}
        className="hidden lg:block w-[380px] xl:w-[486px] h-auto max-h-[770px] pointer-events-auto z-40"
        style={{
          position: 'fixed',
          top: '100px',
          right: '40px'
        }}
        data-node-id="79:3376"
      >
        <DemoForm />
      </div>

      {/* Floating "Book a Demo" Button - Mobile/Tablet Only */}
      <button
        onClick={() => setIsFormModalOpen(true)}
        className="lg:hidden fixed right-0 top-1/2 -translate-y-1/2 bg-[#1d9883] text-white px-3 py-6 sm:px-4 sm:py-8 rounded-l-xl shadow-lg z-30 hover:bg-[#098a74] transition-all duration-300 hover:pr-4 sm:hover:pr-5"
        style={{ writingMode: 'vertical-rl' }}
        aria-label="Book a Demo"
      >
        <span className="text-[13px] sm:text-[15px] font-bold tracking-wider whitespace-nowrap">
          BOOK A DEMO
        </span>
      </button>

      {/* Form Side Sheet - Mobile/Tablet */}
      {isFormModalOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300" 
            onClick={() => setIsFormModalOpen(false)}
            style={{ animation: 'fadeIn 0.3s ease-out' }}
          />
          
          {/* Side Sheet */}
          <div 
            className="lg:hidden fixed top-0 right-0 h-full w-full sm:w-[400px] md:w-[450px] bg-white z-50 shadow-2xl overflow-y-auto"
            style={{ 
              animation: 'slideInRight 0.3s ease-out',
              transformOrigin: 'right'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-4 sm:px-6 sm:py-5 flex justify-between items-center z-10 shadow-sm">
              <h2 className="text-[#0f1729] text-[20px] sm:text-[22px] font-bold">Book a Free Demo</h2>
              <button 
                onClick={() => setIsFormModalOpen(false)} 
                className="text-gray-400 hover:text-gray-600 text-3xl leading-none transition-colors w-8 h-8 flex items-center justify-center"
                aria-label="Close"
              >
                ×
              </button>
            </div>
            
            {/* Form Content */}
            <div className="p-4 sm:p-6">
              <DemoForm 
                hideHeader={true} 
                onSubmit={(e) => { e.preventDefault(); setIsFormModalOpen(false); }} 
              />
            </div>
          </div>
        </>
      )}

      <WhyUsSection 
        isVisible={whyUsVisible}
        ref={whyUsRef}
      />

      <FeaturesSection 
        isVisible={featuresVisible}
        ref={featuresRef}
      />

      <WhoCanUseSection 
        isVisible={whoCanUseVisible}
        ref={whoCanUseRef}
      />

      <HowItWorksSection 
        isVisible={howItWorksVisible}
        ref={howItWorksRef}
      />

      <Footer ref={footerRef} />
    </div>
  );
}
