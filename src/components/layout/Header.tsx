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
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between gap-2">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-2xl bg-gradient-primary text-primary-foreground font-bold text-base sm:text-lg shadow-glow flex-shrink-0">
            AS
          </div>
          <div className="min-w-0 flex-1">
            <div className="font-bold text-sm sm:text-lg leading-tight text-foreground truncate">
              Applied Statistics (STAT102)
            </div>
            <div className="text-xs sm:text-sm text-muted-foreground leading-tight">
              Program Core • 4 Credits
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

        <div className="flex items-center gap-3 flex-shrink-0">
          <span className={isStaff ? "academic-badge-role" : "academic-badge-type"}>
            {role}
          </span>
          {role === "Student" ? (
            <AcademicButton variant="secondary" onClick={onSignIn} className="text-xs sm:text-sm px-2 sm:px-3 py-1.5">
              Sign in
            </AcademicButton>
          ) : (
            <AcademicButton variant="secondary" onClick={onSignOut} className="text-xs sm:text-sm px-2 sm:px-3 py-1.5">
              Sign out
            </AcademicButton>
          )}
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden px-4 pb-3 flex gap-1.5">
        <AcademicButton
          variant={page === "home" ? "nav-active" : "nav-inactive"}
          onClick={() => setPage("home")}
          className="flex-1 text-xs px-2 py-2"
        >
          Announcements
        </AcademicButton>
        <AcademicButton
          variant={page === "content" ? "nav-active" : "nav-inactive"}
          onClick={() => setPage("content")}
          className="flex-1 text-xs px-2 py-2"
        >
          Content
        </AcademicButton>
        <AcademicButton
          variant={page === "details" ? "nav-active" : "nav-inactive"}
          onClick={() => setPage("details")}
          className="flex-1 text-xs px-2 py-2"
        >
          Details
        </AcademicButton>
      </div>
    </header>
  );
}