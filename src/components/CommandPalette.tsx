import React, { useState, useEffect, useRef } from 'react';
import { Search, CornerDownLeft, Box, Battery, Cpu, Square, Layers, X, Smartphone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router';
import { compatibilityData, categoriesMap } from '../data';
import { Highlight } from './Highlight';
import { CategoryIconMap } from '../icons';

export function CommandPalette({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const suggestions = React.useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    const matches = new Set<string>();
    compatibilityData.forEach(item => {
      if (item.brand.toLowerCase().includes(q)) matches.add(item.brand);
      if (item.baseModel.toLowerCase().includes(q)) matches.add(item.baseModel);
      item.compatibleModels.forEach(m => {
        if (m.toLowerCase().includes(q)) matches.add(m);
      });
    });
    return Array.from(matches).slice(0, 3);
  }, [query]);

  const results = React.useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    return compatibilityData.filter(item => {
      return item.brand.toLowerCase().includes(q) ||
             item.baseModel.toLowerCase().includes(q) ||
             item.compatibleModels.some(m => m.toLowerCase().includes(q));
    }).slice(0, 6);
  }, [query]);

  const handleSelect = (q: string) => {
    onClose();
    navigate(`/search?q=${encodeURIComponent(q)}`);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh] sm:pt-[15vh] px-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-[#0B1120]/40 backdrop-blur-md"
        onClick={onClose}
      />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -10 }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-2xl bg-[#111827] border border-white/10 rounded-[20px] shadow-2xl overflow-hidden flex flex-col"
        style={{ boxShadow: '0 30px 60px -15px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)' }}
      >
        <div className="flex items-center px-4 py-4 border-b border-slate-800">
          <Search className="w-5 h-5 text-slate-500 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            className="flex-1 bg-transparent border-0 text-lg text-white placeholder-slate-500 focus:ring-0 focus:outline-none px-4"
            placeholder="Search parts, models, or brands..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter' && query.trim()) {
                handleSelect(query);
              }
            }}
          />
          <div className="flex items-center gap-2">
            <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 rounded bg-white/5 border border-white/10 text-[10px] font-medium text-slate-400">
              ESC
            </kbd>
            <button onClick={onClose} className="p-1 hover:bg-white/5 rounded-lg text-slate-400 transition-colors sm:hidden">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="max-h-[50vh] overflow-y-auto overscroll-contain pb-4">
          {query.trim() === '' ? (
            <div className="px-6 py-12 text-center">
              <p className="text-slate-500 text-sm">Find compatible components instantly</p>
            </div>
          ) : results.length > 0 || suggestions.length > 0 ? (
            <div className="p-2 space-y-4">
              {suggestions.length > 0 && (
                <div>
                  <div className="px-3 py-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Suggestions</div>
                  <div className="space-y-1">
                    {suggestions.map((suggestion, idx) => (
                      <button
                        key={`sug-${idx}`}
                        onClick={() => handleSelect(suggestion)}
                        className="w-full flex items-center justify-between px-4 py-2.5 rounded-[12px] hover:bg-white/5 transition-colors group cursor-pointer text-left"
                      >
                        <div className="flex items-center gap-3">
                          <Search className="w-4 h-4 text-slate-500 group-hover:text-slate-300 transition-colors" />
                          <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">
                            <Highlight text={suggestion} highlight={query} />
                          </span>
                        </div>
                        <CornerDownLeft className="w-3.5 h-3.5 text-slate-600 group-hover:text-blue-400 opacity-0 group-hover:opacity-100 transition-all shrink-0 ml-4" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {results.length > 0 && (
                <div>
                  <div className="px-3 py-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest border-t border-slate-800/50 mt-2 pt-4">Part Matches</div>
                  <div className="space-y-1 mt-1">
                    {results.map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSelect(item.baseModel)}
                        className="w-full flex items-center justify-between px-4 py-3 rounded-[12px] hover:bg-white/5 transition-colors group cursor-pointer text-left"
                      >
                        <div className="flex items-center gap-4">
                            {(() => {
                              const Icon = CategoryIconMap[item.category] || Box;
                              const categoryColor = categoriesMap[item.category]?.color || "text-slate-400 bg-slate-500/10 border-slate-500/20";
                              // Simple background logic or direct extraction
                              return (
                                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${categoryColor}`}>
                                  <Icon className="w-4 h-4" />
                                </div>
                              );
                            })()}
                          <div className="flex flex-col gap-0.5">
                            <span className="text-sm font-semibold text-slate-200 group-hover:text-white transition-colors">
                              <Highlight text={item.baseModel} highlight={query} />
                              <span className="text-slate-500 ml-2 font-medium">({item.brand})</span>
                            </span>
                            <span className="text-xs text-slate-500 truncate max-w-[200px] sm:max-w-[400px]">
                              Compatible: {item.compatibleModels.join(', ')}
                            </span>
                          </div>
                        </div>
                        <CornerDownLeft className="w-4 h-4 text-slate-600 group-hover:text-blue-400 opacity-0 group-hover:opacity-100 transition-all shrink-0 ml-4" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="px-6 py-12 text-center text-slate-400 text-sm">
              No results found for "{query}".
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
