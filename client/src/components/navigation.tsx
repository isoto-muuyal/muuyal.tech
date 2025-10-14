import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useLanguage } from "@/contexts/language-context";

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

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
    <nav className="bg-background shadow-sm sticky top-0 z-50 border-b border-border dark:border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-primary dark:text-primary" data-testid="text-logo">muuyal.tech</span>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <button 
                onClick={() => scrollToSection('home')}
                className="text-foreground hover:text-primary transition-colors font-medium"
                data-testid="link-nav-home"
              >
                {t.nav.home}
              </button>
              <button 
                onClick={() => scrollToSection('services')}
                className="text-muted-foreground hover:text-primary transition-colors font-medium"
                data-testid="link-nav-services"
              >
                {t.nav.services}
              </button>
              <button 
                onClick={() => scrollToSection('portfolio')}
                className="text-muted-foreground hover:text-primary transition-colors font-medium"
                data-testid="link-nav-portfolio"
              >
                {t.nav.portfolio}
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="text-muted-foreground hover:text-primary transition-colors font-medium"
                data-testid="link-nav-about"
              >
                {t.nav.about}
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-muted-foreground hover:text-primary transition-colors font-medium"
                data-testid="link-nav-contact"
              >
                {t.nav.contact}
              </button>
            </div>
          </div>
          
          <div className="hidden md:flex md:items-center md:space-x-4">
            <LanguageSwitcher />
            <ModeToggle />
            <Button 
              onClick={handleConsultation}
              className="bg-primary text-white hover:bg-primary/90"
              data-testid="button-consultation-nav"
            >
              {t.nav.consultation}
            </Button>
          </div>
          
          <div className="md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-foreground"
              data-testid="button-mobile-menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border dark:border-border py-4">
            <div className="flex flex-col space-y-4">
              <button 
                onClick={() => scrollToSection('home')}
                className="text-foreground hover:text-primary transition-colors font-medium text-left"
                data-testid="link-mobile-home"
              >
                {t.nav.home}
              </button>
              <button 
                onClick={() => scrollToSection('services')}
                className="text-muted hover:text-primary transition-colors font-medium text-left"
                data-testid="link-mobile-services"
              >
                {t.nav.services}
              </button>
              <button 
                onClick={() => scrollToSection('portfolio')}
                className="text-muted hover:text-primary transition-colors font-medium text-left"
                data-testid="link-mobile-portfolio"
              >
                {t.nav.portfolio}
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="text-muted hover:text-primary transition-colors font-medium text-left"
                data-testid="link-mobile-about"
              >
                {t.nav.about}
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-muted hover:text-primary transition-colors font-medium text-left"
                data-testid="link-mobile-contact"
              >
                {t.nav.contact}
              </button>
              <div className="flex gap-2">
                <LanguageSwitcher />
                <ModeToggle />
              </div>
              <Button 
                onClick={handleConsultation}
                className="bg-primary text-white hover:bg-primary/90 w-full"
                data-testid="button-consultation-mobile"
              >
                {t.nav.consultation}
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
