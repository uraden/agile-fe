import React from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Search from "./components/Search";
import { useState } from "react";
import { faker } from '@faker-js/faker';
import "./App.css";


function App() {
  const [searchValue, setSearchValue] = useState("");
  const [isSearchSubmitted, setIsSearchSubmitted] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const clearInput = () => {
    setSearchValue("");
  };

  const onSearch = async () => {
    try {
      setError(null); 
      setCurrentPage(1);
      const getAnimalType = faker.animal[searchValue];

      const results = [...new Array(100)].map((_, index) => {
        const name = getAnimalType();
        return {
          name,
          id: index + 1,
          url: faker.internet.url(),
          description: faker.lorem.sentence(),
          image: faker.image.urlLoremFlickr({ category: searchValue, width: 640, height: 480 }),
        };
      });

      const filteredResults = results.filter(animal => animal.name !== "Unknown animal type");

      if (filteredResults.length === 0) {
        setError(`No results found for '${searchValue}'. Try looking for insect, fish.`);
        setData([{ type: `No results found for "${searchValue}"`, id: 0 }]);
      } else {
        setData(filteredResults);
      }

      setIsSearchSubmitted(true);
    } catch {
      if (searchValue) {
        setError(`No results found for '${searchValue}'.<br /> Try looking for <span style="font-weight:bold"> insect, fish, horse, crocodilia, bear, cetacean, cow, lion, rabbit,</span> <br /> <span style="font-weight:bold"> cat, snake, dog, bird. </span>`);
      } else {
        setError(`Try looking for Try looking for <span style="font-weight:bold"> insect, fish, horse, crocodilia, bear, cetacean, cow, lion, rabbit, cat, snake, dog, bird. </span>`);
      }
    }
  };


  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch();
      setSelectedItem(null);
    }
  };

  return (
    <>
      <Header 
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        handleKeyDown={handleKeyDown}
        onSearch={onSearch}
        clearInput={clearInput}
        showSearchInHeader={isSearchSubmitted}
        setIsSearchSubmitted={setIsSearchSubmitted}
        setSelectedItem={setSelectedItem}
      />

      <Search
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        clearInput={clearInput}
        handleKeyDown={handleKeyDown}
        onSearch={onSearch}
        isSearchSubmitted={isSearchSubmitted}
        showSearchInHeader={isSearchSubmitted}
        data={data}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
        error={error}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      <Footer />
    </>
  );
}

export default App;
