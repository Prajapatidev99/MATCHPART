import React from 'react';
import { Search, ArrowRight, Database, Layers, Smartphone, Battery, Cpu, Square, Camera, HardDrive, Volume2, Command } from 'lucide-react';
import { motion } from 'motion/react';
import { Link, useOutletContext } from 'react-router';
import { categoriesMap } from '../data';

const IconMap: Record<string, React.ElementType> = {
  smartphone: Smartphone,
  'battery-charging': Battery,
  cpu: Cpu,
  square: Square,
  camera: Camera,
  shield: HardDrive, // rep back cover
  layers: Layers,
  'volume-2': Volume2
};

export default function Home() {
  const { openSearch } = useOutletContext<{ openSearch: () => void }>();

  const statCards = [
    { label: "Models Indexed", value: "15,234", icon: Database, trend: "+124 this week" },
    { label: "Verified Combos", value: "8,942", icon: Layers, trend: "Daily updates" }
  ];

  const categoriesOverview = Object.entries(categoriesMap).slice(0, 6);

  return (
    <div className="flex flex-col w-full relative">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[500px] bg-blue-600/5 blur-[150px] rounded-full pointer-events-none" />

      {/* Hero Section */}
      <section className="pt-24 md:pt-32 pb-20 relative z-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center w-full">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs font-medium tracking-wide mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          Platform Live • Updated Today
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl lg:text-[72px] font-bold text-white tracking-tight leading-[1.05] mb-6"
        >
          Find Mobile Part <br className="hidden sm:block"/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-500">
             Compatibility Instantly
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 font-light"
        >
          The definitive cross-compatibility database designed for professional repair technicians. Combos, boards, batteries, and more.
        </motion.p>

        {/* Raycast style Mock Input */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="max-w-2xl mx-auto relative group cursor-pointer"
          onClick={openSearch}
        >
          {/* subtle outer glow */}
          <div className="absolute -inset-[1px] bg-gradient-to-r from-blue-500/30 to-cyan-500/30 rounded-[18px] blur-sm opacity-0 group-hover:opacity-100 transition duration-500" />
          
          <div className="relative bg-[#111827] border border-white/10 hover:border-white/20 rounded-[18px] p-4 flex items-center shadow-lg transition-colors">
            <Search className="w-6 h-6 text-slate-400 ml-2 shrink-0" />
            <div className="flex-1 ml-4 text-left text-slate-500 text-lg">
              Search "Redmi Note 10 combo"...
            </div>
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-semibold text-slate-400">
              <Command className="w-3.5 h-3.5" />
              <kbd>K</kbd>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Dashboard Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {statCards.map((stat, i) => (
              <div key={i} className="premium-card rounded-[20px] p-6 lg:p-8 flex flex-col justify-between">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-10">
                  <stat.icon className="w-5 h-5 text-slate-300" />
                </div>
                <div>
                  <h4 className="text-3xl font-bold text-white mb-2">{stat.value}</h4>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-slate-400">{stat.label}</p>
                    <span className="text-xs font-medium text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full">{stat.trend}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="premium-card rounded-[20px] p-6 lg:p-8 flex flex-col items-start justify-between relative overflow-hidden group">
            <div className="absolute right-0 top-0 w-32 h-32 bg-blue-500/20 blur-[50px] rounded-full pointer-events-none group-hover:bg-blue-500/30 transition-colors" />
            <div className="relative z-10 w-full">
               <div className="flex justify-between items-center mb-6">
                 <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                   <Smartphone className="w-5 h-5 text-blue-400" />
                 </div>
                 <Link to="/search" className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1">Browse <ArrowRight className="w-3 h-3"/></Link>
               </div>
               <h4 className="text-xl font-bold text-white mb-2">Explore the Database</h4>
               <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                 Access thousands of display, battery, and CC board compatibility charts. Stop losing money on wrong parts.
               </p>
               <button onClick={openSearch} className="w-full py-3 rounded-xl bg-white text-slate-900 font-semibold text-sm hover:bg-slate-200 transition-colors">
                 Start Searching
               </button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full relative z-10 border-t border-white/5 mt-8">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Categories</h2>
            <p className="text-slate-400 text-sm mt-1">Browse by component type</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categoriesOverview.map(([key, cat]) => {
            const Icon = IconMap[cat.icon] || Layers;
            return (
              <Link 
                to={`/search?category=${key}`} 
                key={key}
                className="premium-card rounded-[18px] p-5 flex flex-col items-center justify-center text-center group cursor-pointer"
              >
                <div className={`p-3 rounded-xl mb-4 bg-white/5 border border-white/10 group-hover:bg-blue-500/10 group-hover:border-blue-500/20 group-hover:text-blue-400 transition-all text-slate-400`}>
                  <Icon className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">{(cat as any).label}</h3>
              </Link>
            );
          })}
        </div>
      </section>

      {/* App Download Promo */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full relative z-10">
        <div className="bg-[#111827] border border-white/10 rounded-[24px] p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row items-center gap-10 premium-card">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-600/10 blur-[100px] rounded-full pointer-events-none" />
          
          <div className="flex-1 relative z-10">
            <h2 className="text-3xl font-bold text-white mb-4 tracking-tight">The Technician's Pocket Tool</h2>
            <p className="text-slate-400 text-lg mb-8 max-w-md font-light leading-relaxed">
              Bring the power of MatchPart anywhere. Fully offline capable, fast, and constantly updated. Available for iOS and Android.
            </p>
            <div className="flex items-center gap-4">
              <button className="bg-white text-slate-900 font-semibold px-6 py-3 rounded-xl text-sm hover:opacity-90 transition-opacity">
                Download App
              </button>
              <button className="bg-[#1F2937] border border-white/10 text-white font-semibold px-6 py-3 rounded-xl text-sm hover:bg-[#374151] transition-colors">
                View Features
              </button>
            </div>
          </div>

          <div className="w-full md:w-[300px] flex justify-center relative z-10">
            <div className="w-[200px] h-[350px] bg-[#0B1120] border-4 border-[#1F2937] rounded-[36px] shadow-2xl relative overflow-hidden flex flex-col">
              <div className="absolute top-0 inset-x-0 h-6 bg-[#1F2937] rounded-b-xl w-[40%] mx-auto z-20" />
              <div className="flex-1 p-4 pt-10 flex flex-col gap-3 relative">
                 <div className="w-full h-8 bg-[#111827] rounded-md border border-white/5" />
                 <div className="w-full h-24 bg-[#111827] rounded-xl border border-white/5 mt-2" />
                 <div className="w-full h-16 bg-[#111827] rounded-xl border border-white/5" />
                 <div className="w-full h-16 bg-[#111827] rounded-xl border border-white/5" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
