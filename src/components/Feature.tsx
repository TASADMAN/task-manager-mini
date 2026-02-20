"use client";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Clock, Shield } from "lucide-react";
import { MdBolt } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { motion, useInView, Variants } from "framer-motion";

// 1. Move outside to prevent recreation on every render
const MotionBadge = motion(Badge);
const MotionButton = motion(Button);

const badgeVariant: Variants = {
  initial: {
    opacity: 0,
    scale: 0.2,
    y: -50,
  },
  animate: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4 },
  }),
};

const titleVariant: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { delay: 0.3, duration: 0.3 },
  },
};

const descriptionVariant: Variants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: {
    opacity: 0.6, // Matches your original opacity-60
    scale: 1,
    transition: { delay: 0.5, duration: 0.3 },
  },
};

const buttonVariant: Variants = {
  initial: { opacity: 0, scale: 0.5 },
  animate: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i },
  }),
};

const cardsFeatureContainer: Variants = {
  initial: {
    opacity: 0,
    y: -20,
  },
  animate: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i, // Starts after text finishes, then staggers
      duration: 0.4,
    },
  }),
};

const cardVariant: Variants = {
  initial: {
    opacity: 0,
    scale: 0.9,
    y: 20,
  },
  animate: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      delay: 0.9 + i * 0.1, // Starts after text finishes, then staggers
      duration: 0.7,
    },
  }),
};

export interface FeatureSection5Props {
  sectionId?: string;
  featureBadge?: { text?: string; className?: string; icon?: ReactNode };
  title?: { text?: string | ReactNode; className?: string };
  description?: { text?: string; className?: string };
  featuresArray?: FeatureSection5Card[];
  className?: string;
  truncateLimit?: number;
  listFeaturesPosition?: ListFeaturesPosition;
  login: () => void;
  loading: boolean;
}

export interface FeatureSection5Card {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  iconBgColor?: string;
  cardClassName?: string;
}

type ListFeaturesPosition = "left" | "right";

const featuresData: FeatureSection5Card[] = [
  {
    id: 1,
    title: "Smart Difficulty Grading",
    description:
      "Gauge the effort required for every task. Categorize by complexity to manage your energy and focus on what truly matters.",
    icon: <Shield className="size-6 text-white" />,
    iconBgColor: "bg-gray-800",
    cardClassName: "",
  },
  {
    id: 2,
    title: "Momentum Tracking",
    description:
      "Build a streak of finished tasks. High-difficulty completions grant more satisfaction and keep your productivity at its peak.",
    icon: <MdBolt className="size-6 text-white" />,
    iconBgColor: "bg-gray-800",
  },
  {
    id: 3,
    title: "Seamless Status Flow",
    description:
      "Effortlessly transition from 'Pending' to 'Done'. Monitor your progress across time and never let a deadline slip away.",
    icon: <Clock className="size-6 text-white" />,
    iconBgColor: "bg-gray-800",
  },
  {
    id: 4,
    title: "Goal-Oriented Planning",
    description:
      "Tailored workflow designed for your unique pace. Set your own difficulty benchmarks and achieve your personal milestones.",
    icon: <Users className="size-6 text-white" />,
    iconBgColor: "bg-gray-800",
  },
];

