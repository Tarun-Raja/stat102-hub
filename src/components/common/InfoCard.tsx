interface InfoCardProps {
  title: string;
  value: string;
}

export function InfoCard({ title, value }: InfoCardProps) {
  return (
    <div className="academic-card p-5">
      <div className="text-xs uppercase tracking-wide text-muted-foreground font-medium mb-2">
        {title}
      </div>
      <div className="text-lg font-bold text-foreground">{value}</div>
    </div>
  );
}