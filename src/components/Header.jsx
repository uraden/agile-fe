import React from "react";
import { TbGridDots } from "react-icons/tb";
import PropTypes from "prop-types";

const Header = ({
  searchValue,
  setSearchValue,
  handleKeyDown,
  clearInput,
  showSearchInHeader,
  setIsSearchSubmitted,
}) => {
  return (
    <header className="header-main">
      {
        showSearchInHeader ? (
          <div className="header-search">
            <div>
            <img
              src="/images/agile-icon.png"
              alt="Agile Web Icon"
              className="agile-icon"
              onClick={() => {
                setIsSearchSubmitted(false);
                setSearchValue("");
              }}

            />
            
            </div>
          
            <div className="search-container">
            <input
              onKeyDown={handleKeyDown}
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
                role="button"
                aria-label="clear-icon"
                className="clear-icon"
                onClick={clearInput}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
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

            
          </div>
        ) : (
          <>
            <div>
              <h1 style={{ margin: 0, fontSize: "1.2rem" }}>
                Agile Content Frontend task
              </h1>
            </div>

            <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
              <TbGridDots size={24} data-testid="TbGridDots" />
              <img
                src="https://placehold.co/28?text=:+)&font=roboto"
                alt="user avatar"
                style={{ borderRadius: "50%" }}
              />
            </div>
          </>
        )
      }
    </header>
  );
};

Header.propTypes = {
  searchValue: PropTypes.string,
  setSearchValue: PropTypes.func,
  handleKeyDown: PropTypes.func,
  onSearch: PropTypes.func,
  clearInput: PropTypes.func,
  showSearchInHeader: PropTypes.bool,
  setIsSearchSubmitted: PropTypes.func,
};

export default Header;
