import { cn } from './utils.ts';
import React from 'react';

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-gray-900', className)}
      {...props}
    />
  );
}

export { Skeleton };
