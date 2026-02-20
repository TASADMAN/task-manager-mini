import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import React, { ReactNode } from "react";
import { type VariantProps } from "class-variance-authority";
import { MdElectricBolt } from "react-icons/md";
import { FaChrome } from "react-icons/fa";

interface HeroSectionProps {
  loading?: boolean;
  login?: () => void;
  className?: string;
  mainHeading?: { text: string | ReactNode; className?: string };
  subHeading?: { text: string; className?: string };
  badgeFeature?: { text: string; className?: string; icon?: ReactNode };
  primaryButton?: {
    text?: string;
    variant?: VariantProps<typeof buttonVariants>["variant"];
    className?: string;
    onClick?: () => void;
  };
  secondaryButton?: {
    isVisible?: boolean;
    text?: string;
    className?: string;
    variant?: VariantProps<typeof buttonVariants>["variant"];
    onClick?: () => void;
  };
  imagePlaceholder?: {
    alt?: string;
    src?: string;
    className?: string;
  };
}

// --- HeroSection2 Component ---

const HeroSection6: React.FC<HeroSectionProps> = ({
  badgeFeature,
  mainHeading,
  subHeading,
  primaryButton,
  secondaryButton,
  imagePlaceholder,
  className,
  login,
  loading,
}) => {
  // Destructure and provide defaults for nested objects
  const {
    text: badgeFeatureText = "Work Smarter",
    className: badgeFeatureClassName = "",
    icon: badgeFeatureIcon = <MdElectricBolt size={15} />,
  } = badgeFeature || {};

  const {
    text: mainHeadingText = "Focus on what matters conquer every task",
    className: mainHeadingClassName = "",
  } = mainHeading || {};

  const {
    text: subHeadingText = "Organize your day by task difficulty. Track your progress from start to finish and hit Done with confidence.",
    className: subHeadingClassName = "",
  } = subHeading || {};

  const finalClassName = className || "";

  const {
    text: primaryBtnText = "Book a Demo",
    onClick: onPrimaryClick = () => {},
    variant: primaryBtnVariant = "default",
    className: primaryBtnClassName = "",
  } = primaryButton || {};

  const {
    isVisible: isSecondaryButtonVisible = true,
    text: secondaryBtnText = "Watch Video",
    onClick: onSecondaryClick = () => {},
    variant: secondaryBtnVariant = "outline",
    className: secondaryBtnClassName = "",
  } = secondaryButton || {};

  const {
    alt: imageAlt = "Product Dashboard Preview",
    className: imageClassName = "",
    src: srcImage,
  } = imagePlaceholder || {};

  return (
    <div
      className={`relative rounded-b-3xl w-full h-[1050px] max-lg:h-[800px] max-sm:h-[740px]   ${finalClassName}`}
      style={{
        background:
          "radial-gradient(125% 125% at 50% 10%, hsl(var(--background)) 40%, hsl(var(--primary)) 100%)",
      }}
    >
      <div className="absolute h-full w-full opacity-50 dark:opacity-10 bg-[radial-gradient(#e5f7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

      <div className="relative z-10 container mx-auto px-4 py-16 lg:py-24">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          {/* Badge */}
          <Badge
            className={`py-2 px-4 ${badgeFeatureClassName}`}
            variant={"outline"}
          >
            <div className="mr-2">{badgeFeatureIcon}</div>
            {badgeFeatureText}
          </Badge>

          {/* Main heading */}
          {typeof mainHeadingText === "string" ? (
            <h1
              className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 leading-tight max-w-5xl mx-auto ${mainHeadingClassName}`}
            >
              {mainHeadingText}
            </h1>
          ) : (
            <>{mainHeadingText}</>
          )}
          {/* Subtitle */}
          <p
            className={`opacity-70 text-lg md:text-xl max-w-3xl mx-auto mb-8 leading-relaxed ${subHeadingClassName}`}
          >
            {subHeadingText}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 lg:mb-16">
            <Button
              onClick={login}
              disabled={loading}
              className={`h-12 px-8 rounded-lg min-w-[140px] ${primaryBtnClassName}`}
              variant={primaryBtnVariant}
            >
              {loading ? (
                <>
                  <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Signing in...
                </>
              ) : (
                <>
                  <FaChrome className="mr-2 h-5 w-5" />
                  Continue with Google
                </>
              )}
            </Button>
            {/* {isSecondaryButtonVisible && (
              <Button
                onClick={onSecondaryClick}
                variant={secondaryBtnVariant}
                className={`h-12 px-8 rounded-lg min-w-[140px] ${secondaryBtnClassName}`}
              >
                {secondaryBtnText}
              </Button>
            )} */}
          </div>
        </div>
      </div>

      {/* Image Section with Glossy Border - Positioned Absolutely */}
      <div className="absolute  left-1/2 transform -translate-x-1/2 bottom-[-50px] w-full max-w-5xl px-4">
        {/* Additional glow effect */}
        <div className="absolute inset-0 -z-10 blur-3xl opacity-20 bg-primary rounded-3xl scale-105 transform translate-y-2"></div>

        {/* Glossy wide border container */}
        <div className="relative p-3 rounded-3xl bg-gradient-to-br from-white/30 via-white/20 to-white/10 backdrop-blur-sm border border-white/30 shadow-2xl">
          {/* Inner glossy border */}
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-white/20 to-white/5 border border-white/20">
            {/* Image or placeholder */}
            {srcImage ? (
              <img
                src={srcImage}
                alt={imageAlt}
                className={`w-full h-full object-cover rounded-2xl ${imageClassName}`}
              />
            ) : (
              <div
                className={`relative w-full aspect-video bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-2xl flex items-center justify-center ${imageClassName}`}
              >
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-300 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-gray-500 dark:text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 font-medium">
                    {imageAlt}
                  </p>
                </div>
              </div>
            )}

            <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-transparent via-white/10 to-white/20 pointer-events-none"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection6;
