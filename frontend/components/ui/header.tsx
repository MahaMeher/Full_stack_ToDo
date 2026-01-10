import * as React from 'react';
import { Button } from './button';
import { SearchInput } from './search-input';
import { Badge } from './badge';
import { useTheme } from 'next-themes';
import {
  Menu,
  User,
  Moon,
  Sun,
  Bell,
  Grid3X3,
  Search
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  showSearch?: boolean;
  showNotifications?: boolean;
  showUserMenu?: boolean;
  onMenuToggle?: () => void;
}

const Header = React.forwardRef<HTMLDivElement, HeaderProps>(
  ({
    className,
    title,
    showSearch = true,
    showNotifications = true,
    showUserMenu = true,
    onMenuToggle,
    ...props
  }, ref) => {
    const { theme, setTheme } = useTheme();

    return (
      <header
        ref={ref}
        className={cn(
          'sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6',
          className
        )}
        {...props}
      >
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 px-0 md:hidden"
          onClick={onMenuToggle}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>

        {title && (
          <div className="flex items-center gap-2">
            <Grid3X3 className="h-6 w-6" />
            <h1 className="text-xl font-semibold">{title}</h1>
          </div>
        )}

        <div className="flex w-full items-center justify-between gap-4 md:ml-auto md:gap-2 lg:w-auto">
          {showSearch && (
            <form className="ml-auto flex-1 sm:flex-initial">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-neutral-500 dark:text-neutral-400" />
                <SearchInput
                  placeholder="Search..."
                  className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                  containerClassName="w-full"
                />
              </div>
            </form>
          )}

          <div className="flex items-center gap-2">
            {showNotifications && (
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="sr-only">Notifications</span>
                <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 p-0">
                  3
                </Badge>
              </Button>
            )}

            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              <span className="sr-only">Toggle theme</span>
            </Button>

            {showUserMenu && (
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                <User className="h-5 w-5" />
                <span className="sr-only">User menu</span>
              </Button>
            )}
          </div>
        </div>
      </header>
    );
  }
);
Header.displayName = 'Header';

export { Header };