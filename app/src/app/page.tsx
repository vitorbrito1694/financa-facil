import React from 'react';

import { Button } from '@/components/ui/button';
import { Features } from '@/features/home/feature-section';
import { Footer } from '@/features/home/footer-section';

export default function Home() {
  return (
    <>
      <section className="w-full flex justify-center">
        <div className="container text-center">
          <div className="mx-auto flex max-w-screen-lg flex-col gap-6">
            <h1 className="text-3xl font-extrabold lg:text-6xl">Gerencie Seu Dinheiro com Precisao e Tranquilidade</h1>
            <p className="text-balance text-muted-foreground lg:text-lg">
              “Uma jornada de mil quilômetros precisa começar com um simples passo.” Lao Tzu
            </p>
          </div>
          <Button asChild size="lg" className="mt-10">
            <a href={'#funcionalidades'}>Descobrir Funcionalidades</a>
          </Button>
        </div>
      </section>
      <Features />
      <Footer />
    </>
  );
}
