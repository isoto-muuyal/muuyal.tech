import { useState } from "react";
import { Mail, MessageSquare, Linkedin, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import contentData from "@/data/content.json";

export default function ContactSection() {
  const { company } = contentData;
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    projectType: "",
    message: "",
    agreeToContact: false,
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.agreeToContact) {
      toast({
        title: "Validation Error", 
        description: "Please agree to receive communications about your project inquiry.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await apiRequest("POST", "/api/contact", {
        name: formData.name,
        email: formData.email,
        company: formData.company,
        projectType: formData.projectType,
        message: formData.message,
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: "Message Sent Successfully!",
          description: "We'll get back to you within 24 hours during business days.",
        });
        
        // Reset form
        setFormData({
          name: "",
          email: "",
          company: "",
          projectType: "",
          message: "",
          agreeToContact: false,
        });
      } else {
        throw new Error(result.message || "Failed to send message");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-secondary mb-4" data-testid="text-contact-title">
            Get In Touch
          </h2>
          <p className="text-xl text-muted max-w-3xl mx-auto" data-testid="text-contact-description">
            Ready to start your next project? Let's discuss how we can help you achieve your goals.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <h3 className="text-2xl font-bold text-secondary mb-6" data-testid="text-contact-cta">
              Let's Build Something Amazing Together
            </h3>
            <p className="text-muted mb-8 leading-relaxed" data-testid="text-contact-intro">
              Whether you need a complete web application, mobile backend, or just want to augment your existing team, we're here to help. Get in touch for a free consultation and project estimate.
            </p>

            <div className="space-y-6">
              <div className="flex items-center" data-testid="contact-info-email">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mr-4">
                  <Mail className="text-white" />
                </div>
                <div>
                  <div className="font-semibold text-secondary">Email Us</div>
                  <div className="text-muted">{company.email}</div>
                </div>
              </div>

              <div className="flex items-center" data-testid="contact-info-whatsapp">
                <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mr-4">
                  <MessageSquare className="text-white" />
                </div>
                <div>
                  <div className="font-semibold text-secondary">WhatsApp</div>
                  <div className="text-muted">{company.whatsapp}</div>
                </div>
              </div>

              <div className="flex items-center" data-testid="contact-info-linkedin">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-4">
                  <Linkedin className="text-white" />
                </div>
                <div>
                  <div className="font-semibold text-secondary">LinkedIn</div>
                  <div className="text-muted">{company.linkedin}</div>
                </div>
              </div>

              <div className="flex items-center" data-testid="contact-info-location">
                <div className="w-12 h-12 bg-slate-600 rounded-lg flex items-center justify-center mr-4">
                  <MapPin className="text-white" />
                </div>
                <div>
                  <div className="font-semibold text-secondary">Location</div>
                  <div className="text-muted">{company.location}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 p-8 rounded-xl border border-slate-200">
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="block text-sm font-medium text-secondary mb-2">Name *</label>
                <Input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Your full name"
                  required
                  data-testid="input-name"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-secondary mb-2">Email *</label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="your.email@company.com"
                  required
                  data-testid="input-email"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-secondary mb-2">Company</label>
                <Input
                  type="text"
                  value={formData.company}
                  onChange={(e) => handleInputChange("company", e.target.value)}
                  placeholder="Your company name"
                  data-testid="input-company"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-secondary mb-2">Project Type</label>
                <Select onValueChange={(value) => handleInputChange("projectType", value)}>
                  <SelectTrigger data-testid="select-project-type">
                    <SelectValue placeholder="Select project type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="web-app">Web Application</SelectItem>
                    <SelectItem value="mobile-backend">Mobile Backend</SelectItem>
                    <SelectItem value="qa-automation">QA Automation</SelectItem>
                    <SelectItem value="ai-integration">AI Integration</SelectItem>
                    <SelectItem value="team-augmentation">Team Augmentation</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-secondary mb-2">Project Details *</label>
                <Textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  placeholder="Tell us about your project requirements, timeline, and any specific technologies you'd like to use..."
                  required
                  data-testid="textarea-message"
                />
              </div>

              <div className="mb-6">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="agreeToContact"
                    checked={formData.agreeToContact}
                    onCheckedChange={(checked) => handleInputChange("agreeToContact", checked === true)}
                    data-testid="checkbox-agree"
                  />
                  <label htmlFor="agreeToContact" className="text-sm text-muted">
                    I agree to receive communications about my project inquiry
                  </label>
                </div>
              </div>

              <Button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-white hover:bg-blue-700 text-lg"
                data-testid="button-submit-contact"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>

              <p className="text-sm text-muted mt-4 text-center" data-testid="text-response-time">
                We typically respond within 24 hours during business days
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
