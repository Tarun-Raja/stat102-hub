import { AcademicButton } from "@/components/ui/academic-button";
import { Material, UserRole } from "@/types";

interface MaterialCardProps {
  material: Material;
  role: UserRole;
  onDelete: (id: string) => void;
}

export function MaterialCard({ material, role, onDelete }: MaterialCardProps) {
  const canEdit = role === "Professor" || role === "Class Representative";

  return (
    <div className="academic-card p-5 flex flex-col h-full">
      <div className="text-xs font-medium text-primary mb-2">
        {material.module}
      </div>
      
      <h3 className="font-bold text-lg text-foreground mb-2 leading-tight">
        {material.title}
      </h3>
      
      <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1">
        {material.desc}
      </p>
      
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <a
            href={material.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-primary hover:text-primary-glow font-medium underline underline-offset-4"
          >
            Download / Open
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
          {material.type && (
            <span className="academic-badge-type">{material.type}</span>
          )}
        </div>
        
        {canEdit && (
          <div className="pt-3 border-t border-border">
            <AcademicButton
              variant="secondary"
              onClick={() => onDelete(material.id)}
              className="text-xs h-8 text-destructive hover:text-destructive-foreground hover:bg-destructive"
            >
              Delete
            </AcademicButton>
          </div>
        )}
      </div>
    </div>
  );
}