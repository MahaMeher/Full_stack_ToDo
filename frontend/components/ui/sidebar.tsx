import * as React from 'react';
import { Button } from './button';
import { cn } from '@/lib/utils';
import {
  Home,
  Calendar,
  Users,
  Settings,
  BarChart3,
  FileText,
  Bell,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface NavItem {
  id: string;
  title: string;
  icon: React.ReactNode;
  href?: string;
  badge?: number;
}

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  navItems: NavItem[];
  collapsed?: boolean;
  onCollapseToggle?: () => void;
}

const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  ({ navItems, collapsed = false, onCollapseToggle, className, ...props }, ref) => {
    return (
      <aside
        ref={ref}
        className={cn(
          'h-screen sticky top-0 bg-white border-r border-neutral-200 dark:bg-neutral-900 dark:border-neutral-800 transition-all duration-300 ease-in-out',
          collapsed ? 'w-16' : 'w-64',
          className
        )}
        {...props}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-800">
            {!collapsed && (
              <div className="text-xl font-bold text-primary-600 dark:text-primary-400">Acme Inc</div>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={onCollapseToggle}
              className="h-8 w-8"
            >
              {collapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-2">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.id}>
                  <Button
                    variant="ghost"
                    className={cn(
                      'w-full justify-start gap-3 px-3 py-2',
                      'hover:bg-neutral-100 dark:hover:bg-neutral-800',
                      'data-[active=true]:bg-primary-50 data-[active=true]:text-primary-700 dark:data-[active=true]:bg-primary-900/30 dark:data-[active=true]:text-primary-300'
                    )}
                  >
                    <span className="flex-shrink-0">{item.icon}</span>
                    {!collapsed && (
                      <>
                        <span className="flex-1 text-left">{item.title}</span>
                        {item.badge !== undefined && (
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary-600 text-xs text-white">
                            {item.badge}
                          </span>
                        )}
                      </>
                    )}
                  </Button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer */}
          <div className="p-2 border-t border-neutral-200 dark:border-neutral-800">
            <Button
              variant="ghost"
              className={cn(
                'w-full justify-start gap-3 px-3 py-2',
                'hover:bg-neutral-100 dark:hover:bg-neutral-800'
              )}
            >
              <Settings className="h-4 w-4 flex-shrink-0" />
              {!collapsed && <span>Settings</span>}
            </Button>
          </div>
        </div>
      </aside>
    );
  }
);
Sidebar.displayName = 'Sidebar';

export { Sidebar, type NavItem };