export function Footer() {
  return (
    <footer className="mt-12 sm:mt-16 border-t border-border bg-gradient-subtle">
      <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8 text-sm text-muted-foreground">
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 justify-between text-center sm:text-left">
          <div className="font-medium">
            © {new Date().getFullYear()} STAT102 • Applied Statistics
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-xs sm:text-sm">
            <span>Academic Course Management System</span>
            <span className="hidden sm:inline">•</span>
            <span>For Educational Use</span>
          </div>
        </div>
      </div>
    </footer>
  );
}