import { AcademicButton } from "@/components/ui/academic-button";
import { Announcement, UserRole } from "@/types";
import { formatDate } from "@/utils/dateUtils";

interface AnnouncementCardProps {
  announcement: Announcement;
  role: UserRole;
  onTogglePin: (id: string) => void;
  onDelete: (id: string) => void;
}

export function AnnouncementCard({
  announcement,
  role,
  onTogglePin,
  onDelete,
}: AnnouncementCardProps) {
  const canEdit = role === "Professor" || role === "Class Representative";

  return (
    <article className="academic-card p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4 mb-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 flex-1 min-w-0">
          {announcement.pinned && (
            <span className="academic-badge-pinned self-start">Pinned</span>
          )}
          <h2 className="font-bold text-lg sm:text-xl text-foreground leading-tight">
            {announcement.title}
          </h2>
        </div>
        <div className="text-sm text-muted-foreground whitespace-nowrap self-start sm:self-auto">
          {formatDate(announcement.createdAt)}
        </div>
      </div>

      <p className="text-foreground whitespace-pre-wrap leading-relaxed mb-4">
        {announcement.body}
      </p>

      {announcement.link && (
        <a
          className="inline-flex items-center gap-2 text-primary hover:text-primary-glow font-medium underline underline-offset-4 mb-4"
          href={announcement.link}
          target="_blank"
          rel="noreferrer"
        >
          Open link
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      )}

      {canEdit && (
        <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
          <AcademicButton
            variant="secondary"
            onClick={() => onTogglePin(announcement.id)}
            className="text-xs h-8 flex-1 sm:flex-initial"
          >
            {announcement.pinned ? "Unpin" : "Pin"}
          </AcademicButton>
          <AcademicButton
            variant="secondary"
            onClick={() => onDelete(announcement.id)}
            className="text-xs h-8 text-destructive hover:text-destructive-foreground hover:bg-destructive flex-1 sm:flex-initial"
          >
            Delete
          </AcademicButton>
        </div>
      )}
    </article>
  );
}