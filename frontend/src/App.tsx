import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';
import Sales from './pages/Sales';
import Login from './pages/Login';
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const AppLayout = ({ children, onLogout }: { children: React.ReactNode, onLogout: () => void }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} onLogout={onLogout} />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogout = () => {
    setIsAuthenticated(false);
  };
  
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login onLogin={() => setIsAuthenticated(true)} />} />
        
        {/* Protected Routes */}
        <Route path="/" element={
            isAuthenticated ? (
            <AppLayout onLogout={handleLogout}>
              <Dashboard />
            </AppLayout>
            ) : <Navigate to="/login" replace />
        } />
        <Route path="/inventory" element={
            isAuthenticated ? (
            <AppLayout onLogout={handleLogout}>
              <Inventory />
            </AppLayout>
            ) : <Navigate to="/login" replace />
        } />
        <Route path="/sales" element={
            isAuthenticated ? (
            <AppLayout onLogout={handleLogout}>
              <Sales />
            </AppLayout>
            ) : <Navigate to="/login" replace />
        } />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
