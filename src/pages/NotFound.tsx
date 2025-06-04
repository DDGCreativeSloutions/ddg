import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 px-4 py-10">
      <div className="text-center max-w-lg w-full bg-white rounded-2xl shadow-xl p-8 space-y-6">
        {/* ✅ Logo */}
        <div className="flex justify-center">
          <img src="/logo.png" alt="Logo" className="h-16 w-auto mb-2" />
          
        </div>
         <span className="font-bold text-xl bg-gradient-to-r from-purple-600 via-blue-600 to-green-500 bg-clip-text text-transparent transition-all duration-300 group-hover:from-purple-700 group-hover:via-blue-700 group-hover:to-green-600">
                  DesignDeliverGrow
          </span>

        <div className="text-7xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          404
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Page Not Found</h1>
        <p className="text-lg text-gray-600">
          We couldn't find the page you're looking for. It might have been moved or deleted.
        </p>

        <Link to="/">
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 mt-4"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Return to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
