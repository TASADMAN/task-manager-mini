"use client";
import React, { ReactNode, useState } from "react";
import {
  FaInstagram,
  FaYoutube,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaBolt,
} from "react-icons/fa";
import { IconType } from "react-icons/lib";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import { VariantProps } from "class-variance-authority";

type ButtonVariant = VariantProps<typeof buttonVariants>["variant"];

type ButtonProps = {
  text?: string;
  className?: string;
  variant?: ButtonVariant;
};

type NewsLetterCardBase = {
  className?: string;
  title?: { text: string | ReactNode; className?: string };
  description?: { text: string | ReactNode; className?: string };
  placeholder?: string;
  emailInputClassName?: string;
  newsLetterButton?: ButtonProps;
};

type NewsLetterCardControlledInput = NewsLetterCardBase & {
  emailText?: string;
  setEmailText?: (inputText: string) => void;
  onSumit?: (email: string) => void;
};

type NewsLetterCardUncontrolledInput = NewsLetterCardBase & {
  emailText?: never;
  setEmailText?: never;
  onSumit?: never;
};

type NewsLetterCardProp =
  | NewsLetterCardControlledInput
  | NewsLetterCardUncontrolledInput;

interface SocialLink {
  href: string;
  icon: IconType;
}

interface FooterNavigation {
  [key: string]: { label: string; href: string }[];
}

const DEFAULT_SOCIAL_LINKS: SocialLink[] = [
  { href: "#", icon: FaInstagram },
  { href: "#", icon: FaYoutube },
  { href: "#", icon: FaFacebook },
  { href: "#", icon: FaTwitter },
  { href: "#", icon: FaLinkedin },
];

const DEFAULT_FOOTER_NAVIGATION: FooterNavigation = {
  Features: [
    { label: "API", href: "#" },
    { label: "Pricing", href: "#" },
    { label: "Docs", href: "#" },
  ],
  Support: [
    { label: "Account", href: "#" },
    { label: "FAQ", href: "#" },
    { label: "Contact", href: "#" },
  ],
  Legal: [
    { label: "Privacy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookies", href: "#" },
  ],
};

interface Footer2Props {
  sectionId?: string;
  websiteName?: { text: string | ReactNode; className?: string };
  websiteDescription?: { text: string | ReactNode; className?: string };
  newsLetterCard?: NewsLetterCardProp;
  handle?: string;
  classname?: string;
  socialLinks?: SocialLink[];
  footerNavigation?: FooterNavigation;
}

