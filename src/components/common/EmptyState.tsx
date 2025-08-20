interface EmptyStateProps {
  title: string;
  subtitle: string;
}

export function EmptyState({ title, subtitle }: EmptyStateProps) {
  return (
    <div className="academic-card p-8 text-center border-dashed">
      <div className="text-lg font-semibold text-foreground mb-2">{title}</div>
      <div className="text-muted-foreground">{subtitle}</div>
    </div>
  );
}