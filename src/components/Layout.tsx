import React from "react";
import ImageContainer from "./ImageContainer"; 
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";
import RecentSearches from "./RecentSearches";
import ThemeToggle from "./ThemeToggle";

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between p-4 bg-blue-600 text-white shadow-md">
        <h1 className="text-2xl font-bold flex items-center">
          🎵 Sound Search
        </h1>
        <ThemeToggle />
      </header>

      {/* Main Grid */}
      <main className="flex-1 container mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left: Search */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <SearchBar />
          <SearchResults />
        </div>

        {/* Center: Image Container (placeholder for now) */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex items-center justify-center">
         <ImageContainer />
        </div>

        {/* Right: Recent Searches */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <RecentSearches />
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-4 text-sm text-gray-500">
        © 2025 Sound Search App
      </footer>
    </div>
  );
};

export default Layout;