function FeatureSection5({
  sectionId = "",
  featureBadge,
  title,
  description,
  featuresArray = featuresData,
  className = "",
  listFeaturesPosition = "left",
  login,
  loading,
}: FeatureSection5Props) {
  const ref = useRef(null);
  // once: true ensures it doesn't animate out when you scroll past it
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const {
    text: badgeText = "Powerful Productivity",
    className: badgeClassName = "",
    icon: featureBadgeIcon = <MdBolt size={16} />,
  } = featureBadge || {};

  const {
    text: titleText = (
      <h1 className={`text-4xl lg:text-5xl font-bold leading-tight`}>
        Empower your day with smart tasks
        <span className="text-primary"> and priority flow.</span>
      </h1>
    ),
    className: titleClassName = "",
  } = title || {};

  const {
    text: descriptionText = "Stop guessing what to do next. Assign difficulty levels to your tasks, track your energy, and turn every To-Do  into a Done with total clarity.",
    className: descriptionClassName = "",
  } = description || {};

  const [listFeaturesPositionState, setListFeaturePositionState] =
    useState<ListFeaturesPosition>(listFeaturesPosition);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setListFeaturePositionState(listFeaturesPosition);
      } else {
        setListFeaturePositionState("left");
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [listFeaturesPosition]);

  const FeatureCardsGrid = () => (
    <motion.div
      variants={cardsFeatureContainer}
      initial="initial" // Added: starts the animation
      animate="animate" // Added: triggers the animation
      custom={0.6}
      className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-lg:pt-7"
    >
      {featuresArray.slice(0, 4).map((feature, index) => (
        <FeatureCard key={feature.id} {...feature} index={index} />
      ))}
    </motion.div>
  );

  const TextSection = () => (
    <div className="flex flex-col justify-between h-full">
      <div>
        <div className="max-w-4xl flex justify-start mx-auto mb-7">
          <MotionBadge
            variants={badgeVariant}
            initial="initial" // Added: starts the animation
            animate="animate" // Added: triggers the animation
            custom={0.1}
            variant="outline"
            className={`mb-4 p-2 flex items-center gap-1 text-[13px] font-medium border-primary/20 text-primary bg-primary/5 ${badgeClassName}`}
          >
            {featureBadgeIcon}
            {badgeText}
          </MotionBadge>
        </div>

        {typeof titleText === "string" ? (
          <motion.h2
            variants={titleVariant}
            initial="initial"
            animate="animate"
            custom={0.2}
            className={`text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl ${titleClassName}`}
          >
            {titleText}
          </motion.h2>
        ) : (
          <motion.div
            variants={titleVariant}
            initial="initial"
            animate="animate"
          >
            {titleText}
          </motion.div>
        )}

        <motion.p
          custom={0.34}
          variants={descriptionVariant}
          initial="initial"
          animate="animate"
          className={`text-lg pt-9 leading-relaxed ${descriptionClassName}`}
        >
          {descriptionText}
        </motion.p>
      </div>

      <MotionButton
        initial="initial"
        animate="animate"
        custom={0.55}
        variants={buttonVariant}
        onClick={login}
        disabled={loading}
        className="bg-primary w-fit max-lg:mt-10 p-6 rounded-md hover:bg-primary/90 transition-colors font-medium"
      >
        Create your first tasks!
      </MotionButton>
    </div>
  );

  return (
    <section ref={ref} id={sectionId} className={`py-16 ${className} px-4`}>
      <motion.div
        animate={isInView ? "animate" : "initial"}
        className="max-w-7xl mx-auto px-4 sm:px-6"
      >
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {listFeaturesPositionState === "left" ? (
            <>
              <TextSection />
              <FeatureCardsGrid />
            </>
          ) : (
            <>
              <FeatureCardsGrid />
              <TextSection />
            </>
          )}
        </div>
      </motion.div>
    </section>
  );
}

function FeatureCard({
  title,
  description,
  icon,
  iconBgColor = "",
  cardClassName = "",
  index,
}: FeatureSection5Card & { index: number }) {
  return (
    <motion.div
      variants={cardVariant}
      initial="initial"
      animate="animate"
      custom={index}
    >
      <Card
        className={`shadow-none transition-shadow p-6 h-full ${cardClassName}`}
      >
        <CardContent className="p-0">
          <div className="space-y-4">
            <div
              className={`w-12 h-12 bg-primary rounded-lg flex items-center justify-center ${iconBgColor}`}
            >
              {icon}
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">{title}</h3>
              <p className="opacity-60 text-sm leading-relaxed">
                {description}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default FeatureSection5;
