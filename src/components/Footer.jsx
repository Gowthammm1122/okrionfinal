import { imgLogoDark1, footerLocation, footerMail } from './assets';

import { forwardRef } from 'react';

const Footer = forwardRef(function Footer(props, ref) {
  return (
    <footer ref={ref} className="bg-[#001511] py-[50px] sm:py-[60px] md:py-[84px] px-4 sm:px-6 md:px-8 lg:px-[60px] xl:px-[80px] mt-[50px] sm:mt-[60px] md:mt-[80px]" data-name="Footer" data-node-id="79:3329">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[40px] md:gap-[60px] lg:gap-[80px] mb-[30px] md:mb-[40px]">
          <div>
            <div className="h-[24px] md:h-[30px] w-[110px] md:w-[135px] mb-[20px] md:mb-[24px]">
              <img alt="OKRION Logo" className="w-full h-full object-contain" src={imgLogoDark1} />
            </div>
            <p className="text-[rgba(248,250,252,0.7)] text-[13px] md:text-[14px] font-normal leading-[20px] md:leading-[22.75px]">
              Navigate your institution's accreditation journey with confidence. A centralized platform that charts the roadmap for NAAC, NBA, and NIRF compliance—turning complex frameworks into one guided pathway toward excellence.
            </p>
          </div>
          
          <div>
            <h3 className="text-slate-50 text-[16px] md:text-[18px] font-bold leading-[24px] md:leading-[28px] tracking-[-0.4px] md:tracking-[-0.45px] mb-[20px] md:mb-[24px]">Quick Links</h3>
            <div className="flex flex-col gap-[20px] md:gap-[24px]">
              <a href="#why-us" className="text-white text-[13px] md:text-[14px] font-normal leading-[18px] md:leading-[20px] hover:text-[#1d9883] transition-colors duration-300">Why Us</a>
              <a href="#features" className="text-white text-[13px] md:text-[14px] font-normal leading-[18px] md:leading-[20px] hover:text-[#1d9883] transition-colors duration-300">Features</a>
              <a href="#who-can-use" className="text-white text-[13px] md:text-[14px] font-normal leading-[18px] md:leading-[20px] hover:text-[#1d9883] transition-colors duration-300">Who Can Use</a>
              <a href="#how-it-works" className="text-white text-[13px] md:text-[14px] font-normal leading-[18px] md:leading-[20px] hover:text-[#1d9883] transition-colors duration-300">How It Works</a>
            </div>
          </div>
          
          <div>
            <h3 className="text-slate-50 text-[16px] md:text-[18px] font-bold leading-[24px] md:leading-[28px] tracking-[-0.4px] md:tracking-[-0.45px] mb-[20px] md:mb-[24px]">Contact Details</h3>
            <div className="space-y-[14px] md:space-y-[16px]">
              <div className="flex gap-[10px] md:gap-[12px]">
                <img alt="Location" className="w-[16px] h-[16px] md:w-[18px] md:h-[18px] flex-shrink-0 mt-1" src={footerLocation} />
                <p className="text-[rgba(248,250,252,0.7)] text-[13px] md:text-[14px] font-normal leading-[18px] md:leading-[20px]">
                  BLOCK-L, Embassy Tech Village, Outer Ring Rd, Devarabisanahalli, Bellandur, Bengaluru, Karnataka 560103
                </p>
              </div>
              <div className="flex gap-[10px] md:gap-[12px] items-center">
                <img alt="Email" className="w-[16px] h-[16px] md:w-[18px] md:h-[18px] flex-shrink-0" src={footerMail} />
                <p className="text-[rgba(248,250,252,0.7)] text-[13px] md:text-[14px] font-normal leading-[18px] md:leading-[20px]">info@snssquare.com</p>
              </div>
              {/* <div className="flex gap-[10px] md:gap-[12px] items-center">
                <img alt="" className="w-[16px] h-[16px] md:w-[18px] md:h-[18px] flex-shrink-0" src={imgSvg23} />
                <p className="text-[rgba(248,250,252,0.7)] text-[13px] md:text-[14px] font-normal leading-[18px] md:leading-[20px]">Mon - Sat: 9:00 AM - 6:00 PM</p>
              </div> */}
            </div>
          </div>
        </div>
        
        <div className="border-t border-[rgba(248,250,252,0.1)] pt-[16px] md:pt-[20px] text-center">
          <p className="text-[rgba(248,250,252,0.5)] text-[12px] md:text-[14px] font-normal leading-[18px] md:leading-[20px]">
            © 2025 All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
});

export default Footer;

