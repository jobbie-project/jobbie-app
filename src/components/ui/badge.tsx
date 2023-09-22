import * as React from 'react';
import {cva, type VariantProps} from 'class-variance-authority';

import {cn} from '@/utils';

const badgeVariants = cva('inline-flex items-center px-2.5 py-0.5 text-xs', {
  variants: {
    variant: {
      default: 'bg-white text-black rounded-md h-6 p-4 select-none',
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
