import { Navigate } from "react-router-dom";
import { useSupabase } from "@/hooks/useSupabase";
import { useAnnouncements } from "@/hooks/useAnnouncements";
import { useMaterials } from "@/hooks/useMaterials";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AnnouncementsPage } from "./Announcements";
import { CourseContentPage } from "./CourseContent";
import { CourseDetailsPage } from "./CourseDetails";
import { useState } from "react";

const Index = () => {
  const { user, userRole, signOut, loading } = useSupabase();
  const [page, setPage] = useState("home");
  
  // Show loading while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  // Redirect to auth if not logged in
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // Authentication handlers
  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header
        page={page}
        setPage={setPage}
        role={userRole}
        onSignIn={() => {}} // Not needed since we redirect to auth
        onSignOut={handleSignOut}
      />

      <main className="max-w-6xl mx-auto px-4 pb-12">
        {page === "home" && <AnnouncementsPage role={userRole} />}
        {page === "content" && <CourseContentPage role={userRole} />}
        {page === "details" && <CourseDetailsPage />}
      </main>

      <Footer />
    </div>
  );
};

export default Index;