import * as React from 'react';
import { Sidebar, NavItem } from '../ui/sidebar';
import { Button } from '../ui/button';
import { SearchInput } from '../ui/search-input';
import { Badge } from '../ui/badge';
import {
  Home,
  Calendar,
  Users,
  Settings,
  BarChart3,
  FileText,
  Bell,
  Menu,
  User,
  Moon,
  Sun
} from 'lucide-react';
import { useTheme } from 'next-themes';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

const DashboardLayout = ({ children, title, subtitle }: DashboardLayoutProps) => {
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);
  const { theme, setTheme } = useTheme();

  const navItems: NavItem[] = [
    { id: 'dashboard', title: 'Dashboard', icon: <Home className="h-4 w-4" />, href: '/dashboard' },
    { id: 'tasks', title: 'Tasks', icon: <Calendar className="h-4 w-4" />, href: '/tasks', badge: 5 },
    { id: 'team', title: 'Team', icon: <Users className="h-4 w-4" />, href: '/team' },
    { id: 'reports', title: 'Reports', icon: <BarChart3 className="h-4 w-4" />, href: '/reports' },
    { id: 'documents', title: 'Documents', icon: <FileText className="h-4 w-4" />, href: '/documents' },
  ];

  return (
    <div className="flex h-screen bg-neutral-50 dark:bg-neutral-950">
      {/* Sidebar */}
      <Sidebar
        navItems={navItems}
        collapsed={sidebarCollapsed}
        onCollapseToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="flex h-16 items-center justify-between border-b border-neutral-200 bg-white px-6 dark:border-neutral-800 dark:bg-neutral-900">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div>
              {title && <h1 className="text-xl font-bold text-foreground">{title}</h1>}
              {subtitle && <p className="text-sm text-neutral-500 dark:text-neutral-400">{subtitle}</p>}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <SearchInput className="hidden md:block" />

            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
              <Badge variant="destructive" className="absolute -top-1 -right-1 h-4 w-4 p-0">
                3
              </Badge>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            <Button variant="ghost" size="icon" className="rounded-full">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export { DashboardLayout };