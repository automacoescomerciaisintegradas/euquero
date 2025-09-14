import React from 'react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Ana Silva',
    role: 'Marketing Manager',
    company: 'TechCorp',
    image: '/testimonials/ana.jpg',
    content: 'Aumentamos nosso engajamento em 300% em apenas 2 meses usando a plataforma. A automação inteligente é impressionante!',
    rating: 5
  },
  {
    name: 'Carlos Santos',
    role: 'CEO',
    company: 'InovaBR',
    image: '/testimonials/carlos.jpg',
    content: 'Economizamos mais de 40 horas por semana com as respostas automáticas. O ROI foi extraordinário.',
    rating: 5
  },
  {
    name: 'Mariana Costa',
    role: 'Social Media',
    company: 'StartupXYZ',
    image: '/testimonials/mariana.jpg',
    content: 'A qualidade das respostas automáticas é tão boa que nossos seguidores nem percebem que é IA.',
    rating: 5
  }
];

export default function TestimonialsSection() {
  return (
    <div className="bg-zinc-900 py-24 sm:py-32 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,#CCFF00_1px,transparent_1px)] bg-[size:24px_24px] opacity-5"></div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-4">
            O que nossos
            <span className="bg-gradient-to-r from-[#CCFF00] to-green-400 text-transparent bg-clip-text"> clientes</span> dizem
          </h2>
          <p className="text-lg leading-8 text-zinc-400">
            Histórias reais de sucesso com nossa plataforma
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="group relative rounded-3xl bg-zinc-800/50 p-8 hover:bg-zinc-800 transition-all duration-300"
            >
              {/* Quote icon */}
              <div className="absolute -top-4 -left-4">
                <div className="w-8 h-8 rounded-full bg-[#CCFF00] flex items-center justify-center">
                  <Quote className="w-4 h-4 text-zinc-900" />
                </div>
              </div>

              {/* Content */}
              <div className="relative">
                <div className="flex items-center gap-2 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#CCFF00] text-[#CCFF00]" />
                  ))}
                </div>

                <blockquote className="text-lg text-zinc-300 mb-6">
                  "{testimonial.content}"
                </blockquote>

                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-white">{testimonial.name}</div>
                    <div className="text-sm text-zinc-400">
                      {testimonial.role} • {testimonial.company}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Social proof numbers */}
        <div className="mt-20 grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="text-center">
            <div className="text-4xl font-bold text-[#CCFF00] mb-2">98%</div>
            <div className="text-zinc-400">Satisfação</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-[#CCFF00] mb-2">2M+</div>
            <div className="text-zinc-400">Mensagens/mês</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-[#CCFF00] mb-2">300%</div>
            <div className="text-zinc-400">Mais engajamento</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-[#CCFF00] mb-2">40h</div>
            <div className="text-zinc-400">Economia/semana</div>
          </div>
        </div>
      </div>
    </div>
  );
}