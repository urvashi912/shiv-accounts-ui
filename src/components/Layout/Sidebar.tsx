import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Package,
  Receipt,
  FileText,
  ShoppingCart,
  CreditCard,
  BarChart3,
  ChevronDown,
  Building2,
  Calculator,
  Target,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { useState } from 'react';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  currentPath: string;
}

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<any>;
  children?: NavItem[];
}

const navigation: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Masters',
    href: '/masters',
    icon: Building2,
    children: [
      {
        title: 'Contacts',
        href: '/masters/contacts',
        icon: Users,
      },
      {
        title: 'Products',
        href: '/masters/products',
        icon: Package,
      },
      {
        title: 'Tax Master',
        href: '/masters/tax',
        icon: Calculator,
      },
      {
        title: 'Chart of Accounts',
        href: '/masters/accounts',
        icon: Target,
      },
    ],
  },
  {
    title: 'Transactions',
    href: '/transactions',
    icon: FileText,
    children: [
      {
        title: 'Purchase Orders',
        href: '/transactions/purchase-orders',
        icon: ShoppingCart,
      },
      {
        title: 'Vendor Bills',
        href: '/transactions/vendor-bills',
        icon: Receipt,
      },
      {
        title: 'Sales Orders',
        href: '/transactions/sales-orders',
        icon: FileText,
      },
      {
        title: 'Invoices',
        href: '/transactions/invoices',
        icon: FileText,
      },
      {
        title: 'Payments',
        href: '/transactions/payments',
        icon: CreditCard,
      },
    ],
  },
  {
    title: 'Reports',
    href: '/reports',
    icon: BarChart3,
  },
];

export function Sidebar({ isOpen, currentPath }: SidebarProps) {
  const [openSections, setOpenSections] = useState<string[]>(['Masters', 'Transactions']);

  const toggleSection = (title: string) => {
    setOpenSections(prev =>
      prev.includes(title)
        ? prev.filter(section => section !== title)
        : [...prev, title]
    );
  };

  const isActive = (href: string) => {
    if (href === '/dashboard') return currentPath === '/' || currentPath === '/dashboard';
    return currentPath.startsWith(href);
  };

  const isParentActive = (item: NavItem) => {
    if (item.children) {
      return item.children.some(child => isActive(child.href));
    }
    return isActive(item.href);
  };

  return (
    <aside className={cn(
      "fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] bg-sidebar-background border-r border-sidebar-border transition-all duration-300",
      isOpen ? "w-64" : "w-16"
    )}>
      <div className="flex flex-col h-full">
        <nav className="flex-1 p-4 space-y-2">
          {navigation.map((item) => {
            if (item.children) {
              const sectionIsOpen = openSections.includes(item.title);
              const parentActive = isParentActive(item);

              return (
                <Collapsible
                  key={item.title}
                  open={sectionIsOpen}
                  onOpenChange={() => toggleSection(item.title)}
                >
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                        parentActive && "bg-sidebar-accent text-sidebar-accent-foreground",
                        !isOpen && "px-2 justify-center"
                      )}
                    >
                      <item.icon className={cn("h-5 w-5", isOpen && "mr-3")} />
                      {isOpen && (
                        <>
                          <span className="flex-1 text-left">{item.title}</span>
                          <ChevronDown className={cn(
                            "h-4 w-4 transition-transform",
                            sectionIsOpen && "transform rotate-180"
                          )} />
                        </>
                      )}
                    </Button>
                  </CollapsibleTrigger>
                  {isOpen && (
                    <CollapsibleContent className="pl-4 mt-1 space-y-1">
                      {item.children.map((child) => (
                        <NavLink
                          key={child.href}
                          to={child.href}
                          className={({ isActive: navActive }) => cn(
                            "flex items-center px-3 py-2 text-sm rounded-md transition-colors",
                            "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                            (navActive || isActive(child.href)) && "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                          )}
                        >
                          <child.icon className="h-4 w-4 mr-3" />
                          {child.title}
                        </NavLink>
                      ))}
                    </CollapsibleContent>
                  )}
                </Collapsible>
              );
            }

            return (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive: navActive }) => cn(
                  "flex items-center px-3 py-2 rounded-md text-sidebar-foreground transition-colors",
                  "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  (navActive || isActive(item.href)) && "bg-sidebar-accent text-sidebar-accent-foreground font-medium",
                  !isOpen && "justify-center"
                )}
              >
                <item.icon className={cn("h-5 w-5", isOpen && "mr-3")} />
                {isOpen && <span>{item.title}</span>}
              </NavLink>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}