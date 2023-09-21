import * as React from 'react';
import {cva, type VariantProps} from 'class-variance-authority';

import {cn} from '@/utils';

const badgeVariants = cva(
  'inline-flex items-center px-2.5 py-0.5 text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-redDefault cursor-pointer',
  {
    variants: {
      variant: {
        default:
          'bg-white text-black rounded-md hover:outline-none hover:ring-[1.5px] hover:ring-redDefault cursor-pointer h-6',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({className, variant, ...props}: BadgeProps) {
  return <div className={cn(badgeVariants({variant}), className)} {...props} />;
}

export {Badge, badgeVariants};
