import React from "react";
import SearchBar from "../components/SearchBar";
import SearchResults from "../components/SearchResults";
import RecentSearches from "../components/RecentSearches";

const Home: React.FC = () => {
  return (
    <div>
      <SearchBar />
      <SearchResults />
      <RecentSearches />
    </div>
  );
};

export default Home;
