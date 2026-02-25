import LogViewer from '@/components/LogViewer';

interface Props {
  params: { id: string };
}

export default function LogsPage({ params }: Props) {
  return <LogViewer id={params.id} />;
}