"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Home, ArrowLeft, Sparkles, Cloud, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-1/4 h-64 w-64 animate-pulse rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute right-1/4 bottom-1/4 h-64 w-64 animate-pulse rounded-full bg-primary/10 blur-3xl animation-delay-2000" />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <Cloud className="absolute left-[10%] top-[20%] h-12 w-12 animate-float text-muted-foreground/20" />
        <Star className="absolute right-[15%] top-[30%] h-8 w-8 animate-float text-primary/30 animation-delay-1000" />
        <Sparkles className="absolute left-[20%] bottom-[30%] h-10 w-10 animate-float text-primary/20 animation-delay-2000" />
        <Cloud className="absolute right-[10%] bottom-[25%] h-16 w-16 animate-float text-muted-foreground/20 animation-delay-3000" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-2xl space-y-8 px-4 text-center">
        {/* 404 Number */}
        <div className="space-y-4">
          <div className="relative inline-block">
            <h1 className="bg-gradient-to-br from-primary via-primary/80 to-primary/60 bg-clip-text text-9xl font-bold text-transparent md:text-[12rem]">
              404
            </h1>
            <div className="absolute inset-0 -z-10 blur-2xl">
              <h1 className="bg-gradient-to-br from-primary/50 to-primary/30 bg-clip-text text-9xl font-bold text-transparent md:text-[12rem]">
                404
              </h1>
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Lost in Space
            </h2>
            <p className="text-lg text-muted-foreground md:text-xl">
              The page you're looking for has drifted away into the void.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button
            size="lg"
            onClick={() => router.back()}
            variant="outline"
            className="group"
          >
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Go Back
          </Button>
          <Button size="lg" asChild className="group">
            <Link href="/">
              <Home className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
