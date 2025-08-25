import { Linkedin, Github, Twitter, MessageSquare } from "lucide-react";
import contentData from "@/data/content.json";

export default function Footer() {
  const { company, services } = contentData;

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-secondary text-white py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <span className="text-3xl font-bold" data-testid="text-footer-logo">{company.name}</span>
            </div>
            <p className="text-slate-300 mb-6 leading-relaxed max-w-md" data-testid="text-footer-description">
              Fast, scalable software development from Chihuahua, Mexico. We help businesses build innovative solutions with modern technologies and proven methodologies.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center hover:bg-primary transition-colors"
                data-testid="link-footer-linkedin"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center hover:bg-primary transition-colors"
                data-testid="link-footer-github"
              >
                <Github className="w-4 h-4" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center hover:bg-primary transition-colors"
                data-testid="link-footer-twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center hover:bg-primary transition-colors"
                data-testid="link-footer-whatsapp"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4" data-testid="text-footer-services-title">Services</h3>
            <ul className="space-y-3 text-slate-300">
              <li>
                <button 
                  onClick={() => scrollToSection('services')}
                  className="hover:text-white transition-colors text-left"
                  data-testid="link-footer-fullstack"
                >
                  Full-Stack Development
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('services')}
                  className="hover:text-white transition-colors text-left"
                  data-testid="link-footer-qa"
                >
                  QA Automation
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('services')}
                  className="hover:text-white transition-colors text-left"
                  data-testid="link-footer-ai"
                >
                  AI Integrations
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('services')}
                  className="hover:text-white transition-colors text-left"
                  data-testid="link-footer-nearshore"
                >
                  Nearshore Outsourcing
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('services')}
                  className="hover:text-white transition-colors text-left"
                  data-testid="link-footer-consulting"
                >
                  Technical Consulting
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4" data-testid="text-footer-company-title">Company</h3>
            <ul className="space-y-3 text-slate-300">
              <li>
                <button 
                  onClick={() => scrollToSection('about')}
                  className="hover:text-white transition-colors text-left"
                  data-testid="link-footer-about"
                >
                  About Us
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('portfolio')}
                  className="hover:text-white transition-colors text-left"
                  data-testid="link-footer-portfolio"
                >
                  Portfolio
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="hover:text-white transition-colors text-left"
                  data-testid="link-footer-contact"
                >
                  Contact
                </button>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors" data-testid="link-footer-blog">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors" data-testid="link-footer-careers">
                  Careers
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-700 pt-8 text-center text-slate-300">
          <p data-testid="text-footer-copyright">
            &copy; 2024 {company.name}. All rights reserved. | {company.location}
          </p>
        </div>
      </div>
    </footer>
  );
}
