'use client';

import LogViewer from '@/app/component/LogViewer';
import { use } from 'react';
// import LogViewer from '@/components/LogViewer';

interface Props {
  params: Promise<{ id: string }>;
}

export default function LogsPage({ params }: Props) {
  const { id } = use(params);
  return <LogViewer id={id} />;
}