import * as React from 'react';
import { Search } from 'lucide-react';
import { Input } from './input';
import { cn } from '@/lib/utils';

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  containerClassName?: string;
}

const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, containerClassName, placeholder = 'Search...', ...props }, ref) => {
    return (
      <div className={cn('relative', containerClassName)}>
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="h-4 w-4 text-neutral-400" />
        </div>
        <Input
          ref={ref}
          className={cn(
            'pl-10 pr-4 py-2 rounded-lg',
            className
          )}
          placeholder={placeholder}
          {...props}
        />
      </div>
    );
  }
);
SearchInput.displayName = 'SearchInput';

export { SearchInput };