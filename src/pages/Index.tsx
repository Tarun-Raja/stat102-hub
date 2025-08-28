import { useState, useEffect, useMemo } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LoginModal } from "@/components/auth/LoginModal";
import { AnnouncementsPage } from "./Announcements";
import { CourseContentPage } from "./CourseContent";
import { CourseDetailsPage } from "./CourseDetails";
import { Announcement, Material, UserRole } from "@/types";
import { useToast } from "@/hooks/use-toast";

// Sample data for initial load
const sampleAnnouncements = (): Announcement[] => [
  {
    id: crypto.randomUUID(),
    title: "Welcome to Applied Statistics!",
    body: "This is the official course site for STAT102. Announcements from the Professor and Class Representatives will appear here.\n\nCheck the Course Content tab for slides, readings, and datasets. All course materials will be organized by module for easy access.",
    link: "",
    pinned: true,
    createdAt: new Date().toISOString(),
  },
];

const Index = () => {
  const { toast } = useToast();
  const [page, setPage] = useState("home");
  const [showLogin, setShowLogin] = useState(false);
  
  // User authentication
  const [role, setRole] = useState<UserRole>(() => {
    const stored = localStorage.getItem("as_auth");
    return stored ? JSON.parse(stored).role : "Student";
  });

  // Announcements state
  const [announcements, setAnnouncements] = useState<Announcement[]>(() => {
    const stored = localStorage.getItem("as_announcements");
    return stored ? JSON.parse(stored) : sampleAnnouncements();
  });

  // Materials state
  const [materials, setMaterials] = useState<Material[]>(() => {
    const stored = localStorage.getItem("as_materials");
    return stored ? JSON.parse(stored) : [];
  });

  // Persist data to localStorage
  useEffect(() => {
    localStorage.setItem("as_announcements", JSON.stringify(announcements));
  }, [announcements]);

  useEffect(() => {
    localStorage.setItem("as_materials", JSON.stringify(materials));
  }, [materials]);

  // Authentication handlers
  const handleSignIn = () => setShowLogin(true);
  
  const handleSignOut = () => {
    localStorage.removeItem("as_auth");
    setRole("Student");
    toast({
      title: "Signed out",
      description: "You have been signed out successfully.",
    });
  };

  const handleLoginSuccess = (newRole: "Professor" | "Class Representative") => {
    setRole(newRole);
    setShowLogin(false);
    localStorage.setItem("as_auth", JSON.stringify({ 
      role: newRole, 
      at: Date.now() 
    }));
    toast({
      title: "Welcome back!",
      description: `Signed in as ${newRole}`,
    });
  };

  // Announcement handlers
  const handleAddAnnouncement = async (announcement: Announcement) => {
    setAnnouncements(prev => [announcement, ...prev]);
    toast({
      title: "Announcement posted",
      description: "Your announcement has been published successfully.",
    });
  };

  const handleTogglePin = async (id: string) => {
    setAnnouncements(prev => 
      prev.map(a => 
        a.id === id ? { ...a, pinned: !a.pinned } : a
      )
    );
  };

  const handleDeleteAnnouncement = async (id: string) => {
    setAnnouncements(prev => prev.filter(a => a.id !== id));
    toast({
      title: "Announcement deleted",
      description: "The announcement has been removed.",
    });
  };

  // Material handlers
  const handleAddMaterial = async (material: Material) => {
    setMaterials(prev => [material, ...prev]);
    toast({
      title: "Material added",
      description: "Course material has been added successfully.",
    });
  };

  const handleDeleteMaterial = async (id: string) => {
    setMaterials(prev => prev.filter(m => m.id !== id));
    toast({
      title: "Material deleted",
      description: "The course material has been removed.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header
        page={page}
        setPage={setPage}
        role={role}
        onSignIn={handleSignIn}
        onSignOut={handleSignOut}
      />

      <main className="max-w-6xl mx-auto px-4 pb-12">
        {page === "home" && (
          <AnnouncementsPage
            role={role}
            announcements={announcements}
            onAddAnnouncement={handleAddAnnouncement}
            onTogglePin={handleTogglePin}
            onDeleteAnnouncement={handleDeleteAnnouncement}
          />
        )}

        {page === "content" && (
          <CourseContentPage
            role={role}
            materials={materials}
            onAddMaterial={handleAddMaterial}
            onDeleteMaterial={handleDeleteMaterial}
          />
        )}

        {page === "details" && <CourseDetailsPage />}
      </main>

      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onSuccess={handleLoginSuccess}
        />
      )}

      <Footer />
    </div>
  );
};

export default Index;