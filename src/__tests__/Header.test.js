
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from '../components/Header';

describe('Header component', () => {
  const mockSetSearchValue = jest.fn();
  const mockSetIsSearchSubmitted = jest.fn();
  const mockClearInput = jest.fn();
  const mockHandleKeyDown = jest.fn();

  const defaultProps = {
    searchValue: '',
    setSearchValue: mockSetSearchValue,
    handleKeyDown: mockHandleKeyDown,
    clearInput: mockClearInput,
    showSearchInHeader: false,
    setIsSearchSubmitted: mockSetIsSearchSubmitted,
  };

  it('renders header text when showSearchInHeader is false', () => {
    render(<Header {...defaultProps} />);
    expect(screen.getByText(/Agile Content Frontend task/i)).toBeInTheDocument();
  });
  
  it('renders user avatar when showSearchInHeader is false', () => {
    render(<Header {...defaultProps} />);
    expect(screen.getByAltText(/user avatar/i)).toBeInTheDocument();
  });
  
  it('renders grid dots icon when showSearchInHeader is false', () => {
    render(<Header {...defaultProps} />);
    expect(screen.getByTestId('TbGridDots')).toBeInTheDocument();
  });
  
  

  it('renders search input when showSearchInHeader is true', () => {
    render(<Header {...defaultProps} showSearchInHeader={true} />);
    expect(screen.getByPlaceholderText(/Search.../i)).toBeInTheDocument();
    expect(screen.getByAltText(/Agile Web Icon/i)).toBeInTheDocument();
  });

  it('calls setSearchValue when typing in the search input', () => {
    render(<Header {...defaultProps} showSearchInHeader={true} />);

    const input = screen.getByPlaceholderText(/Search.../i);
    fireEvent.change(input, { target: { value: 'lion' } });
    expect(mockSetSearchValue).toHaveBeenCalledWith('lion');
  });

  it('calls clearInput when clear icon is clicked', () => {
    render(<Header {...defaultProps} showSearchInHeader={true} searchValue="lion" />);

    const clearIcon = screen.getByRole('button', { name: /clear-icon/i });
    fireEvent.click(clearIcon);
    expect(mockClearInput).toHaveBeenCalled();
  });

  it('resets search input and sets isSearchSubmitted to false when Agile icon is clicked', () => {
    render(<Header {...defaultProps} showSearchInHeader={true} />);

    const agileIcon = screen.getByAltText(/Agile Web Icon/i);
    fireEvent.click(agileIcon);

    expect(mockSetIsSearchSubmitted).toHaveBeenCalledWith(false);
    expect(mockSetSearchValue).toHaveBeenCalledWith('');
  });
});
