import React, { useState } from "react";
import SearchBox from "../components/SearchBox";

const SearchReceiver = () => {
  const [searchResults, setSearchResults] = useState(null);
  const [searchPerformed, setSearchPerformed] = useState(null);

  const getSearchResults = (data, isSearched) => {
    setSearchResults(data);
    setSearchPerformed(isSearched);
  };

  return (
    <>
      <h1>Send Money</h1>
      <SearchBox sendData={getSearchResults} />
      <div>
        {searchPerformed && searchResults == null && <p>No users found.</p>}

        {Array.isArray(searchResults) &&
          searchResults.length > 0 &&
          searchResults.map((user) => (
            <div key={user.username}>
              <h3>{`${user.firstName} ${user.lastName}`}</h3>
              <pre>{`${user.contact}     ${user.walletId}`}</pre>
            </div>
          ))}
      </div>
    </>
  );
};

export default SearchReceiver;
