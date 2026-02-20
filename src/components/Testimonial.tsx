"use client";

import React, { ReactNode, useEffect, useRef, useState } from "react";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity as useFramerVelocity,
} from "framer-motion";

// --- INFINITE SLIDER COMPONENT ---
interface InfiniteSliderProps {
  children: React.ReactNode;
  velocitySpeed?: number;
  direction?: "left" | "right";
  useVelocity?: boolean;
  className?: string;
}

// --- TESTIMONIAL CARD COMPONENT ---
interface TestimonialCardProps {
  name: string;
  role: string;
  handle?: string;
  content: string;
  time?: string;
  date?: string;
  avatar: string;
  className?: string;
}

const TestimonialCard = ({
  name,
  role,
  handle,
  content,
  time,
  date,
  avatar,
  className,
}: TestimonialCardProps) => (
  <Card
    className={cn(
      "mx-4 w-[400px] flex-shrink-0 rounded-3xl p-6 shadow-sm border border-gray-00 dark:border-gray-800 select-none",
      className,
    )}
  >
    <div className="flex items-center gap-3 mb-4">
      <img
        src={avatar}
        alt={name}
        className="h-12 w-12 rounded-full object-cover border border-gray-100 dark:border-gray-800"
      />
      <div className="flex flex-col">
        <h4 className="text-[15px] font-bold leading-tight">{name}</h4>
        <p className="text-[13px] text-gray-500">
          {role}
          {handle && (
            <span className="text-primary font-medium ml-1">{handle}</span>
          )}
        </p>
      </div>
    </div>

    <p className="text-[14px] leading-relaxed text-gray-700 dark:text-gray-300 mb-4">
      {content}
    </p>

    {(time || date) && (
      <div className="text-[12px] text-gray-400 font-medium">
        {time && <span>{time}</span>}
        {time && date && <span className="mx-1">•</span>}
        {date && <span>{date}</span>}
      </div>
    )}
  </Card>
);

const DEFAULT_TESTIMONIALS: TestimonialCardProps[] = [
  {
    name: "Sarah Jonas",
    role: "Freelance Designer",
    handle: "@sarah_design",
    content:
      "The difficulty grading is a game changer. I finally know which tasks to tackle when my energy is high and which ones to save for later.",
    time: "10:30 AM",
    date: "Jan 12, 2026",
    avatar: "https://i.pravatar.cc/150?u=sarah",
  },
  {
    name: "Michael Chen",
    role: "Software Engineer",
    content:
      "Simple, fast, and effective. Marking a 'Heavy Lifting' task as Done gives me such a huge dopamine hit!",
    time: "11:20 AM",
    date: "Jan 15, 2026",
    avatar: "https://i.pravatar.cc/150?u=michael",
  },
  {
    name: "Elena Rodriguez",
    role: "Marketing Manager",
    handle: "@elena_growth",
    content:
      "I’ve tried every to-do app out there, but this is the only one that helps me balance my daily effort without feeling overwhelmed.",
    date: "Jan 20, 2026",
    avatar: "https://i.pravatar.cc/150?u=elena",
  },
  {
    name: "David Park",
    role: "Startup Founder",
    handle: "@dpark_live",
    content:
      "Clean UI and zero friction. It turns my chaotic brain into a clear, prioritized roadmap every single morning.",
    time: "08:15 AM",
    date: "Feb 02, 2026",
    avatar: "https://i.pravatar.cc/150?u=david",
  },
  {
    name: "Sophia Williams",
    role: "Student",
    content:
      "The 'Piece of Cake' tasks help me get started when I'm procrastinating. Before I know it, my whole list is Done.",
    time: "04:30 PM",
    date: "Feb 10, 2026",
    avatar: "https://i.pravatar.cc/150?u=sophia",
  },
  {
    name: "James Wilson",
    role: "Content Creator",
    handle: "@j_wilson_vlog",
    content:
      "Visualizing task complexity has saved me from burnout. I can finally plan my week based on real effort, not just deadlines.",
    time: "01:05 PM",
    date: "Feb 12, 2026",
    avatar: "https://i.pravatar.cc/150?u=james",
  },
  {
    name: "Olivia Thompson",
    role: "Project Lead",
    content:
      "Managing a team's workload is so much easier when you can see the difficulty of each task. Our productivity has soared!",
    time: "10:00 AM",
    date: "Feb 14, 2026",
    avatar: "https://i.pravatar.cc/150?u=olivia",
  },
  {
    name: "Liam O'Brien",
    role: "UX Researcher",
    handle: "@liam_ux",
    content:
      "The flow from Pending to Done is incredibly satisfying. The most intuitive task manager I've ever used.",
    date: "Feb 16, 2026",
    avatar: "https://i.pravatar.cc/150?u=liam",
  },
];

