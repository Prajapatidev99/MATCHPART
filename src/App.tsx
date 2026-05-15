import React from 'react';
import { Routes, Route } from 'react-router';
import Layout from './components/Layout';
import Home from './pages/Home';
import SearchPage from './pages/Search';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="search" element={<SearchPage />} />
        {/* Placeholder for admin */}
        <Route path="admin" element={<div className="p-8 text-center text-slate-400">Admin Panel Coming Soon</div>} />
      </Route>
    </Routes>
  );
}

