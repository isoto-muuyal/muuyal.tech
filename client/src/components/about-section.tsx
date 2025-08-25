import { Clock, DollarSign, Handshake, Linkedin, Github } from "lucide-react";
import contentData from "@/data/content.json";

export default function AboutSection() {
  const { team } = contentData;

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-secondary mb-4" data-testid="text-about-title">
            About muuyal.io
          </h2>
          <p className="text-xl text-muted max-w-3xl mx-auto" data-testid="text-about-description">
            Born in Chihuahua, Mexico, we're a passionate team of developers committed to delivering world-class software solutions.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <h3 className="text-3xl font-bold text-secondary mb-6" data-testid="text-story-title">Our Story</h3>
            <p className="text-muted mb-6 leading-relaxed" data-testid="text-story-paragraph-1">
              Founded in the heart of Chihuahua, Mexico, muuyal.io emerged from a simple vision: to bridge the gap between innovative technology and practical business solutions. Our team combines deep technical expertise with an understanding of modern business challenges.
            </p>
            <p className="text-muted mb-6 leading-relaxed" data-testid="text-story-paragraph-2">
              We specialize in rapid development cycles, leveraging cloud-based development environments and modern frameworks to deliver solutions faster than traditional development approaches, without compromising on quality or scalability.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-4 bg-slate-50 rounded-lg">
                <div className="text-3xl font-bold text-primary mb-1" data-testid="text-stat-projects">50+</div>
                <div className="text-sm text-muted">Projects Delivered</div>
              </div>
              <div className="text-center p-4 bg-slate-50 rounded-lg">
                <div className="text-3xl font-bold text-primary mb-1" data-testid="text-stat-satisfaction">98%</div>
                <div className="text-sm text-muted">Client Satisfaction</div>
              </div>
            </div>
          </div>
          <div>
            <img 
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
              alt="Modern development team workspace" 
              className="rounded-xl shadow-lg w-full h-auto"
              data-testid="img-workspace"
            />
          </div>
        </div>

        {/* Why Nearshore section */}
        <div className="bg-slate-50 rounded-2xl p-12 mb-16">
          <h3 className="text-3xl font-bold text-secondary mb-8 text-center" data-testid="text-nearshore-title">
            Why Nearshore with Chihuahua?
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                <Clock className="text-white text-2xl" />
              </div>
              <h4 className="font-semibold text-secondary mb-2" data-testid="text-benefit-timezone-title">Same Time Zone</h4>
              <p className="text-muted text-sm" data-testid="text-benefit-timezone-description">
                Work seamlessly with US businesses with overlapping business hours for real-time collaboration.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent rounded-xl flex items-center justify-center mx-auto mb-4">
                <DollarSign className="text-white text-2xl" />
              </div>
              <h4 className="font-semibold text-secondary mb-2" data-testid="text-benefit-cost-title">Cost Effective</h4>
              <p className="text-muted text-sm" data-testid="text-benefit-cost-description">
                High-quality development at competitive rates, providing exceptional value for your investment.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Handshake className="text-white text-2xl" />
              </div>
              <h4 className="font-semibold text-secondary mb-2" data-testid="text-benefit-culture-title">Cultural Alignment</h4>
              <p className="text-muted text-sm" data-testid="text-benefit-culture-description">
                Strong English skills and cultural understanding ensure smooth communication and project success.
              </p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-secondary mb-4" data-testid="text-team-title">Meet Our Team</h3>
          <p className="text-muted max-w-2xl mx-auto" data-testid="text-team-description">
            Experienced developers passionate about creating innovative solutions and pushing the boundaries of technology.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {team.map((member) => (
            <div key={member.id} className="text-center" data-testid={`card-team-member-${member.id}`}>
              <img 
                src={member.image} 
                alt={`${member.name} photo`}
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover shadow-lg"
                data-testid={`img-team-member-${member.id}`}
              />
              <h4 className="font-semibold text-secondary mb-1" data-testid={`text-team-name-${member.id}`}>
                {member.name}
              </h4>
              <p className="text-primary font-medium mb-2" data-testid={`text-team-role-${member.id}`}>
                {member.role}
              </p>
              <p className="text-muted text-sm mb-4" data-testid={`text-team-bio-${member.id}`}>
                {member.bio}
              </p>
              <div className="flex justify-center space-x-3">
                <a 
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted hover:text-primary transition-colors"
                  data-testid={`link-linkedin-${member.id}`}
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a 
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted hover:text-primary transition-colors"
                  data-testid={`link-github-${member.id}`}
                >
                  <Github className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
