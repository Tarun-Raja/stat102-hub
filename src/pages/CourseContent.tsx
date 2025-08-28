import { useMemo, useState } from "react";
import { MaterialCard } from "@/components/materials/MaterialCard";
import { MaterialForm } from "@/components/materials/MaterialForm";
import { EmptyState } from "@/components/common/EmptyState";
import { Material, UserRole } from "@/types";
import { MODULES } from "@/data/constants";

interface CourseContentPageProps {
  role: UserRole;
  materials: Material[];
  onAddMaterial: (material: Material, file?: File) => Promise<void> | void;
  onDeleteMaterial: (id: string) => Promise<void> | void;
}

export function CourseContentPage({
  role,
  materials,
  onAddMaterial,
  onDeleteMaterial,
}: CourseContentPageProps) {
  const canEdit = role === "Professor" || role === "Class Representative";
  const [query, setQuery] = useState("");
  const [selectedModule, setSelectedModule] = useState("All");

  const filteredMaterials = useMemo(() => {
    const q = query.toLowerCase();
    return materials
      .filter((m) => (selectedModule === "All" ? true : m.module === selectedModule))
      .filter((m) => 
        m.title.toLowerCase().includes(q) || 
        m.desc.toLowerCase().includes(q)
      )
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [materials, query, selectedModule]);

  return (
    <section className="pt-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 flex-wrap mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Course Content</h1>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <select
            className="academic-input w-full sm:min-w-[160px]"
            value={selectedModule}
            onChange={(e) => setSelectedModule(e.target.value)}
          >
            <option value="All">All Modules</option>
            {MODULES.map((m) => (
              <option key={m.key} value={m.title}>
                {m.title.replace("Module ", "M")}
              </option>
            ))}
          </select>
          
          <input
            className="academic-input w-full sm:min-w-[200px]"
            placeholder="Search materials..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      {canEdit && (
        <div className="mb-6 sm:mb-8">
          <MaterialForm onSubmit={onAddMaterial} />
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filteredMaterials.length === 0 && (
          <div className="sm:col-span-2 lg:col-span-3">
            <EmptyState
              title="No materials found"
              subtitle="Try a different filter or add new content if you have edit access."
            />
          </div>
        )}
        
        {filteredMaterials.map((material) => (
          <MaterialCard
            key={material.id}
            material={material}
            role={role}
            onDelete={onDeleteMaterial}
          />
        ))}
      </div>

      {filteredMaterials.length > 0 && (
        <div className="text-center text-muted-foreground text-sm mt-8 pt-8 border-t border-border">
          Showing {filteredMaterials.length} of {materials.length} materials
        </div>
      )}
    </section>
  );
}