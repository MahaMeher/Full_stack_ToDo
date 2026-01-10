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
              opacity: 1,
              transition: {
                duration,
                delay,
                ease: 'easeOut'
              }
            },
          };
        case 'scaleIn':
          return {
            hidden: { scale: 0.8, opacity: 0 },
            visible: {
              scale: 1,
              opacity: 1,
              transition: {
                duration,
                delay,
                ease: 'easeOut'
              }
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
              opacity: 1,
              transition: {
                duration,
                delay,
                ease: 'easeOut'
              }
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
        viewport={{ once }}
        className={cn(className)}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);
AnimatedWrapper.displayName = 'AnimatedWrapper';

export { AnimatedWrapper };