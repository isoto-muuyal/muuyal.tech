import { ExternalLink, Github, Store, TrendingUp, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import contentData from "@/data/content.json";

const additionalProjectIcons = {
  ecommerce: Store,
  analytics: TrendingUp,
  "api-gateway": Smartphone,
};

export default function PortfolioSection() {
  const { projects } = contentData;
  
  const featuredProjects = projects.filter(p => p.featured);
  const otherProjects = projects.filter(p => !p.featured);

  return (
    <section id="portfolio" className="py-20 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-secondary mb-4" data-testid="text-portfolio-title">
            Our Portfolio
          </h2>
          <p className="text-xl text-muted max-w-3xl mx-auto" data-testid="text-portfolio-description">
            Real projects, real results. See how we've helped businesses transform their ideas into successful applications.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {featuredProjects.map((project) => (
            <div 
              key={project.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200"
              data-testid={`card-featured-project-${project.id}`}
            >
              {project.image && (
                <img 
                  src={project.image} 
                  alt={`${project.name} interface`}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-secondary" data-testid={`text-project-name-${project.id}`}>
                    {project.name}
                  </h3>
                  <Badge className="bg-accent text-white" data-testid={`badge-featured-${project.id}`}>
                    Featured
                  </Badge>
                </div>
                <p className="text-muted mb-4 leading-relaxed" data-testid={`text-project-description-${project.id}`}>
                  {project.description}
                </p>
                
                {project.problem && (
                  <div className="mb-6">
                    <h4 className="font-semibold text-secondary mb-2">Problem</h4>
                    <p className="text-muted text-sm mb-4" data-testid={`text-project-problem-${project.id}`}>
                      {project.problem}
                    </p>
                    
                    <h4 className="font-semibold text-secondary mb-2">Solution</h4>
                    <p className="text-muted text-sm mb-4" data-testid={`text-project-solution-${project.id}`}>
                      {project.solution}
                    </p>
                    
                    <h4 className="font-semibold text-secondary mb-2">Results</h4>
                    <p className="text-muted text-sm" data-testid={`text-project-results-${project.id}`}>
                      {project.results}
                    </p>
                  </div>
                )}

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech) => (
                    <Badge 
                      key={tech} 
                      variant="secondary"
                      data-testid={`badge-tech-${project.id}-${tech.toLowerCase()}`}
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-4">
                  <Link href={`/project/${project.id}`}>
                    <Button 
                      className="flex-1 bg-primary text-white hover:bg-blue-700"
                      data-testid={`button-view-details-${project.id}`}
                    >
                      View Details
                    </Button>
                  </Link>
                  {project.githubUrl && (
                    <a 
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center px-6 py-3 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                      data-testid={`link-github-${project.id}`}
                    >
                      <Github className="w-4 h-4 mr-2" />
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Projects Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {otherProjects.map((project) => {
            const IconComponent = additionalProjectIcons[project.id as keyof typeof additionalProjectIcons];
            
            return (
              <div 
                key={project.id}
                className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-lg transition-shadow"
                data-testid={`card-project-${project.id}`}
              >
                <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center mb-4">
                  {IconComponent ? (
                    <IconComponent className="text-white text-xl" />
                  ) : (
                    <Store className="text-white text-xl" />
                  )}
                </div>
                <h3 className="font-semibold text-secondary mb-2" data-testid={`text-project-name-${project.id}`}>
                  {project.name}
                </h3>
                <p className="text-muted text-sm mb-4" data-testid={`text-project-description-${project.id}`}>
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1 mb-4">
                  {project.technologies.map((tech) => (
                    <Badge 
                      key={tech} 
                      variant="outline" 
                      className="text-xs"
                      data-testid={`badge-tech-${project.id}-${tech.toLowerCase()}`}
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
                {project.githubUrl && (
                  <a 
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary font-medium text-sm hover:underline flex items-center"
                    data-testid={`link-github-${project.id}`}
                  >
                    View on GitHub
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
