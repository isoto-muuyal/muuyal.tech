import { useRoute } from "wouter";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import contentData from "@/data/content.json";

export default function ProjectDetail() {
  const [, params] = useRoute("/project/:id");
  const projectId = params?.id;

  const project = contentData.projects.find(p => p.id === projectId);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Project Not Found</h1>
          <Link href="/">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-bold text-primary">
              muuyal.tech
            </Link>
            <Link href="/">
              <Button variant="outline" data-testid="button-back-home">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-secondary mb-4" data-testid="text-project-title">
            {project.name}
          </h1>
          <p className="text-xl text-muted leading-relaxed" data-testid="text-project-description">
            {project.description}
          </p>
        </div>

        {project.image && (
          <div className="mb-8">
            <img 
              src={project.image} 
              alt={`${project.name} screenshot`}
              className="w-full h-64 object-cover rounded-xl shadow-lg"
              data-testid="img-project-preview"
            />
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2 space-y-8">
            {project.problem && (
              <div>
                <h2 className="text-2xl font-bold text-secondary mb-4">Problem</h2>
                <p className="text-muted leading-relaxed" data-testid="text-project-problem">
                  {project.problem}
                </p>
              </div>
            )}

            {project.solution && (
              <div>
                <h2 className="text-2xl font-bold text-secondary mb-4">Solution</h2>
                <p className="text-muted leading-relaxed" data-testid="text-project-solution">
                  {project.solution}
                </p>
              </div>
            )}

            {project.results && (
              <div>
                <h2 className="text-2xl font-bold text-secondary mb-4">Results</h2>
                <p className="text-muted leading-relaxed" data-testid="text-project-results">
                  {project.results}
                </p>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-secondary mb-3">Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <Badge key={tech} variant="secondary" data-testid={`badge-tech-${tech.toLowerCase()}`}>
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            {project.githubUrl && (
              <div>
                <h3 className="text-lg font-semibold text-secondary mb-3">Links</h3>
                <div className="space-y-2">
                  <a 
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-primary hover:underline"
                    data-testid="link-github"
                  >
                    <Github className="w-4 h-4 mr-2" />
                    View on GitHub
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="border-t border-slate-200 pt-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-secondary mb-4">Interested in a Similar Project?</h3>
            <p className="text-muted mb-6">
              Let's discuss how we can help you build something amazing.
            </p>
            <Link href="/#contact">
              <Button size="lg" data-testid="button-contact-project">
                Get In Touch
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
