import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { Check, X } from 'lucide-react';

const Compare = () => {
    const [countries, setCountries] = useState([]);
    const [country1, setCountry1] = useState('');
    const [country2, setCountry2] = useState('');
    const [data1, setData1] = useState(null);
    const [data2, setData2] = useState(null);

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

    useEffect(() => {
        if (country1) setData1(countries.find(c => c.Country === country1));
        if (country2) setData2(countries.find(c => c.Country === country2));
    }, [country1, country2, countries]);

    const metrics = [
        { label: 'Overall Score', key: 'OverallScore' },
        { label: 'Healthcare', key: 'HealthcareScore' },
        { label: 'Transport Safety', key: 'TransportSafety' },
        { label: 'LGBTQ+ Safety', key: 'LGBTQSafety' },
        { label: 'Women\'s Safety', key: 'WomensSafety' },
        { label: 'Crime Safety', key: 'CrimeSafety' },
        { label: 'Political Stability', key: 'PoliticalStability' },
    ];

    const renderComparisonRow = (metric) => {
        const val1 = data1 ? data1[metric.key] : 0;
        const val2 = data2 ? data2[metric.key] : 0;

        const win1 = val1 > val2;
        const win2 = val2 > val1;

        return (
            <tr key={metric.key} className="border-b border-gray-100 last:border-0">
                <td className="px-6 py-4 text-sm font-medium text-gray-500">{metric.label}</td>
                <td className={`px-6 py-4 text-center font-bold ${win1 ? 'text-green-600 bg-green-50' : 'text-gray-900'}`}>
                    {data1 ? val1 : '-'}
                </td>
                <td className={`px-6 py-4 text-center font-bold ${win2 ? 'text-green-600 bg-green-50' : 'text-gray-900'}`}>
                    {data2 ? val2 : '-'}
                </td>
            </tr>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Compare Countries</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <select
                        className="p-4 rounded-xl border border-gray-200 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none text-lg"
                        value={country1}
                        onChange={(e) => setCountry1(e.target.value)}
                    >
                        <option value="">Select Country 1</option>
                        {countries.map(c => <option key={c.Country} value={c.Country}>{c.Country}</option>)}
                    </select>

                    <select
                        className="p-4 rounded-xl border border-gray-200 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none text-lg"
                        value={country2}
                        onChange={(e) => setCountry2(e.target.value)}
                    >
                        <option value="">Select Country 2</option>
                        {countries.map(c => <option key={c.Country} value={c.Country}>{c.Country}</option>)}
                    </select>
                </div>

                {data1 && data2 && (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-100">
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-500 uppercase">Metric</th>
                                    <th className="px-6 py-4 text-center text-lg font-bold text-gray-900">{data1.Country}</th>
                                    <th className="px-6 py-4 text-center text-lg font-bold text-gray-900">{data2.Country}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {metrics.map(renderComparisonRow)}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Compare;
