import { Button } from "@/components/ui/button";
import contentData from "@/data/content.json";

export default function HeroSection() {
  const { company, technologies } = contentData;

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleConsultation = () => {
    scrollToSection('contact');
  };

  const handleViewWork = () => {
    scrollToSection('portfolio');
  };

  return (
    <section id="home" className="bg-gradient-to-br from-slate-50 to-blue-50 py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-secondary mb-6 leading-tight" data-testid="text-hero-title">
            Fast, scalable software development from{" "}
            <span className="text-primary">Chihuahua, Mexico</span>
          </h1>
          <p className="text-xl text-muted mb-8 max-w-3xl mx-auto leading-relaxed" data-testid="text-hero-description">
            {company.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              onClick={handleConsultation}
              size="lg"
              className="bg-primary text-white hover:bg-blue-700 text-lg"
              data-testid="button-consultation-hero"
            >
              Book Free Consultation
            </Button>
            <Button 
              onClick={handleViewWork}
              variant="outline" 
              size="lg"
              className="border-2 border-primary text-primary hover:bg-primary hover:text-white text-lg"
              data-testid="button-view-work"
            >
              View Our Work
            </Button>
          </div>
          
          {/* Services Quick Overview */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-6 mt-16">
            {technologies.map((tech, index) => (
              <div 
                key={tech.name}
                className="text-center p-4 bg-white rounded-xl shadow-sm border border-slate-200"
                data-testid={`card-tech-${tech.name.toLowerCase().replace('.', '').replace(' ', '-')}`}
              >
                <i className={`${tech.icon} text-3xl ${tech.color} mb-2`}></i>
                <div className="font-semibold text-sm text-secondary">{tech.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
