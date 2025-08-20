import { useState } from "react";
import { AcademicButton } from "@/components/ui/academic-button";
import { Material } from "@/types";
import { MODULES } from "@/data/constants";

interface MaterialFormProps {
  onSubmit: (material: Material, file?: File) => Promise<void> | void;
}

const MATERIAL_TYPES = ["PDF", "Slides", "Spreadsheet", "Doc", "Video", "Zip", "Other"];

export function MaterialForm({ onSubmit }: MaterialFormProps) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [url, setUrl] = useState("");
  const [file, setFile] = useState<File | undefined>(undefined);
  const [type, setType] = useState("PDF");
  const [module, setModule] = useState(MODULES[0].title);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    if (!url.trim() && !file) return; // Need either URL or file

    setIsSubmitting(true);
    try {
      const material: Material = {
        id: crypto.randomUUID(),
        title: title.trim(),
        desc: desc.trim(),
        url: url.trim(),
        type,
        module,
        createdAt: new Date().toISOString(),
      };

      await onSubmit(material, file);
      
      // Clear form
      setTitle("");
      setDesc("");
      setUrl("");
      setFile(undefined);
      setType("PDF");
      setModule(MODULES[0].title);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClear = () => {
    setTitle("");
    setDesc("");
    setUrl("");
    setFile(undefined);
    setType("PDF");
    setModule(MODULES[0].title);
  };

  return (
    <form onSubmit={handleSubmit} className="academic-card p-4 sm:p-6">
      <h3 className="text-lg font-bold text-foreground mb-4 sm:mb-6">Add Course Material</h3>
      
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2 sm:col-span-1">
          <label className="block text-sm font-medium text-foreground mb-2">
            Title
          </label>
          <input
            className="academic-input w-full"
            placeholder="e.g., Week 1 Slides"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="sm:col-span-2 sm:col-span-1">
          <label className="block text-sm font-medium text-foreground mb-2">
            Module
          </label>
          <select
            className="academic-input w-full"
            value={module}
            onChange={(e) => setModule(e.target.value)}
          >
            {MODULES.map((m) => (
              <option key={m.key} value={m.title}>
                {m.title}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-foreground mb-2">
            Description
          </label>
          <input
            className="academic-input w-full"
            placeholder="Brief description of the material (optional)"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-foreground mb-2">
            File Link or Upload
          </label>
          <input
            className="academic-input w-full text-sm"
            placeholder="https://drive.google.com/..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            type="url"
          />
          <p className="text-xs text-muted-foreground mt-2">
            Paste a shareable link from Google Drive, OneDrive, or other cloud storage.
          </p>
        </div>

        <div className="sm:col-span-2 sm:col-span-1">
          <label className="block text-sm font-medium text-foreground mb-2">
            Material Type
          </label>
          <select
            className="academic-input w-full"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            {MATERIAL_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2 flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
          <AcademicButton 
            type="submit" 
            disabled={isSubmitting || !title.trim() || (!url.trim() && !file)}
            className="flex-1 w-full sm:w-auto"
          >
            {isSubmitting ? "Adding..." : "Add Material"}
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