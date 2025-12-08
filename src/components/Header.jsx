import { imgImage5 } from './assets';

export default function Header({ isMenuOpen, setIsMenuOpen, setIsFormModalOpen }) {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    scrollToSection(sectionId);
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-[6.4px] backdrop-filter bg-[rgba(246,251,250,0.46)] h-[70px] md:h-[80px] flex items-center justify-between px-4 md:px-8 lg:px-[60px] xl:px-[108px] w-full transition-all duration-300 shadow-sm" data-name="Header" data-node-id="79:3423">
        <div className="h-[20px] md:h-[24px] w-[80px] md:w-[99px]" data-name="image 5" data-node-id="79:3424">
          <div className="relative w-full h-full overflow-hidden pointer-events-none">
            <img alt="OKRION Logo" className="absolute h-[100.24%] left-[-4.04%] max-w-none top-[-0.12%] w-[110.1%]" src={imgImage5} />
          </div>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-[24px] text-[#65758b] text-[14px] font-normal leading-[20px] justify-center w-full" data-node-id="79:3427">
          <a href="#why-us" onClick={(e) => handleNavClick(e, 'why-us')} className="hover:text-[#1d9883] transition-colors duration-300 cursor-pointer">Why Us</a>
          <a href="#features" onClick={(e) => handleNavClick(e, 'features')} className="hover:text-[#1d9883] transition-colors duration-300 cursor-pointer">Features</a>
          <a href="#who-can-use" onClick={(e) => handleNavClick(e, 'who-can-use')} className="hover:text-[#1d9883] transition-colors duration-300 cursor-pointer">Who Can Use</a>
          <a href="#how-it-works" onClick={(e) => handleNavClick(e, 'how-it-works')} className="hover:text-[#1d9883] transition-colors duration-300 cursor-pointer">How It Works</a>
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <span className={`w-6 h-0.5 bg-[#1d9883] transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`w-6 h-0.5 bg-[#1d9883] transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`w-6 h-0.5 bg-[#1d9883] transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>
        
      </header>

      {/* Mobile Menu */}
      <div className={`fixed top-[70px] md:top-[80px] left-0 right-0 bg-white z-40 lg:hidden transition-all duration-300 ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}`}>
        <nav className="flex flex-col p-4 gap-4 border-t border-gray-200">
          <a href="#why-us" onClick={(e) => handleNavClick(e, 'why-us')} className="text-[#65758b] text-[16px] font-normal hover:text-[#1d9883] transition-colors py-2 cursor-pointer">Why Us</a>
          <a href="#features" onClick={(e) => handleNavClick(e, 'features')} className="text-[#65758b] text-[16px] font-normal hover:text-[#1d9883] transition-colors py-2 cursor-pointer">Features</a>
          <a href="#who-can-use" onClick={(e) => handleNavClick(e, 'who-can-use')} className="text-[#65758b] text-[16px] font-normal hover:text-[#1d9883] transition-colors py-2 cursor-pointer">Who Can Use</a>
          <a href="#how-it-works" onClick={(e) => handleNavClick(e, 'how-it-works')} className="text-[#65758b] text-[16px] font-normal hover:text-[#1d9883] transition-colors py-2 cursor-pointer">How It Works</a>
          <button onClick={() => { setIsFormModalOpen(true); setIsMenuOpen(false); }} className="bg-[#1d9883] h-[40px] rounded-[12px] text-white text-[14px] font-bold hover:bg-[#098a74] transition-colors mt-2">
            Book a Demo
          </button>
        </nav>
      </div>
    </>
  );
}

