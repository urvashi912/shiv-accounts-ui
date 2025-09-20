import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MainLayout } from "./components/Layout/MainLayout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Reports from "./pages/Reports";
import Contacts from "./pages/masters/Contacts";
import Products from "./pages/masters/Products";
import TaxMaster from "./pages/masters/Tax";
import ChartOfAccounts from "./pages/masters/Accounts";
import PurchaseOrders from "./pages/transactions/PurchaseOrders";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/" element={<MainLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="reports" element={<Reports />} />
            
            {/* Masters Routes */}
            <Route path="masters/contacts" element={<Contacts />} />
            <Route path="masters/products" element={<Products />} />
            <Route path="masters/tax" element={<TaxMaster />} />
            <Route path="masters/accounts" element={<ChartOfAccounts />} />
            
            {/* Transactions Routes */}
            <Route path="transactions/purchase-orders" element={<PurchaseOrders />} />
            <Route path="transactions/vendor-bills" element={<div className="p-6"><h1 className="text-2xl font-bold">Vendor Bills</h1><p className="text-muted-foreground">Coming soon...</p></div>} />
            <Route path="transactions/sales-orders" element={<div className="p-6"><h1 className="text-2xl font-bold">Sales Orders</h1><p className="text-muted-foreground">Coming soon...</p></div>} />
            <Route path="transactions/invoices" element={<div className="p-6"><h1 className="text-2xl font-bold">Invoices</h1><p className="text-muted-foreground">Coming soon...</p></div>} />
            <Route path="transactions/payments" element={<div className="p-6"><h1 className="text-2xl font-bold">Payments</h1><p className="text-muted-foreground">Coming soon...</p></div>} />
          </Route>
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
