import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TripCreationProvider } from "@/contexts/TripCreationContext";
import LandingPage from "./pages/LandingPage";
import AboutPage from "./pages/AboutPage";
import TermsPage from "./pages/TermsPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";
import TripsPage from "./pages/TripsPage";
import TripDetailPage from "./pages/TripDetailPage";
import MyTripDetailPage from "./pages/MyTripDetailPage";
import ProfilePage from "./pages/ProfilePage";
import CreateTripDestinationPage from "./pages/CreateTripDestinationPage";
import CreateTripSchedulePage from "./pages/CreateTripSchedulePage";
import CreateTripTransportPage from "./pages/CreateTripTransportPage";
import CreateTripExpensePage from "./pages/CreateTripExpensePage";
import CreateTripOverviewPage from "./pages/CreateTripOverviewPage";
import NotFound from "./pages/NotFound";
import TripOverviewViewPage from "./pages/TripOverviewViewPage";

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/trips" element={<TripsPage />} />
            <Route path="/trips/:tripId" element={<TripDetailPage />} />
            <Route path="/my-trips/:tripId" element={<MyTripDetailPage />} />
            <Route path="/trip-overview/:tripId" element={<TripOverviewViewPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/create-trip/*" element={
              <TripCreationProvider>
                <Routes>
                  <Route path="destination" element={<CreateTripDestinationPage />} />
                  <Route path="schedule" element={<CreateTripSchedulePage />} />
                  <Route path="transport" element={<CreateTripTransportPage />} />
                  <Route path="expenses" element={<CreateTripExpensePage />} />
                  <Route path="overview" element={<CreateTripOverviewPage />} />
                </Routes>
              </TripCreationProvider>
            } />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
