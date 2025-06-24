
import React from "react";
import TravelConnectSignin from "@/components/ui/travel-connect-signin-1";
import { X } from "lucide-react";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/20 to-blue-100/10">
      {/* Close Button */}
      <div className="absolute top-6 right-6 z-30">
        <Link to="/">
          <button className="p-2 rounded-full bg-white/80 hover:bg-white shadow-lg hover:shadow-xl transition-all duration-200">
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </Link>
      </div>
      
      <div className="pt-0">
        <TravelConnectSignin />
      </div>
    </div>
  );
};

export default LoginPage;
