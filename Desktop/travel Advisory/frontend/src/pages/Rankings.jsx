import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Rankings = () => {
    const [countries, setCountries] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('http://localhost:8000/all-countries');
                setCountries(res.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    const RankingTable = ({ title, metric }) => {
        const sorted = [...countries].sort((a, b) => b[metric] - a[metric]).slice(0, 10);

        return (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8">
                <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
                    <h3 className="text-lg font-bold text-gray-900">{title}</h3>
                </div>
                <table className="w-full">
                    <thead>
                        <tr className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            <th className="px-6 py-3">Rank</th>
                            <th className="px-6 py-3">Country</th>
                            <th className="px-6 py-3 text-right">Score</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {sorted.map((country, index) => (
                            <tr
                                key={country.Country}
                                onClick={() => navigate(`/country/${country.Country}`)}
                                className="hover:bg-gray-50 cursor-pointer transition-colors"
                            >
                                <td className="px-6 py-4 text-sm text-gray-500">#{index + 1}</td>
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">{country.Country}</td>
                                <td className="px-6 py-4 text-sm text-gray-900 text-right font-bold">{country[metric]}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Global Safety Rankings</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <RankingTable title="Safest Countries Overall" metric="OverallScore" />
                    <RankingTable title="Best Healthcare" metric="HealthcareScore" />
                    <RankingTable title="Best Women's Safety" metric="WomensSafety" />
                    <RankingTable title="Best LGBTQ+ Safety" metric="LGBTQSafety" />
                </div>
            </div>
        </div>
    );
};

export default Rankings;
