'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AnimatedWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  direction?: 'left' | 'right' | 'up' | 'down';
  type?: 'fadeIn' | 'slideIn' | 'scaleIn';
  once?: boolean;
  animateOnLoad?: boolean;
}

const AnimatedWrapper = React.forwardRef<HTMLDivElement, AnimatedWrapperProps>(
  (
    {
      children,
      delay = 0,
      duration = 0.5,
      direction = 'up',
      type = 'slideIn',
      once = true,
      animateOnLoad = true,
      className,
      ...props
    },
    ref
  ) => {
    const getAnimationVariant = () => {
      switch (type) {
        case 'fadeIn':
          return {
            hidden: { opacity: 0 },
            visible: {
              opacity: 1
            },
          };
        case 'scaleIn':
          return {
            hidden: { scale: 0.8, opacity: 0 },
            visible: {
              scale: 1,
              opacity: 1
            },
          };
        case 'slideIn':
        default:
          const translateMap = {
            left: { x: -50, opacity: 0 },
            right: { x: 50, opacity: 0 },
            up: { y: 50, opacity: 0 },
            down: { y: -50, opacity: 0 },
          };

          return {
            hidden: translateMap[direction],
            visible: {
              x: 0,
              y: 0,
              opacity: 1
            },
          };
      }
    };

    return (
      <motion.div
        ref={ref}
        initial="hidden"
        animate={animateOnLoad ? 'visible' : 'hidden'}
        exit="hidden"
        variants={getAnimationVariant()}
        transition={{
          duration,
          delay,
          ease: [0.32, 0.72, 0.62, 1.01]
        }}
        viewport={{ once }}
        className={cn(className)}
      >
        {children}
      </motion.div>
    );
  }
);
AnimatedWrapper.displayName = 'AnimatedWrapper';

export { AnimatedWrapper };