import * as React from 'react';
import { Input } from './input';
import { Label } from './label';
import { cn } from '@/lib/utils';

interface InputGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  htmlFor?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
}

const InputGroup = React.forwardRef<HTMLDivElement, InputGroupProps>(
  ({ className, label, htmlFor, error, helperText, required, children, ...props }, ref) => {
    return (
      <div className={cn('space-y-2', className)} ref={ref} {...props}>
        {label && (
          <Label htmlFor={htmlFor}>
            {label} {required && <span className="text-error-500">*</span>}
          </Label>
        )}
        {children || <Input id={htmlFor} aria-invalid={!!error} />}
        {helperText && !error && (
          <p className="text-sm text-neutral-500 dark:text-neutral-400">{helperText}</p>
        )}
        {error && (
          <p className="text-sm text-error-600 dark:text-error-400">{error}</p>
        )}
      </div>
    );
  }
);
InputGroup.displayName = 'InputGroup';

export { InputGroup };