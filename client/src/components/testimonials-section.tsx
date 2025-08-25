import { Star } from "lucide-react";
import contentData from "@/data/content.json";

export default function TestimonialsSection() {
  const { testimonials } = contentData;

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-secondary mb-4" data-testid="text-testimonials-title">
            What Our Clients Say
          </h2>
          <p className="text-xl text-muted" data-testid="text-testimonials-description">
            Real feedback from businesses we've helped transform
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id}
              className="bg-white p-8 rounded-xl shadow-sm border border-slate-200"
              data-testid={`card-testimonial-${testimonial.id}`}
            >
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" data-testid={`star-${testimonial.id}-${i}`} />
                  ))}
                </div>
              </div>
              <p className="text-muted mb-6 leading-relaxed" data-testid={`text-testimonial-content-${testimonial.id}`}>
                "{testimonial.content}"
              </p>
              <div className="flex items-center">
                <img 
                  src={testimonial.image} 
                  alt={`${testimonial.author} photo`}
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                  data-testid={`img-testimonial-author-${testimonial.id}`}
                />
                <div>
                  <div className="font-semibold text-secondary" data-testid={`text-testimonial-author-${testimonial.id}`}>
                    {testimonial.author}
                  </div>
                  <div className="text-sm text-muted" data-testid={`text-testimonial-position-${testimonial.id}`}>
                    {testimonial.position}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
