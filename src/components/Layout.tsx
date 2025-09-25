import React from "react";
import ImageContainer from "./ImageContainer"; 
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";
import TopStatus from "./TopStatus"
import RecentSearches from "./RecentSearches";
import ThemeToggle from "./ThemeToggle";

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-brand-600/95 backdrop-blur text-white">
        <div className="max-w-7xl mx-auto px-5 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-white/15">
              🎵
            </span>
            <h1 className="text-xl font-semibold tracking-tight">Sound Search</h1>
          </div>
          <ThemeToggle />
        </div>
    </header>
      {/* Top status bar */}
    <TopStatus />

      {/* Main Grid */}
    <main className="max-w-7xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Player FIRST on mobile, middle on desktop */}
      <section id="player" className="md:col-span-1 order-1 md:order-2">
        <ImageContainer />
      </section>

      {/* Search + Results SECOND on mobile, left on desktop */}
      <section className="app-card p-5 md:col-span-1 order-2 md:order-1">
        <SearchBar />
        <div className="mt-4">
          <SearchResults />
        </div>
      </section>

      {/* Recent searches THIRD  */}
      <aside className="app-card p-5 md:col-span-1 order-3 md:order-3">
        <RecentSearches />
      </aside>
</main>



      {/* Footer */}
      <footer className="text-center py-4 text-sm text-gray-500">
        © 2025 Sound Search App By Inbal Grunfeld 
      </footer>
    </div>
  );
};

export default Layout;
