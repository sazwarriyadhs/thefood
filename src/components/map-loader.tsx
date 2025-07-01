'use client';

import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';

const VendorMap = dynamic(
  () => import('@/components/vendor-map'),
  {
    ssr: false,
    loading: () => <Skeleton className="h-[500px] w-full rounded-lg" />,
  }
);

export default function MapLoader() {
  return <VendorMap />;
}
