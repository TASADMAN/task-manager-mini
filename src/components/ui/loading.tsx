import { Check, Loader2 } from "lucide-react";
import { Ripple } from "@/components/ui/ripple";
import { cn } from "@/lib/utils";
import { MdElectricBolt } from "react-icons/md";

interface RippleLoadingProps {
  //   variant?: "default";
  message?: string;
}

export function RippleLoading({ message = "Loading..." }: RippleLoadingProps) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background">
      <Ripple />

      <div className="relative z-10 flex flex-col items-center space-y-6">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary shadow-lg">
          {/* <Check className="h-10 w-10 text-primary-foreground" /> */}
          <MdElectricBolt className="h-10 w-10 text-primary-foreground" />
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold">
            <span className="font-bold">Manager</span>{" "}
            <span className="font-light">Tasks</span>
          </h2>
          <p className="mt-2 text-sm text-muted-foreground animate-pulse">
            {message}
          </p>
        </div>
      </div>
    </div>
  );

  return null;
}
