import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import SafetyCard from '../components/SafetyCard';
import FilterPanel from '../components/FilterPanel';
import axios from 'axios';
import { Globe, Shield, AlertTriangle } from 'lucide-react';

const Home = () => {
    const [countries, setCountries] = useState([]);
    const [filteredCountries, setFilteredCountries] = useState([]);
    const [filters, setFilters] = useState({
        minScore: 0,
        minLGBTQ: 0,
        minWomen: 0,
        minPolitical: 0
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('http://localhost:8000/all-countries');
                setCountries(res.data);
                setFilteredCountries(res.data);
            } catch (error) {
                console.error("Error fetching home data:", error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const filtered = countries.filter(country => {
            return (
                country.OverallScore >= filters.minScore &&
                country.LGBTQSafety >= filters.minLGBTQ &&
                country.WomensSafety >= filters.minWomen &&
                country.PoliticalStability >= filters.minPolitical
            );
        });
        setFilteredCountries(filtered);
    }, [filters, countries]);

    // Sort by score for display
    const displayCountries = [...filteredCountries].sort((a, b) => b.OverallScore - a.OverallScore);
    const topCountries = displayCountries.slice(0, 6); // Show top 6 of filtered

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            {/* Hero Section */}
            <div className="bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">
                        Travel with <span className="text-blue-600">Confidence</span>
                    </h1>
                    <p className="text-xl text-gray-500 mb-10 max-w-2xl mx-auto">
                        Real-time safety scores, advisories, and insights for every country.
                    </p>
                    <SearchBar />
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

                {/* Filter Panel */}
                <FilterPanel filters={filters} setFilters={setFilters} />

                {/* Popular / Filtered Destinations */}
                <div className="mb-16">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold text-gray-900">
                            {filters.minScore > 0 || filters.minLGBTQ > 0 ? 'Filtered Results' : 'Safest Destinations'}
                        </h2>
                        <span className="text-gray-500">{filteredCountries.length} countries found</span>
                    </div>

                    {displayCountries.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {displayCountries.slice(0, 9).map((country, index) => (
                                <SafetyCard key={index} country={country} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 text-gray-500">
                            No countries match your criteria.
                        </div>
                    )}
                </div>

                {/* Global Insights Widget */}
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8">Global Safety Insights</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-blue-50 rounded-full text-blue-600">
                                <Globe className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">World Average</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {countries.length > 0
                                        ? Math.round(countries.reduce((acc, c) => acc + c.OverallScore, 0) / countries.length)
                                        : '...'}
                                    /100
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-green-50 rounded-full text-green-600">
                                <Shield className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Safest Country</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {countries.length > 0
                                        ? countries.reduce((prev, current) => (prev.OverallScore > current.OverallScore) ? prev : current).Country
                                        : '...'}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-yellow-50 rounded-full text-yellow-600">
                                <AlertTriangle className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Countries Tracked</p>
                                <p className="text-2xl font-bold text-gray-900">{countries.length}</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Home;
