import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const handleConsultation = () => {
    scrollToSection('contact');
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-primary" data-testid="text-logo">rest.js</span>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <button 
                onClick={() => scrollToSection('home')}
                className="text-secondary hover:text-primary transition-colors font-medium"
                data-testid="link-nav-home"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('services')}
                className="text-muted hover:text-primary transition-colors font-medium"
                data-testid="link-nav-services"
              >
                Services
              </button>
              <button 
                onClick={() => scrollToSection('portfolio')}
                className="text-muted hover:text-primary transition-colors font-medium"
                data-testid="link-nav-portfolio"
              >
                Portfolio
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="text-muted hover:text-primary transition-colors font-medium"
                data-testid="link-nav-about"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-muted hover:text-primary transition-colors font-medium"
                data-testid="link-nav-contact"
              >
                Contact
              </button>
            </div>
          </div>
          
          <div className="hidden md:block">
            <Button 
              onClick={handleConsultation}
              className="bg-primary text-white hover:bg-blue-700"
              data-testid="button-consultation-nav"
            >
              Book Consultation
            </Button>
          </div>
          
          <div className="md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-secondary"
              data-testid="button-mobile-menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 py-4">
            <div className="flex flex-col space-y-4">
              <button 
                onClick={() => scrollToSection('home')}
                className="text-secondary hover:text-primary transition-colors font-medium text-left"
                data-testid="link-mobile-home"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('services')}
                className="text-muted hover:text-primary transition-colors font-medium text-left"
                data-testid="link-mobile-services"
              >
                Services
              </button>
              <button 
                onClick={() => scrollToSection('portfolio')}
                className="text-muted hover:text-primary transition-colors font-medium text-left"
                data-testid="link-mobile-portfolio"
              >
                Portfolio
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="text-muted hover:text-primary transition-colors font-medium text-left"
                data-testid="link-mobile-about"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-muted hover:text-primary transition-colors font-medium text-left"
                data-testid="link-mobile-contact"
              >
                Contact
              </button>
              <Button 
                onClick={handleConsultation}
                className="bg-primary text-white hover:bg-blue-700 w-full"
                data-testid="button-consultation-mobile"
              >
                Book Consultation
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
