import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] transition-all duration-200 ease-in-out group',
  {
    variants: {
      variant: {
        default: 'bg-primary-600 text-primary-foreground hover:bg-primary-700 shadow-sm hover:shadow-md',
        destructive: 'bg-error-600 text-error-foreground hover:bg-error-700 shadow-sm hover:shadow-md',
        outline: 'border border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-50 hover:border-neutral-400 shadow-sm hover:shadow-sm dark:border-neutral-600 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800',
        secondary: 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200 shadow-sm hover:shadow-sm dark:bg-secondary-800 dark:text-secondary-200 dark:hover:bg-secondary-700',
        ghost: 'hover:bg-neutral-100 text-neutral-700 hover:text-neutral-900 dark:hover:bg-neutral-800 dark:text-neutral-300 dark:hover:text-neutral-100',
        link: 'text-primary-600 underline-offset-4 hover:underline',
        success: 'bg-success-600 text-success-foreground hover:bg-success-700 shadow-sm hover:shadow-md',
        warning: 'bg-warning-600 text-warning-foreground hover:bg-warning-700 shadow-sm hover:shadow-md',
        accent: 'bg-accent-600 text-accent-foreground hover:bg-accent-700 shadow-sm hover:shadow-md',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 px-3 py-2 text-xs',
        lg: 'h-12 px-8 text-base font-semibold',
        xl: 'h-14 px-10 text-lg font-semibold',
        icon: 'h-10 w-10',
        'icon-sm': 'h-8 w-8',
        'icon-lg': 'h-12 w-12',
      },
      rounded: {
        default: 'rounded-lg',
        full: 'rounded-full',
        none: 'rounded-none',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      rounded: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, rounded, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, rounded, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };