'use client';

import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default function MapLoader() {
  const Map = useMemo(() => dynamic(
    () => import('@/components/vendor-map'),
    {
      ssr: false,
      loading: () => <Skeleton className="h-[500px] w-full rounded-lg" />,
    }
  ), []);

  return <Map />;
}
