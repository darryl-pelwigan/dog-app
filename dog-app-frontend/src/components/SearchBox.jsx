import React, { useRef } from 'react';

const SearchBox = ({ searchValue, handleSearch }) => {
  const inputSearch = useRef('');

  const getSearchInput = () => {
    handleSearch(inputSearch.current.value);
  };
  return (
    <input
      ref={inputSearch}
      type="text"
      placeholder="Search Dog Name"
      value={searchValue}
      onChange={getSearchInput}
      className="w-full rounded-md text-lg p-4 border-2 border-gray-200"
    />
  );
};

export default SearchBox;
