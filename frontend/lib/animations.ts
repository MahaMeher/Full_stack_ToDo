'use client';

// Fade in animation
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

// Slide in from left
export const slideInLeft = {
  hidden: { x: -20, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.3 } },
  exit: { x: -20, opacity: 0, transition: { duration: 0.2 } },
};

// Slide in from right
export const slideInRight = {
  hidden: { x: 20, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.3 } },
  exit: { x: 20, opacity: 0, transition: { duration: 0.2 } },
};

// Slide in from top
export const slideInTop = {
  hidden: { y: -20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.3 } },
  exit: { y: -20, opacity: 0, transition: { duration: 0.2 } },
};

// Slide in from bottom
export const slideInBottom = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.3 } },
  exit: { y: 20, opacity: 0, transition: { duration: 0.2 } },
};

// Stagger children animations
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

// Scale animation
export const scaleIn = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.2 } },
  exit: { scale: 0.8, opacity: 0, transition: { duration: 0.15 } },
};

// Bounce animation for interactive elements
export const bounce = {
  rest: { scale: 1 },
  hover: { scale: 1.03, transition: { duration: 0.2 } },
  tap: { scale: 0.98, transition: { duration: 0.1 } },
};

// Pulse animation for notifications
export const pulse = {
  idle: { scale: 1 },
  pulse: {
    scale: 1.05,
    transition: {
      duration: 0.5,
      repeat: Infinity,
      repeatType: 'reverse',
    },
  },
};

// Hover animation for cards
export const cardHover = {
  rest: {
    y: 0,
    boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)'
  },
  hover: {
    y: -5,
    boxShadow: '0 10px 25px rgba(0,0,0,0.15), 0 5px 10px rgba(0,0,0,0.12)',
    transition: {
      duration: 0.3,
      ease: 'easeInOut'
    }
  },
};

// Button press animation
export const buttonPress = {
  rest: { scale: 1 },
  pressed: { scale: 0.98 },
  whileTap: { scale: 0.98 }
};