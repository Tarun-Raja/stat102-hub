import { useMemo } from "react";
import { AnnouncementCard } from "@/components/announcements/AnnouncementCard";
import { AnnouncementForm } from "@/components/announcements/AnnouncementForm";
import { EmptyState } from "@/components/common/EmptyState";
import { TimestampPill } from "@/components/common/TimestampPill";
import { UserRole } from "@/types";
import { useAnnouncements } from "@/hooks/useAnnouncements";

interface AnnouncementsPageProps {
  role: UserRole;
}

export function AnnouncementsPage({ role }: AnnouncementsPageProps) {
  const { announcements, loading, addAnnouncement, togglePin, deleteAnnouncement } = useAnnouncements();
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

  if (loading) {
    return (
      <section className="pt-6 sm:pt-8">
        <div className="text-center text-muted-foreground">Loading announcements...</div>
      </section>
    );
  }

  return (
    <section className="pt-6 sm:pt-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Announcements</h1>
        <TimestampPill />
      </div>

      {canPost && (
        <div className="mb-6 sm:mb-8">
          <AnnouncementForm onSubmit={addAnnouncement} />
        </div>
      )}

      <div className="space-y-4 sm:space-y-6">
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
            onTogglePin={togglePin}
            onDelete={deleteAnnouncement}
          />
        ))}
      </div>
    </section>
  );
}