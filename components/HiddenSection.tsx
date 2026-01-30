'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function HiddenSectionInner({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  if (searchParams.get('show') !== 'all') return null;
  return <>{children}</>;
}

export default function HiddenSection({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={null}>
      <HiddenSectionInner>{children}</HiddenSectionInner>
    </Suspense>
  );
}
