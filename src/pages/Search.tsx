import React, { useState, useMemo, useEffect } from 'react';
import { Search, Filter, Smartphone, Layers, HardDrive, Clock, X } from 'lucide-react';
import { useSearchParams } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { compatibilityData, categoriesMap, PartCategory, CompatibilityCluster } from '../data';
import { Highlight } from '../components/Highlight';
import { CategoryIconMap } from '../icons';

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const initialCategory = searchParams.get('category') || 'all';

  const [query, setQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('syncparts_recent_searches');
      if (stored) {
        setRecentSearches(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to load recent searches', e);
    }
  }, []);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const saveRecentSearch = (term: string) => {
    if (!term.trim()) return;
    try {
      setRecentSearches(prev => {
        const updated = [term.trim(), ...prev.filter(t => t.toLowerCase() !== term.trim().toLowerCase())].slice(0, 7);
        localStorage.setItem('syncparts_recent_searches', JSON.stringify(updated));
        return updated;
      });
    } catch (e) {
      console.error('Failed to save recent search', e);
    }
  };

  const removeRecentSearch = (term: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      setRecentSearches(prev => {
        const updated = prev.filter(t => t !== term);
        localStorage.setItem('syncparts_recent_searches', JSON.stringify(updated));
        return updated;
      });
    } catch (e) {
      console.error('Failed to remove recent search', e);
    }
  };

  // Sync back to URL when pressing enter or searching
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams({ q: query, category: selectedCategory });
    saveRecentSearch(query);
  };

  const handleRecentClick = (term: string) => {
    setQuery(term);
    setSearchParams({ q: term, category: selectedCategory });
    saveRecentSearch(term);
  };

  const filteredData = useMemo(() => {
    let q = query.toLowerCase().trim();
    if (!q && selectedCategory === 'all') return compatibilityData;

    return compatibilityData.filter(item => {
      const matchBrand = item.brand.toLowerCase().includes(q);
      const matchBase = item.baseModel.toLowerCase().includes(q);
      const matchCompat = item.compatibleModels.some(m => m.toLowerCase().includes(q));
      
      const searchMatch = !q || matchBrand || matchBase || matchCompat;
      const categoryMatch = selectedCategory === 'all' || item.category === selectedCategory;

      return searchMatch && categoryMatch;
    });
  }, [query, selectedCategory]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      {/* Search Header Area */}
      <div className="premium-card rounded-[24px] p-6 sm:p-8 mb-8 backdrop-blur-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-600/5 blur-[100px] rounded-full pointer-events-none" />
        
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 mb-6 relative z-10">
          <div className="flex-1 relative group">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-500 group-focus-within:text-blue-400 transition-colors">
              <Search className="w-5 h-5" />
            </div>
            <input 
              type="text" 
              placeholder="Search by model, brand, or part number..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-[#0B1120] border border-white/10 hover:border-white/20 rounded-[16px] pl-12 pr-4 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-medium shadow-inner"
            />
          </div>
          <button 
            type="submit"
            className="bg-white text-slate-900 hover:bg-slate-200 px-8 py-4 rounded-[16px] font-bold transition-colors shrink-0"
          >
            Find Parts
          </button>
        </form>

        {/* Recent Searches */}
        {recentSearches.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap mb-6 relative z-10">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest flex items-center gap-1.5 mr-2">
              <Clock className="w-3.5 h-3.5" /> Recent
            </span>
            {recentSearches.map((term, i) => (
              <button
                key={i}
                onClick={() => handleRecentClick(term)}
                className="group flex items-center gap-1.5 px-3 py-1.5 rounded-[10px] bg-white/5 border border-white/5 text-sm font-medium text-slate-300 hover:bg-white/10 hover:text-white transition-all cursor-pointer"
              >
                {term}
                <div 
                  onClick={(e) => removeRecentSearch(term, e)}
                  className="p-0.5 rounded-full hover:bg-white/10 text-slate-500 hover:text-slate-300 transition-colors opacity-0 group-hover:opacity-100"
                >
                  <X className="w-3 h-3" />
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Filter Pills */}
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide relative z-10">
          <Filter className="w-5 h-5 text-slate-500 shrink-0 mr-2" />
          <FilterPill 
            active={selectedCategory === 'all'} 
            onClick={() => setSelectedCategory('all')}
          >
            All Categories
          </FilterPill>
          {(Object.entries(categoriesMap) as [PartCategory, any][]).map(([key, cat]) => (
            <FilterPill 
              key={key} 
              active={selectedCategory === key} 
              onClick={() => setSelectedCategory(key)}
            >
              {cat.label}
            </FilterPill>
          ))}
        </div>
      </div>

      {/* Results Area */}
      <div className="mb-6 flex justify-between items-end">
        <div>
          <h2 className="text-xl font-bold text-white mb-1">Search Results</h2>
          <p className="text-slate-400 text-sm">Found <span className="text-blue-400 font-semibold">{filteredData.length}</span> matching compatibility clusters</p>
        </div>
      </div>

      {filteredData.length > 0 ? (
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredData.map(item => (
              <ResultCard key={item.id} item={item} query={query} />
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="text-center py-24 premium-card rounded-[24px]">
          <HardDrive className="w-12 h-12 text-slate-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white">No parts found</h3>
          <p className="text-slate-500 mt-2 max-w-sm mx-auto">Try adjusting your search terms or relaxing your category filters.</p>
        </div>
      )}
    </div>
  );
}

function FilterPill({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode; key?: React.Key }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-[12px] text-sm font-medium whitespace-nowrap transition-colors border ${
        active 
          ? 'bg-blue-500/10 border-blue-500/30 text-blue-400 cursor-default shadow-sm' 
          : 'bg-[#111827] border-white/5 text-slate-400 hover:text-slate-200 hover:bg-white/5 hover:border-white/10'
      }`}
    >
      {children}
    </button>
  );
}

function ResultCard({ item, query }: { item: CompatibilityCluster; query: string; key?: React.Key }) {
  const categoryInfo = categoriesMap[item.category];
  const Icon = CategoryIconMap[item.category] || Smartphone;
  const [personalNote, setPersonalNote] = useState<string>('');
  const [isEditingNote, setIsEditingNote] = useState(false);
  const [draftNote, setDraftNote] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem(`syncparts_note_${item.id}`);
    if (saved) {
      setPersonalNote(saved);
    }
  }, [item.id]);

  const handleSaveNote = () => {
    setPersonalNote(draftNote);
    localStorage.setItem(`syncparts_note_${item.id}`, draftNote);
    setIsEditingNote(false);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="premium-card rounded-[20px] overflow-hidden flex flex-col group relative"
    >
      {/* Top Banner */}
      <div className="p-5 border-b border-white/5 flex flex-col gap-3 relative overflow-hidden bg-[#151e2e]/30">
        <div className="flex justify-between items-start">
          <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-bold bg-white/5 border border-white/10 text-slate-300 uppercase tracking-widest">
            {item.brand}
          </span>
          <span className={`text-[11px] font-medium px-2 py-0.5 rounded flex items-center gap-1.5 ${categoryInfo.color}`}>
            <Icon className="w-3 h-3" />
            {categoryInfo.label}
          </span>
        </div>
        
        <div>
          <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider mb-1">Primary Base / Name</p>
          <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
            <Highlight text={item.baseModel} highlight={query} />
          </h3>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex-1 flex flex-col bg-[#111827]">
        <div className="flex items-center gap-2 mb-3">
          <Smartphone className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Cross-Compatible Models</span>
        </div>
        <ul className="flex flex-wrap gap-2">
          {item.compatibleModels.map((model, idx) => (
            <li key={idx} className="bg-white/5 border border-white/5 px-3 py-1.5 rounded-lg text-sm text-slate-200 font-medium hover:bg-white/10 hover:border-white/10 transition-colors cursor-default">
              <Highlight text={model} highlight={query} />
            </li>
          ))}
        </ul>
        
        {item.notes && (
          <div className="mt-4 pt-4 border-t border-white/5">
            <p className="text-xs text-slate-500"><span className="text-slate-400 font-medium">Notes:</span> {item.notes}</p>
          </div>
        )}

        {/* Personal Note Section */}
        <div className="mt-4 pt-4 border-t border-white/5 mt-auto">
          <div className="flex items-center justify-between mb-2">
             <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Personal Notes (Admin)</span>
             {!isEditingNote && (
               <button 
                 onClick={() => {
                   setDraftNote(personalNote);
                   setIsEditingNote(true);
                 }}
                 className="text-xs text-blue-400 hover:text-blue-300 font-medium transition-colors border border-blue-500/30 px-2 py-1 rounded-md bg-blue-500/10 hover:bg-blue-500/20"
               >
                 {personalNote ? 'Edit Note' : '+ Add Note'}
               </button>
             )}
          </div>
          
          {isEditingNote ? (
            <div className="flex flex-col gap-2 mt-2">
              <textarea 
                className="w-full bg-[#0B1120] border border-white/10 shadow-inner rounded-lg p-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 resize-none transition-colors"
                rows={2}
                placeholder="Add your personal reminder or tip here..."
                value={draftNote}
                onChange={e => setDraftNote(e.target.value)}
                autoFocus
              />
              <div className="flex justify-end gap-2 mt-1">
                <button 
                  onClick={() => setIsEditingNote(false)}
                  className="px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-slate-300 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSaveNote}
                  className="px-4 py-1.5 bg-white text-slate-900 text-xs font-bold rounded-lg transition-colors hover:bg-slate-200 shadow-sm"
                >
                  Save
                </button>
              </div>
            </div>
          ) : personalNote ? (
            <div className="bg-[#0B1120]/50 border border-white/5 rounded-lg p-3 mt-2">
              <p className="text-sm text-slate-300 whitespace-pre-wrap leading-relaxed">{personalNote}</p>
            </div>
          ) : null}
        </div>
      </div>
    </motion.div>
  );
}
