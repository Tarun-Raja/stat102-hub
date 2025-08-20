export function Footer() {
  return (
    <footer className="mt-16 border-t border-border bg-gradient-subtle">
      <div className="max-w-6xl mx-auto px-4 py-8 text-sm text-muted-foreground flex flex-wrap items-center gap-4 justify-between">
        <div className="font-medium">
          © {new Date().getFullYear()} STAT102 • Applied Statistics
        </div>
        <div className="flex items-center gap-4">
          <span>Academic Course Management System</span>
          <span>•</span>
          <span>For Educational Use</span>
        </div>
      </div>
    </footer>
  );
}