import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary-600 text-primary-foreground hover:bg-primary-700',
        secondary: 'border-transparent bg-secondary-100 text-secondary-700 hover:bg-secondary-200 dark:bg-secondary-800 dark:text-secondary-200 dark:hover:bg-secondary-700',
        destructive: 'border-transparent bg-error-600 text-error-foreground hover:bg-error-700',
        outline: 'text-foreground',
        success: 'border-transparent bg-success-600 text-success-foreground hover:bg-success-700',
        warning: 'border-transparent bg-warning-600 text-warning-foreground hover:bg-warning-700',
        accent: 'border-transparent bg-accent-600 text-accent-foreground hover:bg-accent-700',
      },
      size: {
        default: 'h-6 px-2 py-0.5 text-xs',
        sm: 'h-5 px-1.5 py-0.25 text-xs',
        lg: 'h-8 px-3 py-1 text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props} />
  );
}

export { Badge, badgeVariants };