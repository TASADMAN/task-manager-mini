"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Chrome } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/contexts/auth-context";

import { toast } from "sonner";
import { RippleLoading } from "@/components/ui/loading";
import HeroSection6 from "@/components/HeroSection";
import FeatureSection5 from "@/components/Feature";
import Testimonials5 from "@/components/Testimonial";
import Footer2 from "@/components/footer";

export default function LoginPage() {
  const { signInWithGoogle, user, loading } = useAuth(); // ← เพิ่ม loading
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  if (loading) {
    return <RippleLoading message="Checking authentication..." />;
  }

  if (user) {
    return <RippleLoading message="Redirecting..." />;
  }

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      await signInWithGoogle();
    } catch (error) {
      toast.error("Failed to sign in");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className=" min-h-screen items-center justify-center bg-background p-4">
      <HeroSection6 login={handleGoogleSignIn} loading={isLoading} />
      <div className="mt-20">
        <FeatureSection5 login={handleGoogleSignIn} loading={isLoading} />
      </div>
      <Testimonials5 />
      <Footer2 />
    </div>
  );
}
