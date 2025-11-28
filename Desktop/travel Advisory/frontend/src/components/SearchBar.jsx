import React, { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SearchBar = () => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSuggestions = async () => {
            if (query.length > 0) {
                try {
                    const response = await axios.get(`http://localhost:8000/search?query=${query}`);
                    setSuggestions(response.data);
                    setIsOpen(true);
                } catch (error) {
                    console.error("Error fetching suggestions:", error);
                }
            } else {
                setSuggestions([]);
                setIsOpen(false);
            }
        };

        const debounceTimer = setTimeout(fetchSuggestions, 300);
        return () => clearTimeout(debounceTimer);
    }, [query]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (country) => {
        setQuery(country);
        setIsOpen(false);
        navigate(`/country/${country}`);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query) {
            navigate(`/country/${query}`);
        }
    };

    return (
        <div ref={wrapperRef} className="relative w-full max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="relative">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                        type="text"
                        className="w-full pl-12 pr-4 py-4 rounded-full border border-gray-200 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-lg transition-all"
                        placeholder="Where do you want to go?"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>
            </form>

            {isOpen && suggestions.length > 0 && (
                <div className="absolute z-10 w-full mt-2 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                    <ul>
                        {suggestions.map((country, index) => (
                            <li
                                key={index}
                                className="px-6 py-3 hover:bg-gray-50 cursor-pointer text-gray-700 font-medium transition-colors"
                                onClick={() => handleSelect(country)}
                            >
                                {country}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default SearchBar;
