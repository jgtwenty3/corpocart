import * as React from 'react';
import corplogo from "../../assets/images/corplogo.png";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';

import { cn } from '@/lib/utils';

const TopBar = () => {
  const components = [
    
    {
      title: 'ABOUT',
      href: '/about',
    },
    {
      title: 'PRODUCTS',
      href: '/products',
    },
    {
      title: 'CONTACT',
      href: '/contact',
    },
    {
      title:'LOGOUT',
      href:'/signin'
    }
  ];

  return (
    <header className="flex items-center justify-between p-4  shadow-lg">
      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-bold text-white">CORPO-CART</h1>
        
      </div>

      <NavigationMenu className="z-[5]">
        <NavigationMenuList className="flex space-x-4">
          <NavigationMenuItem>
            <NavigationMenuTrigger className={navigationMenuTriggerStyle()}>
              MENU
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="p-4 bg-white rounded-lg shadow-md">
                {components.map((component) => (
                  <ListItem key={component.title} title={component.title} href={component.href} className = "shadow-light">
                    {/* You can add additional children if necessary */}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'hover:bg-gray-200 block text-gray-800 select-none rounded-md p-2 transition-colors',
            className
          )}
          {...props}
        >
          <div className="font-medium">{title}</div>
          <p className="text-muted-foreground text-sm">{children}</p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});

ListItem.displayName = 'ListItem';

export default TopBar;
