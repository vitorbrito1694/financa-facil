'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Footer } from '@/features/home/footer-section';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Check, Shield, TrendingUp, Zap, BarChart3, Smartphone, ArrowRight } from 'lucide-react';
import Image from 'next/image';

const glassCardClass =
  'bg-white/10 dark:bg-black/10 backdrop-blur-lg border border-white/20 dark:border-white/10 shadow-lg rounded-2xl p-6 md:p-8 hover:transform hover:scale-[1.02] transition-all duration-300';

const features = [
  {
    title: 'Controle Total',
    description: 'Monitore suas receitas e despesas em tempo real com dashboards intuitivos e detalhados.',
    icon: <LayoutDashboardIcon className="w-8 h-8 text-blue-600" />,
  },
  {
    title: 'Relatórios Inteligentes',
    description: 'Visualize tendências e entenda para onde seu dinheiro está indo com gráficos claros.',
    icon: <BarChart3 className="w-8 h-8 text-purple-600" />,
  },
  {
    title: 'Segurança de Dados',
    description: 'Suas informações são criptografadas e protegidas com os mais altos padrões de segurança.',
    icon: <Shield className="w-8 h-8 text-green-600" />,
  },
  {
    title: 'Planejamento Futuro',
    description: 'Defina metas de economia e acompanhe seu progresso para realizar seus sonhos.',
    icon: <TrendingUp className="w-8 h-8 text-orange-600" />,
  },
  {
    title: 'Sincronização',
    description: 'Acesse seus dados em qualquer dispositivo, seja no computador, tablet ou celular.',
    icon: <Smartphone className="w-8 h-8 text-indigo-600" />,
  },
  {
    title: 'Facilidade de Uso',
    description: 'Interface limpa e amigável, projetada para você focar no que realmente importa.',
    icon: <Zap className="w-8 h-8 text-yellow-500" />,
  },
];

const pricingPlans = [
  {
    name: 'Essencial',
    price: 'Grátis',
    description: 'Para quem está começando a organizar as finanças.',
    features: ['Controle de Receitas e Despesas', 'Relatórios Básicos', 'Acesso Mobile', '1 Carteira'],
    cta: 'Começar Agora',
    highlight: false,
  },
  {
    name: 'Pro',
    price: 'R$ 19,90',
    period: '/mês',
    description: 'Recursos avançados para quem quer ir além.',
    features: [
      'Tudo do Essencial',
      'Relatórios Avançados & Exportação',
      'Carteiras Ilimitadas',
      'Planejamento de Metas',
      'Suporte Prioritário',
    ],
    cta: 'Assinar Pro',
    highlight: true,
  },
];

function LayoutDashboardIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="7" height="9" x="3" y="3" rx="1" />
      <rect width="7" height="5" x="14" y="3" rx="1" />
      <rect width="7" height="9" x="14" y="12" rx="1" />
      <rect width="7" height="5" x="3" y="16" rx="1" />
    </svg>
  );
}

