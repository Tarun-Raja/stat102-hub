import { AcademicButton } from "@/components/ui/academic-button";
import { UserRole } from "@/types";

interface HeaderProps {
  page: string;
  setPage: (page: string) => void;
  role: UserRole;
  onSignIn: () => void;
  onSignOut: () => void;
}

export function Header({ page, setPage, role, onSignIn, onSignOut }: HeaderProps) {
  const isStaff = role === "Professor" || role === "Class Representative";

  return (
    <header className="sticky top-0 z-50 backdrop-blur-lg bg-background/80 border-b border-border shadow-soft">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-4 justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-primary text-primary-foreground font-bold text-lg shadow-glow">
            AS
          </div>
          <div>
            <div className="font-bold text-lg leading-tight text-foreground">
              Applied Statistics (STAT102)
            </div>
            <div className="text-sm text-muted-foreground leading-tight">
              Program Core • 4 Credits • Version 1.0
            </div>
          </div>
        </div>

        <nav className="hidden sm:flex items-center gap-2">
          <AcademicButton
            variant={page === "home" ? "nav-active" : "nav-inactive"}
            onClick={() => setPage("home")}
          >
            Announcements
          </AcademicButton>
          <AcademicButton
            variant={page === "content" ? "nav-active" : "nav-inactive"}
            onClick={() => setPage("content")}
          >
            Course Content
          </AcademicButton>
          <AcademicButton
            variant={page === "details" ? "nav-active" : "nav-inactive"}
            onClick={() => setPage("details")}
          >
            Course Details
          </AcademicButton>
        </nav>

        <div className="flex items-center gap-3">
          <span className={isStaff ? "academic-badge-role" : "academic-badge-type"}>
            {role}
          </span>
          {role === "Student" ? (
            <AcademicButton variant="secondary" onClick={onSignIn}>
              Sign in
            </AcademicButton>
          ) : (
            <AcademicButton variant="secondary" onClick={onSignOut}>
              Sign out
            </AcademicButton>
          )}
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden px-4 pb-4 flex gap-2">
        <AcademicButton
          variant={page === "home" ? "nav-active" : "nav-inactive"}
          onClick={() => setPage("home")}
          className="flex-1"
        >
          Announcements
        </AcademicButton>
        <AcademicButton
          variant={page === "content" ? "nav-active" : "nav-inactive"}
          onClick={() => setPage("content")}
          className="flex-1"
        >
          Content
        </AcademicButton>
        <AcademicButton
          variant={page === "details" ? "nav-active" : "nav-inactive"}
          onClick={() => setPage("details")}
          className="flex-1"
        >
          Details
        </AcademicButton>
      </div>
    </header>
  );
}