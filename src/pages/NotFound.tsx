import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { AcademicButton } from "@/components/ui/academic-button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-8xl font-bold text-primary mb-4">404</div>
        <h1 className="text-2xl font-bold text-foreground mb-4">
          Oops! Page not found
        </h1>
        <p className="text-muted-foreground mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/">
          <AcademicButton>
            Return to Course Home
          </AcademicButton>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
