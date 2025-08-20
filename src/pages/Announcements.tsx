import { useMemo } from "react";
import { AnnouncementCard } from "@/components/announcements/AnnouncementCard";
import { AnnouncementForm } from "@/components/announcements/AnnouncementForm";
import { EmptyState } from "@/components/common/EmptyState";
import { TimestampPill } from "@/components/common/TimestampPill";
import { Announcement, UserRole } from "@/types";

interface AnnouncementsPageProps {
  role: UserRole;
  announcements: Announcement[];
  onAddAnnouncement: (announcement: Announcement) => Promise<void> | void;
  onTogglePin: (id: string) => Promise<void> | void;
  onDeleteAnnouncement: (id: string) => Promise<void> | void;
}

export function AnnouncementsPage({
  role,
  announcements,
  onAddAnnouncement,
  onTogglePin,
  onDeleteAnnouncement,
}: AnnouncementsPageProps) {
  const canPost = role === "Professor" || role === "Class Representative";

  const sortedAnnouncements = useMemo(() => {
    return [...announcements]
      .sort((a, b) => {
        // Pinned first
        if (a.pinned !== b.pinned) {
          return b.pinned ? 1 : -1;
        }
        // Then by date (newest first)
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
  }, [announcements]);

  return (
    <section className="pt-8">
      <div className="flex items-end justify-between gap-4 mb-8">
        <h1 className="text-3xl font-bold text-foreground">Announcements</h1>
        <TimestampPill />
      </div>

      {canPost && (
        <div className="mb-8">
          <AnnouncementForm onSubmit={onAddAnnouncement} />
        </div>
      )}

      <div className="space-y-6">
        {sortedAnnouncements.length === 0 && (
          <EmptyState
            title="No announcements yet"
            subtitle="Announcements posted by the Professor & Class Representatives will appear here."
          />
        )}
        
        {sortedAnnouncements.map((announcement) => (
          <AnnouncementCard
            key={announcement.id}
            announcement={announcement}
            role={role}
            onTogglePin={onTogglePin}
            onDelete={onDeleteAnnouncement}
          />
        ))}
      </div>
    </section>
  );
}