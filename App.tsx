import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import Index from "./pages/Index";
import Admin from "./pages/Admin";
import Operator from "./pages/Operator";
import NotFound from "./pages/NotFound";
import ReviewOrder from "./pages/ReviewOrder";
import PaymentConfirmation from "./pages/PaymentConfirmation";
import Tracking from "./pages/Tracking";
import MobileDemo from "./pages/MobileDemo";
import Coverage from "./pages/Coverage";
import DriverApp from "./pages/DriverApp";
import Customer from "./pages/Customer";
import Vendor from "./pages/Vendor";




const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider defaultTheme="light">
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/operator" element={<Operator />} />
            <Route path="/vendor" element={<Vendor />} />
            <Route path="/review-order" element={<ReviewOrder />} />
            <Route path="/payment-confirmation" element={<PaymentConfirmation />} />
            <Route path="/tracking" element={<Tracking />} />
            <Route path="/mobile-demo" element={<MobileDemo />} />
            <Route path="/coverage" element={<Coverage />} />
            <Route path="/driver-app" element={<DriverApp />} />
            <Route path="/customer" element={<Customer />} />




            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;