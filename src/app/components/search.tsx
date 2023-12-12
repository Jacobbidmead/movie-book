"use client";

import React, { useState, useEffect } from "react";

interface SearchProps {
  onSearch: (query: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      onSearch(inputValue);
    }, 1000); // Adjust the delay as needed

    return () => clearTimeout(delayDebounce);
  }, [inputValue, onSearch]);

  return (
    <input
      type="text"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      placeholder="Search for a movie..."
    />
  );
};

export default Search;
