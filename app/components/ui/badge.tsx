import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded px-1.5 py-0.5 text-[0.65rem] font-medium',
  {
    variants: {
      variant: {
        unprocessed: 'bg-orange-50 text-orange-700',
        contacted: 'bg-green-50 text-green-800',
        pending: 'bg-blue-50 text-blue-800',
      },
    },
    defaultVariants: {
      variant: 'unprocessed',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
