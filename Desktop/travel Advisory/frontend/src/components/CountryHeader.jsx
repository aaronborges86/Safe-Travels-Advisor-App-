import React from 'react';
import { Shield, AlertTriangle, CheckCircle } from 'lucide-react';

const CountryHeader = ({ country }) => {
    const getRiskColor = (level) => {
        switch (level) {
            case 'Low': return 'text-green-600 bg-green-50 border-green-100';
            case 'Medium': return 'text-yellow-600 bg-yellow-50 border-yellow-100';
            case 'High': return 'text-red-600 bg-red-50 border-red-100';
            default: return 'text-gray-600 bg-gray-50 border-gray-100';
        }
    };

    const getRiskIcon = (level) => {
        switch (level) {
            case 'Low': return <CheckCircle className="h-5 w-5" />;
            case 'Medium': return <Shield className="h-5 w-5" />;
            case 'High': return <AlertTriangle className="h-5 w-5" />;
            default: return <Shield className="h-5 w-5" />;
        }
    };

    // Generate a simple summary based on scores (mock AI summary)
    const generateSummary = () => {
        const highScores = [];
        if (country.HealthcareScore > 90) highScores.push("healthcare");
        if (country.TransportSafety > 90) highScores.push("transport safety");
        if (country.CrimeSafety > 90) highScores.push("low crime rates");

        let summary = `${country.Country} is generally considered a ${country.RiskLevel.toLowerCase()} risk destination.`;
        if (highScores.length > 0) {
            summary += ` It is known for its outstanding ${highScores.join(', ')}.`;
        }
        return summary;
    };

    return (
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <h1 className="text-4xl font-bold text-gray-900">{country.Country}</h1>
                        <span className={`px-4 py-1.5 rounded-full text-sm font-semibold flex items-center gap-2 border ${getRiskColor(country.RiskLevel)}`}>
                            {getRiskIcon(country.RiskLevel)}
                            {country.RiskLevel} Risk
                        </span>
                    </div>
                    <p className="text-gray-500 text-lg">{country.Region || "Global Region"}</p>
                </div>

                <div className="flex items-center gap-3 bg-gray-50 px-6 py-3 rounded-xl">
                    <span className="text-5xl font-bold text-gray-900">{country.OverallScore}</span>
                    <div className="flex flex-col">
                        <span className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Safety Score</span>
                        <span className="text-sm text-gray-500">out of 100</span>
                    </div>
                </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-100">
                <p className="text-gray-600 leading-relaxed text-lg">
                    {generateSummary()}
                </p>
            </div>
        </div>
    );
};

export default CountryHeader;