export default function Home() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <main className="flex flex-col min-h-screen relative overflow-hidden selection:bg-primary selection:text-primary-foreground">
      {/* Section 1: Hero (Preserved Pattern but refined) */}
      <section className="w-full flex justify-center py-24 lg:py-32 relative z-10 bg-background/50 backdrop-blur-sm border-b border-border/40">
        <div className="container text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="mx-auto flex max-w-screen-lg flex-col gap-8"
          >
            <div className="inline-flex items-center justify-center px-4 py-1.5 mx-auto rounded-full border border-primary/20 bg-primary/10 text-primary text-sm font-medium mb-4">
              <span className="flex items-center gap-1">
                <Zap className="w-3 h-3" /> Nova Versão 2.0 Disponível
              </span>
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-black dark:via-gray-200 dark:to-gray-400">
              Gerencie Seu Dinheiro com <br className="hidden md:block" /> Precisão e Tranquilidade
            </h1>

            <p className="text-balance text-muted-foreground text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed">
              “Uma jornada de mil quilômetros precisa começar com um simples passo.” – Lao Tzu
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              asChild
              size="lg"
              className="h-12 px-8 text-base shadow-lg shadow-primary/25 rounded-full hover:scale-105 transition-transform"
            >
              <a href={'#funcionalidades'}>
                Descobrir Funcionalidades
                <ArrowRight className="ml-2 w-4 h-4" />
              </a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="h-12 px-8 text-base rounded-full hover:bg-secondary/50 backdrop-blur-sm"
            >
              <a href="#">Ver Demonstração</a>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Section 2: Features (Glassmorphism) */}
      <section id="funcionalidades" className="w-full flex justify-center py-24 md:py-32 relative z-10">
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 md:mb-24"
          >
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl mb-6">
              Recursos Poderosos
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto">
              Tudo o que você precisa para alcançar sua liberdade financeira em uma única plataforma.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className={glassCardClass}
              >
                <div className="bg-primary/5 w-14 h-14 rounded-2xl flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Impact/Parallax Section */}
      <section className="relative w-full min-h-[70vh] flex items-center justify-center overflow-hidden py-24">
        <div className="absolute inset-0 z-0 select-none">
          <Image
            src="/images/wellbeing.png"
            alt="Financial Wellbeing"
            fill
            className="object-cover object-center"
            unoptimized={true}
            // quality={100}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
          <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />
        </div>

        <div className="container relative z-10 px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-block mb-6 p-2 px-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-medium">
              Bem-estar Financeiro
            </div>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 tracking-tight drop-shadow-lg">
              Transforme sua relação com o dinheiro
            </h2>
            <p className="text-xl text-white/90 leading-relaxed mb-10 max-w-2xl mx-auto drop-shadow-md">
              Alcance a paz de espírito sabendo exatamente para onde seu dinheiro vai e vendo seu patrimônio crescer dia
              após dia.
            </p>
            <Button
              size="lg"
              className="h-14 px-10 rounded-full text-lg shadow-2xl hover:scale-105 transition-transform bg-white text-black hover:bg-white/90"
            >
              Começar sua Jornada
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Section 4: Pricing */}
      <section id="planos" className="w-full flex justify-center py-24 md:py-32 relative z-10">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl mb-6">Planos Transparentes</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Escolha o plano ideal para o seu momento financeiro. Comece grátis.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className={`${
                  plan.highlight
                    ? 'bg-white dark:bg-slate-800/90 backdrop-blur-xl border-2 border-primary shadow-2xl shadow-primary/20 scale-105 z-10 rounded-2xl p-6 md:p-8'
                    : glassCardClass
                } flex flex-col`}
              >
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-1 mb-4">
                    <span className="text-4xl font-extrabold">{plan.price}</span>
                    {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
                  </div>
                  <p className="text-muted-foreground">{plan.description}</p>
                </div>

                <ul className="space-y-4 mb-8 flex-1">
                  {plan.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="mt-1 bg-green-100 dark:bg-green-900/30 rounded-full p-1">
                        <Check className="w-3 h-3 text-green-600 dark:text-green-400" />
                      </div>
                      <span className="text-sm font-medium">{feat}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full h-12 rounded-xl text-base ${
                    plan.highlight
                      ? 'shadow-lg shadow-primary/20'
                      : 'variant-outline bg-transparent border-2 border-primary/20 hover:bg-primary/5 text-foreground'
                  }`}
                  variant={plan.highlight ? 'default' : 'outline'}
                >
                  {plan.cta}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: CTA Final */}
      <section className="w-full flex justify-center py-24 relative z-10 bg-background/50">
        <div className="container px-4">
          <div className="rounded-[2.5rem] bg-gradient-to-r from-primary to-blue-600 p-8 md:p-16 text-center text-white shadow-2xl overflow-hidden relative">
            {/* Abstract bubbles for visual interest */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-black/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

            <div className="relative z-10 max-w-3xl mx-auto space-y-8">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Pronto para assumir o controle?</h2>
              <p className="text-blue-100 text-lg md:text-xl">
                Junte-se a milhares de pessoas que já transformaram sua vida financeira com o Finança Fácil.
              </p>
              <Button
                size="lg"
                variant="secondary"
                className="h-14 px-10 rounded-full text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all text-foreground font-bold"
              >
                Criar Conta Gratuita
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
