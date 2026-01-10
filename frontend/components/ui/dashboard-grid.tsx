import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { cn } from '@/lib/utils';

interface DashboardGridProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode[];
  cols?: '1' | '2' | '3' | '4' | '5' | '6';
}

const DashboardGrid = React.forwardRef<HTMLDivElement, DashboardGridProps>(
  ({ children, cols = '3', className, ...props }, ref) => {
    const colClasses = {
      '1': 'grid-cols-1',
      '2': 'grid-cols-1 md:grid-cols-2',
      '3': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
      '4': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
      '5': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-5',
      '6': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-6',
    };

    return (
      <div
        ref={ref}
        className={cn('grid gap-6', colClasses[cols], className)}
        {...props}
      >
        {children.map((child, index) => (
          <div key={index} className="transition-transform duration-200 hover:scale-[1.01]">
            {child}
          </div>
        ))}
      </div>
    );
  }
);
DashboardGrid.displayName = 'DashboardGrid';

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  trend?: {
    value: string;
    positive: boolean;
  };
  className?: string;
}

const StatCard = React.forwardRef<HTMLDivElement, StatCardProps>(
  ({ title, value, description, icon, trend, className, ...props }, ref) => {
    return (
      <Card className={cn('overflow-hidden', className)} ref={ref} {...props}>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
              {title}
            </CardTitle>
            <div className="flex items-baseline mt-1">
              <span className="text-2xl font-bold">{value}</span>
              {trend && (
                <span
                  className={`ml-2 text-sm font-medium ${
                    trend.positive
                      ? 'text-success-600 dark:text-success-400'
                      : 'text-error-600 dark:text-error-400'
                  }`}
                >
                  {trend.value}
                </span>
              )}
            </div>
          </div>
          {icon && <div className="p-2 bg-primary-100 dark:bg-primary-900 rounded-lg">{icon}</div>}
        </CardHeader>
        {description && (
          <CardContent>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">{description}</p>
          </CardContent>
        )}
      </Card>
    );
  }
);
StatCard.displayName = 'StatCard';

export { DashboardGrid, StatCard };