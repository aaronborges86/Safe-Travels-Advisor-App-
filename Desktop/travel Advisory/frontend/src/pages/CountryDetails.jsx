import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import CountryHeader from '../components/CountryHeader';
import MetricCard from '../components/MetricCard';
import SafetyRadarChart from '../components/RadarChart';
import InfoSection from '../components/InfoSection';
import SkeletonLoader from '../components/SkeletonLoader';
import { Heart, Bus, Users, UserCheck, ShieldAlert, Scale } from 'lucide-react';

const CountryDetails = () => {
    const { name } = useParams();
    const [country, setCountry] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCountryData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/country/${name}`);
                setCountry(response.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching country details:", err);
                setError("Country not found or error loading data.");
                setLoading(false);
            }
        };

        fetchCountryData();
    }, [name]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Navbar />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <SkeletonLoader type="header" />
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[...Array(6)].map((_, i) => <SkeletonLoader key={i} type="card" />)}
                        </div>
                        <div className="h-[400px] bg-white rounded-2xl p-6 shadow-sm border border-gray-100 animate-pulse"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (error || !country) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Navbar />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Oops!</h2>
                    <p className="text-gray-600">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-12">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <CountryHeader country={country} />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                    {/* Safety Overview Cards */}
                    <div className="lg:col-span-2">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Safety Overview</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <MetricCard label="Healthcare Quality" score={country.HealthcareScore} icon={Heart} />
                            <MetricCard label="Transport Safety" score={country.TransportSafety} icon={Bus} />
                            <MetricCard label="LGBTQ+ Safety" score={country.LGBTQSafety} icon={Users} />
                            <MetricCard label="Women's Safety" score={country.WomensSafety} icon={UserCheck} />
                            <MetricCard label="Crime Safety" score={country.CrimeSafety} icon={ShieldAlert} />
                            <MetricCard label="Political Stability" score={country.PoliticalStability} icon={Scale} />
                        </div>
                    </div>

                    {/* Radar Chart */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">Safety Profile</h2>
                        <SafetyRadarChart data={country} />
                        <p className="text-sm text-gray-500 text-center mt-4">
                            Comparative view of safety dimensions
                        </p>
                    </div>
                </div>

                {/* Essential Info & Advisories */}
                <InfoSection country={country} />
            </div>
        </div>
    );
};

export default CountryDetails;
