import * as React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './card';
import { Badge } from './badge';
import { Button } from './button';
import { cn } from '@/lib/utils';

// Enhanced Card components with additional features
interface EnhancedCardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  badge?: {
    text: string;
    variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'success' | 'warning' | 'accent';
  };
  actions?: React.ReactNode;
}

const EnhancedCardHeader = React.forwardRef<HTMLDivElement, EnhancedCardHeaderProps>(
  ({ className, title, description, badge, actions, ...props }, ref) => {
    return (
      <CardHeader className={cn('flex flex-row items-start justify-between gap-4', className)} ref={ref} {...props}>
        <div className="flex-1">
          {title && (
            <div className="flex items-center gap-2">
              <CardTitle className="text-2xl">{title}</CardTitle>
              {badge && <Badge variant={badge.variant}>{badge.text}</Badge>}
            </div>
          )}
          {description && <CardDescription className="mt-1">{description}</CardDescription>}
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </CardHeader>
    );
  }
);
EnhancedCardHeader.displayName = 'EnhancedCardHeader';

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, EnhancedCardHeader };