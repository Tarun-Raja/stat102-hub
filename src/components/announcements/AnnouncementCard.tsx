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
    <article className="academic-card p-6">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {announcement.pinned && (
            <span className="academic-badge-pinned">Pinned</span>
          )}
          <h2 className="font-bold text-lg text-foreground leading-tight">
            {announcement.title}
          </h2>
        </div>
        <div className="text-sm text-muted-foreground whitespace-nowrap">
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
        <div className="flex gap-2 pt-4 border-t border-border">
          <AcademicButton
            variant="secondary"
            onClick={() => onTogglePin(announcement.id)}
            className="text-xs h-8"
          >
            {announcement.pinned ? "Unpin" : "Pin"}
          </AcademicButton>
          <AcademicButton
            variant="secondary"
            onClick={() => onDelete(announcement.id)}
            className="text-xs h-8 text-destructive hover:text-destructive-foreground hover:bg-destructive"
          >
            Delete
          </AcademicButton>
        </div>
      )}
    </article>
  );
}