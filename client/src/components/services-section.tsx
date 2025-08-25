import { Code, Bot, Brain, Users, Zap, Settings } from "lucide-react";
import contentData from "@/data/content.json";

const iconMap = {
  code: Code,
  robot: Bot,
  brain: Brain,
  users: Users,
  zap: Zap,
  settings: Settings,
};

const colorMap = {
  primary: "bg-primary",
  accent: "bg-accent",
  purple: "bg-purple-600",
  orange: "bg-orange-500",
  red: "bg-red-500",
  indigo: "bg-indigo-600",
};

export default function ServicesSection() {
  const { services } = contentData;

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-secondary mb-4" data-testid="text-services-title">
            Our Services
          </h2>
          <p className="text-xl text-muted max-w-3xl mx-auto" data-testid="text-services-description">
            We provide comprehensive software development solutions tailored to your business needs
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const IconComponent = iconMap[service.icon as keyof typeof iconMap];
            const colorClass = colorMap[service.color as keyof typeof colorMap];
            
            return (
              <div 
                key={service.id}
                className="bg-slate-50 p-8 rounded-xl border border-slate-200 hover:shadow-lg transition-shadow"
                data-testid={`card-service-${service.id}`}
              >
                <div className={`w-12 h-12 ${colorClass} rounded-lg flex items-center justify-center mb-6`}>
                  <IconComponent className="text-white text-xl" />
                </div>
                <h3 className="text-xl font-semibold text-secondary mb-3" data-testid={`text-service-title-${service.id}`}>
                  {service.title}
                </h3>
                <p className="text-muted mb-4 leading-relaxed" data-testid={`text-service-description-${service.id}`}>
                  {service.description}
                </p>
                <ul className="text-sm text-muted space-y-1">
                  {service.features.map((feature, index) => (
                    <li key={index} data-testid={`text-service-feature-${service.id}-${index}`}>
                      • {feature}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
