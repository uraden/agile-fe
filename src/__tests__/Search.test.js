import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Search from '../components/Search';

describe('Search component', () => {
    const mockSetSearchValue = jest.fn();
    const mockClearInput = jest.fn();
    const mockHandleKeyDown = jest.fn();
    const mockOnSearch = jest.fn();
    const mockSetSelectedItem = jest.fn();
    const mockSetCurrentPage = jest.fn();

    const defaultProps = {
        searchValue: '',
        setSearchValue: mockSetSearchValue,
        clearInput: mockClearInput,
        handleKeyDown: mockHandleKeyDown,
        onSearch: mockOnSearch,
        isSearchSubmitted: false,
        data: [],
        selectedItem: null,
        setSelectedItem: mockSetSelectedItem,
        currentPage: 1,
        setCurrentPage: mockSetCurrentPage,
        error: null,
    };

    it('renders search input and button', () => {
        render(<Search {...defaultProps} />);
        expect(screen.getByPlaceholderText(/Search.../i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Search/i })).toBeInTheDocument();
    });

    it('calls setSearchValue when typing in the search input', () => {
        render(<Search {...defaultProps} />);
        const input = screen.getByPlaceholderText(/Search.../i);
        fireEvent.change(input, { target: { value: 'fish' } });
        expect(mockSetSearchValue).toHaveBeenCalledWith('fish');
    });

    it('calls clearInput when clear icon is clicked', () => {
        const mockClearInput = jest.fn();
        render(<Search {...defaultProps} showSearchInHeader={true} searchValue="lion" clearInput={mockClearInput} />);
        const clearIconButton = screen.getByLabelText(/clear search input/i);
        fireEvent.click(clearIconButton);
        expect(mockClearInput).toHaveBeenCalled();
    });

    it('calls onSearch when search button is clicked', () => {
        render(<Search {...defaultProps} searchValue="apple" />);
        const searchButton = screen.getByRole('button', { name: /Search/i });
        fireEvent.click(searchButton);
        expect(mockOnSearch).toHaveBeenCalled();
    });

    it('renders error message when error is provided', () => {
        const errorProps = { ...defaultProps, error: 'An error occurred' };
        render(<Search {...errorProps} />);
        expect(screen.getByText(/An error occurred/i)).toBeInTheDocument();
    });

    it('opens modal when an item is clicked on small screens', async () => {
        const item = { id: 1, image: 'image.jpg', url: 'http://example.com', name: 'Example Item', description: 'Description of item' };
        const props = { ...defaultProps, data: [item], isSearchSubmitted: true };

        window.innerWidth = 500;
        window.dispatchEvent(new Event('resize'));
        render(<Search {...props} />);

        fireEvent.click(screen.getByText('Example Item'));
        await waitFor(() => {
            expect(screen.getByLabelText(/Item Details/i)).toBeInTheDocument();
        });
    });


    it('does not open modal on large screens', () => {
        const item = { id: 1, image: 'image.jpg', url: 'http://example.com', name: 'Example Item', description: 'Description of item' };
        const largeScreenProps = { ...defaultProps, data: [item], isSearchSubmitted: true, selectedItem: item };

        window.innerWidth = 1024; 
        render(<Search {...largeScreenProps} />);

        fireEvent.click(screen.getByRole('heading', { name: /Example Item/i }));

        expect(screen.queryByText(/Item Details/i)).not.toBeInTheDocument();
    });

});
