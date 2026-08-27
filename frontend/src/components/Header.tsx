import React, { useState } from 'react';
import { Menu, Bell, Search, LogOut, User } from 'lucide-react';
import toast from 'react-hot-toast';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const [showProfile, setShowProfile] = useState(false);

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      toast.success('Search completed!');
    }
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-6">
      <div className="flex items-center gap-4 flex-1">
        <button 
          onClick={toggleSidebar}
          className="md:hidden text-slate-500 hover:text-slate-700 focus:outline-none"
        >
          <Menu size={24} />
        </button>
        
        <div className="hidden md:flex items-center relative max-w-md w-full">
          <Search className="absolute left-3 text-slate-400" size={18} />
          <input 
            type="text" 
            onKeyDown={handleSearch}
            placeholder="Search products, orders, or customers..." 
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-4 relative">
        <button 
          onClick={() => toast.success('No new notifications')}
          className="relative p-2 text-slate-500 hover:bg-slate-50 rounded-full transition-colors"
        >
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        
        <div className="flex items-center gap-3 pl-4 border-l border-slate-200 cursor-pointer" onClick={() => setShowProfile(!showProfile)}>
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-slate-700">John Doe</p>
            <p className="text-xs text-slate-500">Admin</p>
          </div>
          <div className="w-9 h-9 bg-blue-100 hover:bg-blue-200 rounded-full flex items-center justify-center text-blue-700 font-bold border border-blue-200 transition-colors">
            JD
          </div>
        </div>

        {showProfile && (
          <div className="absolute right-0 top-12 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-100 py-2 z-50">
            <button onClick={() => { setShowProfile(false); toast.success('Profile opened'); }} className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2">
              <User size={16} /> My Profile
            </button>
            <button onClick={() => { setShowProfile(false); toast.success('Logged out successfully'); }} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2">
              <LogOut size={16} /> Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