// Move NewsletterSection outside the main component
function NewsletterSection({
  newsLetterCardClassName,
  newsLetterTitleText,
  newsLetterTitleClassName,
  newsLetterDescriptionText,
  newsLetterDescriptionClassName,
  placeholder,
  emailInputClassName,
  newsLetterButtonText,
  newsLetterButtonClassName,
  newsLetterButtonVariant,
  finalEmailText,
  finalSetEmailText,
  handleSubscribe,
}: {
  newsLetterCardClassName: string;
  newsLetterTitleText: string | ReactNode;
  newsLetterTitleClassName: string;
  newsLetterDescriptionText: string | ReactNode;
  newsLetterDescriptionClassName: string;
  placeholder: string;
  emailInputClassName: string;
  newsLetterButtonText: string;
  newsLetterButtonClassName: string;
  newsLetterButtonVariant: ButtonVariant;
  finalEmailText: string;
  finalSetEmailText: (value: string) => void;
  handleSubscribe: () => void;
}) {
  return (
    <div className="mx-auto max-w-[1200px] w-full px-4 ">
      <div
        className={`rounded-2xl p-10 mb-24 py-16 bg-primary ${newsLetterCardClassName}`}
      >
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
          {/* Text Section */}
          <div className="flex-1">
            <h3
              className={`text-3xl  sm:text-4xl lg:text-5xl font-semibold mb-2 ${newsLetterTitleClassName}`}
            >
              {newsLetterTitleText}
            </h3>
            <p
              className={`opacity-55 pt-6 text-sm ${newsLetterDescriptionClassName}`}
            >
              {newsLetterDescriptionText}
            </p>
          </div>

          {/* Form Section */}
          <div className="flex-shrink-0 w-full lg:w-auto ">
            <div className="flex flex-col xl:flex-row gap-2">
              <div className="flex-1 lg:w-80">
                <Input
                  type="email"
                  value={finalEmailText}
                  onChange={(e) => finalSetEmailText(e.target.value)}
                  placeholder={placeholder}
                  className={`w-full px-4 py-7 bg-white/25 rounded-full border-none placeholder-black ${emailInputClassName}`}
                />
              </div>
              <Button
                variant={newsLetterButtonVariant}
                onClick={handleSubscribe}
                className={`px-10 py-7 rounded-full ${newsLetterButtonClassName}`}
              >
                {newsLetterButtonText}
              </Button>
            </div>
            <p className="text-xs opacity-55 mt-6">
              By subscribing you agree to our Privacy Policy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Move LeftSection outside the main component
function LeftSection({
  websiteNameText,
  websiteNameClassName,
  websiteDescriptionText,
  websiteDescriptionClassName,
  socialLinks,
}: {
  websiteNameText: string | ReactNode;
  websiteNameClassName: string;
  websiteDescriptionText: string | ReactNode;
  websiteDescriptionClassName: string;
  socialLinks: SocialLink[];
}) {
  return (
    <div className="w-full lg:w-1/3 mb-8 lg:mb-0">
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-4">
          {typeof websiteNameText === "string" ? (
            <span
              className={`font-semibold text-xl sm:text-2xl ${websiteNameClassName}`}
            >
              {websiteNameText}
            </span>
          ) : (
            <>{websiteNameText}</>
          )}
        </div>
      </div>
      <p
        className={`text-muted-foreground mb-6 text-sm leading-relaxed ${websiteDescriptionClassName}`}
      >
        {websiteDescriptionText}
      </p>
      <div className="flex items-center space-x-4 text-muted-foreground">
        {socialLinks.map((link, index) => (
          <a
            key={index}
            href={link.href}
            className="hover:opacity-75 transition-opacity duration-200"
            aria-label={`Social link ${index + 1}`}
          >
            <link.icon className="h-5 w-5 sm:h-6 sm:w-6" />
          </a>
        ))}
      </div>
    </div>
  );
}

// Move RightSection outside the main component
function RightSection({
  footerNavigation,
}: {
  footerNavigation: FooterNavigation;
}) {
  return (
    <div className="w-full lg:w-2/3">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:flex lg:flex-wrap gap-8 sm:gap-12 lg:gap-20 lg:justify-end">
        {Object.entries(footerNavigation).map(([title, links]) => (
          <div key={title} className="min-w-0">
            <div className="mb-4 font-semibold text-sm text-gray-900">
              {title}
            </div>
            <ul className="space-y-3 text-muted-foreground">
              {links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="hover:underline text-sm transition-all duration-200 hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Footer2({
  sectionId = "",
  websiteName,
  websiteDescription,
  newsLetterCard,
  classname = "",
  footerNavigation = DEFAULT_FOOTER_NAVIGATION,
  socialLinks = DEFAULT_SOCIAL_LINKS,
}: Footer2Props) {
  // Website name & description
  const {
    text: websiteNameText = (
      <h3 className="flex items-center gap-2">
        <FaBolt size={20} />
        <span className="font-bold text-2xl">BoltStack.dev</span>
      </h3>
    ),
    className: websiteNameClassName = "",
  } = websiteName || {};

  const {
    text: websiteDescriptionText = "Your go-to platform for web development tools and insights.",
    className: websiteDescriptionClassName = "",
  } = websiteDescription || {};

  // Newsletter card destructuring
  const {
    className: newsLetterCardClassName = "",
    title: {
      text: newsLetterTitleText = "Subscribe to our newsletter",
      className: newsLetterTitleClassName = "",
    } = {},
    description: {
      text: newsLetterDescriptionText = "Be the first to receive updates, tips, and more.",
      className: newsLetterDescriptionClassName = "",
    } = {},
    placeholder = "Enter your email...",
    emailInputClassName = "",
    newsLetterButton: {
      text: newsLetterButtonText = "Subscribe",
      className: newsLetterButtonClassName = "",
      variant: newsLetterButtonVariant = "secondary",
    } = {},
    emailText,
    setEmailText,
    onSumit,
  } = newsLetterCard || {};

  // Local state for uncontrolled input
  const [emailInternalState, setEmailInternalState] = useState("");

  const finalEmailText =
    emailText !== undefined ? emailText : emailInternalState;
  const finalSetEmailText =
    setEmailText !== undefined ? setEmailText : setEmailInternalState;

  const handleSubscribe = () => {
    if (finalEmailText.trim()) {
      if (onSumit) {
        onSumit(finalEmailText);
      } else {
        console.log("Subscribing email:", finalEmailText);
      }
      finalSetEmailText("");
    }
  };

  return (
    <footer
      id={sectionId}
      className={`py-12 flex flex-col px-4 sm:px-8 lg:px-20 pt-20 ${classname}`}
    >
      <NewsletterSection
        newsLetterCardClassName={newsLetterCardClassName}
        newsLetterTitleText={newsLetterTitleText}
        newsLetterTitleClassName={newsLetterTitleClassName}
        newsLetterDescriptionText={newsLetterDescriptionText}
        newsLetterDescriptionClassName={newsLetterDescriptionClassName}
        placeholder={placeholder}
        emailInputClassName={emailInputClassName}
        newsLetterButtonText={newsLetterButtonText}
        newsLetterButtonClassName={newsLetterButtonClassName}
        newsLetterButtonVariant={newsLetterButtonVariant}
        finalEmailText={finalEmailText}
        finalSetEmailText={finalSetEmailText}
        handleSubscribe={handleSubscribe}
      />
      <div className="flex flex-col w-full mx-auto max-w-7xl px-4 lg:flex-row items-start justify-between gap-8 lg:gap-12">
        <LeftSection
          websiteNameText={websiteNameText}
          websiteNameClassName={websiteNameClassName}
          websiteDescriptionText={websiteDescriptionText}
          websiteDescriptionClassName={websiteDescriptionClassName}
          socialLinks={socialLinks}
        />
        <RightSection footerNavigation={footerNavigation} />
      </div>
    </footer>
  );
}