export default function Testimonials5({
  testimonials = DEFAULT_TESTIMONIALS,
  sectionId = "",
  testimonialBadge,
  title,
  description,
  velocitySpeed = 0.4,
}: {
  sectionId?: string;
  testimonialBadge?: { text?: string; className?: string };
  title?: { text?: string | ReactNode; className?: string };
  description?: { text?: string; className?: string };
  testimonials?: TestimonialCardProps[];
  velocitySpeed?: number;
}) {
  const activeTestimonials = testimonials.slice(0, 12);
  const count = activeTestimonials.length;

  // Logic for 3-row distribution
  let firstRow: TestimonialCardProps[] = [];
  let secondRow: TestimonialCardProps[] = [];
  let thirdRow: TestimonialCardProps[] = [];

  if (count < 4) {
    firstRow = activeTestimonials;
  } else if (count <= 8) {
    const split = Math.ceil(count / 2);
    firstRow = activeTestimonials.slice(0, split);
    secondRow = activeTestimonials.slice(split);
  } else {
    // 3 rows distribution
    const perRow = Math.ceil(count / 3);
    firstRow = activeTestimonials.slice(0, perRow);
    secondRow = activeTestimonials.slice(perRow, perRow * 2);
    thirdRow = activeTestimonials.slice(perRow * 2);
  }

  const { text: badgeText = "Wall of Love", className: badgeClassName = "" } =
    testimonialBadge || {};
  const {
    text: titleText = "Loved by productive people",
    className: titleClassName = "",
  } = title || {};
  const {
    text: descriptionText = "Join thousands of users who are conquering their tasks with clarity.",
    className: descriptionClassName = "",
  } = description || {};

  return (
    <section id={sectionId} className="py-20 space-y-12 bg-transparent">
      {/* Header */}
      {/* Header with Motion Animations */}
      <div className="text-center mb-7">
        {/* Badge Animation */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={`flex justify-center gap-4 mb-6  `}
        >
          <div
            className={`bg-primary/10 rounded-full w-fit justify-start p-[6px]  items-start flex ${badgeClassName}`}
          >
            <span
              className={cn(
                "ml-3 mr-3 text-primary font-semibold    tracking-wider",
              )}
            >
              {badgeText}
            </span>
          </div>
        </motion.div>

        {/* Title Animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
        >
          {typeof titleText === "string" ? (
            <h2
              className={cn(
                "text-[43px] z-50 font-bold max-sm:text-[27px] mx-auto max-lg:w-full   w-[800px] leading-tight text-gray-900 dark:text-white",
                titleClassName,
              )}
            >
              {titleText}
            </h2>
          ) : (
            <>{titleText}</>
          )}
        </motion.div>

        {/* Description Animation */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          className={cn(
            "pt-4 text-gray-500 dark:text-gray-400 px-10 mx-auto w-[800px] max-lg:w-full leading-relaxed",
            descriptionClassName,
          )}
        >
          {descriptionText}
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: -60, scale: 0.8, x: 50 }}
        whileInView={{ opacity: 1, y: 0, scale: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="space-y-8"
      >
        {firstRow.length > 0 && (
          <InfiniteSlider direction="left" velocitySpeed={velocitySpeed}>
            {firstRow.map((t, i) => (
              <TestimonialCard key={`row1-${i}`} {...t} />
            ))}
          </InfiniteSlider>
        )}

        {secondRow.length > 0 && (
          <InfiniteSlider direction="right" velocitySpeed={velocitySpeed}>
            {secondRow.map((t, i) => (
              <TestimonialCard key={`row2-${i}`} {...t} />
            ))}
          </InfiniteSlider>
        )}

        {/* {thirdRow.length > 0 && (
          <InfiniteSlider direction="left" velocitySpeed={velocitySpeed}>
            {thirdRow.map((t, i) => (
              <TestimonialCard key={`row3-${i}`} {...t} />
            ))}
          </InfiniteSlider>
        )} */}
      </motion.div>
    </section>
  );
}

const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

export function InfiniteSlider({
  children,
  velocitySpeed = 2,
  direction = "left",
  useVelocity = true,
  className = "",
}: InfiniteSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const blockRef = useRef<HTMLDivElement>(null);
  const [numCopies, setNumCopies] = useState(2);

  const baseX = useMotionValue(0);
  const unitWidth = useMotionValue(0);

  const { scrollY } = useScroll();
  const scrollVelocity = useFramerVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });

  const velocityFactor = useTransform(smoothVelocity, (v) => {
    if (!useVelocity) return 0;
    return Math.min(5, (Math.abs(v) / 1000) * 5);
  });

  useEffect(() => {
    const updateSizes = () => {
      if (!containerRef.current || !blockRef.current) return;
      const cw = containerRef.current.offsetWidth;
      const bw = blockRef.current.scrollWidth;
      unitWidth.set(bw);
      const nextCopies = bw > 0 ? Math.ceil(cw / bw) + 2 : 2;
      setNumCopies(nextCopies);
    };

    updateSizes();
    window.addEventListener("resize", updateSizes);
    return () => window.removeEventListener("resize", updateSizes);
  }, [children]);

  const x = useTransform([baseX, unitWidth], ([v, bw]) => {
    const width = Number(bw) || 1;
    return `${-wrap(0, width, Number(v))}px`;
  });

  useAnimationFrame((_, delta) => {
    const bw = unitWidth.get();
    if (bw <= 0) return;
    const dt = delta / 1000;
    const speedMultiplier = 1 + velocityFactor.get();
    const directionMultiplier = direction === "left" ? 1 : -1;
    const moveBy =
      directionMultiplier * velocitySpeed * 50 * speedMultiplier * dt;
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div
      className={`relative w-full overflow-hidden  ${className}`}
      ref={containerRef}
      style={{
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
        maskImage:
          "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
      }}
    >
      <motion.div className="flex w-max  items-center" style={{ x }}>
        {Array.from({ length: numCopies }).map((_, i) => (
          <div
            key={i}
            ref={i === 0 ? blockRef : null}
            className="flex shrink-0 items-start"
          >
            {children}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
