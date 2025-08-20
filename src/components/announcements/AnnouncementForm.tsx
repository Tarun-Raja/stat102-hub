import { useState } from "react";
import { AcademicButton } from "@/components/ui/academic-button";
import { Announcement } from "@/types";

interface AnnouncementFormProps {
  onSubmit: (announcement: Announcement) => Promise<void> | void;
}

export function AnnouncementForm({ onSubmit }: AnnouncementFormProps) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [link, setLink] = useState("");
  const [pinned, setPinned] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;

    setIsSubmitting(true);
    try {
      const announcement: Announcement = {
        id: crypto.randomUUID(),
        title: title.trim(),
        body: body.trim(),
        link: link.trim() || "",
        pinned,
        createdAt: new Date().toISOString(),
      };

      await onSubmit(announcement);
      
      // Clear form
      setTitle("");
      setBody("");
      setLink("");
      setPinned(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClear = () => {
    setTitle("");
    setBody("");
    setLink("");
    setPinned(false);
  };

  return (
    <form onSubmit={handleSubmit} className="academic-card p-4 sm:p-6">
      <h3 className="text-lg font-bold text-foreground mb-4 sm:mb-6">Create Announcement</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Title
          </label>
          <input
            className="academic-input w-full"
            placeholder="Announcement title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Details
          </label>
          <textarea
            className="academic-input w-full min-h-[100px] sm:min-h-[120px] resize-vertical"
            placeholder="Announcement details and information"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Optional Link
          </label>
          <input
            className="academic-input w-full text-sm"
            placeholder="https://drive.google.com/..."
            value={link}
            onChange={(e) => setLink(e.target.value)}
            type="url"
          />
        </div>

        <div className="flex items-center gap-3 pt-2">
          <input
            type="checkbox"
            id="pinned"
            checked={pinned}
            onChange={(e) => setPinned(e.target.checked)}
            className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary"
          />
          <label htmlFor="pinned" className="text-sm font-medium text-foreground cursor-pointer">
            Pin this announcement to the top
          </label>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
          <AcademicButton 
            type="submit" 
            disabled={isSubmitting || !title.trim() || !body.trim()}
            className="flex-1 w-full sm:w-auto"
          >
            {isSubmitting ? "Posting..." : "Post Announcement"}
          </AcademicButton>
          <AcademicButton 
            variant="secondary" 
            type="button" 
            onClick={handleClear}
            disabled={isSubmitting}
            className="w-full sm:w-auto"
          >
            Clear
          </AcademicButton>
        </div>
      </div>
    </form>
  );
}