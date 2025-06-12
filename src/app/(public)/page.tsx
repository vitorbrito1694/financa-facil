import { Star } from "lucide-react";
import React from "react";

import { Button } from "@/components/ui/button";
import { Features } from "@/components/feature-section";
import { Footer } from "@/components/footer-section";

export default function Home() {
  return (
    <>
      <section className="w-full flex justify-center bg-primary-foreground p-4 md:p-16">
        <div className="container text-center">
          <div className="mx-auto flex max-w-screen-lg flex-col gap-6">
            <h1 className="text-3xl font-extrabold lg:text-6xl">
              Gerencie Seu Dinheiro com Precisao e Tranquilidade
            </h1>
            <p className="text-balance text-muted-foreground lg:text-lg">
              “Uma jornada de mil quilômetros precisa começar com um simples
              passo.” Lao Tzu
            </p>
          </div>
          <Button asChild size="lg" className="mt-10">
            <a href={"#funcionalidades"}>Descobrir Funcionalidades</a>
          </Button>
          <div className="mx-auto mt-10 flex w-fit flex-col items-center gap-4 sm:flex-row">
            <div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    className="size-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-left font-medium text-muted-foreground">
                from 200+ reviews
              </p>
            </div>
          </div>
        </div>
      </section>
      <Features />
      <Footer />
    </>
  );
}
