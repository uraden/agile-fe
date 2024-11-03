import React from "react";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Modal from 'react-modal';


const Search = ({
  searchValue,
  setSearchValue,
  clearInput,
  handleKeyDown,
  onSearch,
  isSearchSubmitted,
  data,
  selectedItem,
  setSelectedItem,
  currentPage,
  setCurrentPage,
  error,
}) => {
  const [modalIsOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768 && selectedItem) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };
    
    window.addEventListener("resize", handleResize);
    handleResize(); 
    return () => window.removeEventListener("resize", handleResize);
  }, [selectedItem]);


  const handleItemClick = (item) => {
    setSelectedItem(item);
    if (window.innerWidth < 768) {
      setIsOpen(true); 
    }
  };

  const handleSearch = () => {
    onSearch();
    setSelectedItem(null);
  };

  const handleKeyDownWrapper = (event) => {
    setSelectedItem(null);
    handleKeyDown(event);
    if (event.key === "Enter") {
      onSearch();
    }
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const itemsPerPage = 10;
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const currentData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="main-search">
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Item Details"
        className="modal"
        overlayClassName="overlay"
        ariaHideApp={false}
      >
        <button onClick={closeModal} className="modal-close-btn">×</button>
        {selectedItem && (
          <div 
            className="modal-content"
             contentLabel="Item Details"
            >
            <img src={selectedItem.image} alt={selectedItem.name} className="modal-image" />
            <a href={selectedItem.url} target="_blank" rel="noopener noreferrer" className="modal-url">
              {selectedItem.url}
            </a>
            <h3 className="modal-title">{selectedItem.name}</h3>
            <p className="modal-description">{selectedItem.description}</p>
          </div>
        )}
      </Modal>
      {isSearchSubmitted ? (
        <div className="search-results-container">
          <div className="search-results">
            {error ? (
              <div dangerouslySetInnerHTML={{ __html: error }} />
            ) : (
              currentData.map((item) => (
                <div
                  key={item.id}
                  className="search-result"
                  onClick={() => handleItemClick(item)}
                  data-testid={`search-item-${item.id}`}
                >
                  <div style={{ color: "#006621" }} className="search-result-url">
                    {item.url}
                  </div>
                  <div>
                    <h3 className="search-result-title">{item.name}</h3>
                  </div>
                  <p className="search-result-description">
                    {item.description}
                  </p>
                </div>
              ))
            )}
            {error ? null : (
              <div className="pagination">
                {Array.from({ length: totalPages }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handlePageChange(index + 1)}
                    style={{
                      backgroundColor: currentPage === index + 1 ? "#006621" : "transparent",
                      color: currentPage === index + 1 ? "#fff" : "#006621",
                    }}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="detail-view">
            {selectedItem && (
              <div className="detail-info">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.name}
                  className="detail-image"
                />
                <a
                  className="detail-url"
                  href={selectedItem.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {selectedItem.url}
                </a>
                <div className="detail-name">{selectedItem.name}</div>
                <div className="detail-text">{selectedItem.description}</div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="centered-content">
          <img
            src="/images/agile.webp"
            alt="Agile Web Logo"
            className="agile-logo"
          />
          <div className="search-container">
            <input
              onKeyDown={handleKeyDownWrapper}
              type="text"
              placeholder="Search..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="input-search"
            />

            <svg
              className="search-icon"
              focusable="false"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
            </svg>

            {searchValue && (
              <svg
                className="clear-icon"
                onClick={clearInput}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                aria-label="Clear search input"
              >
                <path
                  d="M18 6L6 18M6 6l12 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </div>

          <button
            className="search-button"
            onClick={handleSearch}
            disabled={!searchValue}
            aria-label="Search"
          >
            Search
          </button>
          {error && (
            <div
              style={{ marginTop: "20px" }}
              dangerouslySetInnerHTML={{ __html: error }}
            />
          )}
        </div>
      )}
    </div>
  );
};

Search.propTypes = {
  searchValue: PropTypes.string.isRequired,
  setSearchValue: PropTypes.func.isRequired,
  clearInput: PropTypes.func.isRequired,
  handleKeyDown: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  isSearchSubmitted: PropTypes.bool.isRequired,
  data: PropTypes.array.isRequired,
  selectedItem: PropTypes.object,
  setSelectedItem: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  error: PropTypes.string,
};

export default Search;
