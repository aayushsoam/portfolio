
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import AnimatedButton from "../components/AnimatedButton";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-6">
      <div className="text-center max-w-md">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm text-gray-500 mb-2">ERROR</p>
          <h1 className="text-8xl font-light mb-6">404</h1>
          <p className="text-xl text-gray-600 mb-10">
            The page you're looking for doesn't exist or has been moved.
          </p>
          
          <div className="flex justify-center">
            <AnimatedButton>
              <a href="/">Return to Home</a>
            </AnimatedButton>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
