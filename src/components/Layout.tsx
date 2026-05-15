import React, { useState, useEffect } from 'react';
import { Layers, Settings, Menu, X, ArrowRight, Search, Command } from 'lucide-react';
import { Link, Outlet, useLocation } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { CommandPalette } from './CommandPalette';

export default function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-[#0B1120] text-[#F9FAFB] font-sans flex flex-col selection:bg-blue-500/30 selection:text-blue-200">
      {/* Navbar */}
      <nav className="fixed top-0 inset-x-0 z-40 glass-panel">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-[72px]">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group outline-none">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-2 rounded-xl text-white shadow-[0_0_15px_rgba(59,130,246,0.2)] group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all">
                <Layers className="w-5 h-5" />
              </div>
              <span className="text-[1.15rem] font-semibold text-white tracking-tight">MatchPart</span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-2">
              <Link to="/" className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${location.pathname === '/' ? 'text-white bg-white/5' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>Dashboard</Link>
              <Link to="/search" className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${location.pathname === '/search' ? 'text-white bg-white/5' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>Database</Link>
              
              <button 
                onClick={() => setSearchOpen(true)}
                className="ml-2 flex items-center gap-3 px-3 py-2 rounded-xl border border-white/10 bg-[#0B1120]/50 text-sm text-slate-400 hover:text-white hover:border-white/20 transition-all cursor-text group shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <Search className="w-4 h-4 text-slate-500 group-hover:text-slate-400" />
                  <span>Search parts...</span>
                </div>
                <div className="flex items-center gap-1 opacity-60">
                  <kbd className="font-sans text-[10px] px-1.5 py-0.5 rounded border border-white/10 bg-white/5 flex items-center"><Command className="w-3 h-3 mr-0.5"/>K</kbd>
                </div>
              </button>
              
              <div className="flex items-center gap-3 ml-4 pl-4 border-l border-white/10">
                <Link to="/admin" className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors" title="Admin">
                  <Settings className="w-5 h-5" />
                </Link>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center gap-3">
              <button 
                onClick={() => setSearchOpen(true)}
                className="p-2 text-slate-400 hover:text-white"
              >
                <Search className="w-5 h-5" />
              </button>
              <button 
                className="p-2 text-slate-400 hover:text-white transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-0 z-30 bg-[#0B1120] pt-[72px] px-4"
          >
            <div className="flex flex-col gap-2 py-4">
              <Link to="/" className="text-lg font-medium text-white p-4 bg-[#111827] border border-white/5 rounded-2xl">Dashboard</Link>
              <Link to="/search" className="text-lg font-medium text-white p-4 bg-[#111827] border border-white/5 rounded-2xl">Database</Link>
              <Link to="/admin" className="text-lg font-medium text-white p-4 bg-[#111827] border border-white/5 rounded-2xl flex items-center gap-2">
                <Settings className="w-5 h-5 text-slate-400" /> Admin Panel
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 pt-[72px]">
        <Outlet context={{ openSearch: () => setSearchOpen(true) }} />
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-[#0B1120] mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center opacity-80 shadow-sm shadow-blue-500/20">
                 <Layers className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-sm font-semibold text-slate-300">MatchPart Platform</span>
            </div>
            <div className="flex items-center gap-6 text-sm font-medium text-slate-500">
              <a href="#" className="hover:text-white transition-colors">About</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">API</a>
            </div>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {searchOpen && <CommandPalette isOpen={searchOpen} onClose={() => setSearchOpen(false)} />}
      </AnimatePresence>
    </div>
  );
}
