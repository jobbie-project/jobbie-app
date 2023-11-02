import * as React from 'react';
import {cva, type VariantProps} from 'class-variance-authority';

import {cn} from '@/utils';

const badgeVariants = cva('inline-flex items-center px-2.5 py-0.5 text-xs', {
  variants: {
    variant: {
      default: 'bg-white text-xs p-2 rounded-md font-semibold',
      secondary: 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
      destructive: 'border-transparent bg-redDefault text-destructive-foreground shadow rounded-md ',
      outline: 'text-foreground',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({className, variant, ...props}: BadgeProps) {
  return <div className={cn(badgeVariants({variant}), className)} {...props} />;
}

export {Badge, badgeVariants};
