import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, AlertTriangle, CheckCircle } from 'lucide-react';

const SafetyCard = ({ country }) => {
    const navigate = useNavigate();

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
            case 'Low': return <CheckCircle className="h-4 w-4" />;
            case 'Medium': return <Shield className="h-4 w-4" />;
            case 'High': return <AlertTriangle className="h-4 w-4" />;
            default: return <Shield className="h-4 w-4" />;
        }
    };

    return (
        <div
            onClick={() => navigate(`/country/${country.Country}`)}
            className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-md border border-gray-100 transition-all cursor-pointer transform hover:-translate-y-1"
        >
            <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {country.Country}
                </h3>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 border ${getRiskColor(country.RiskLevel)}`}>
                    {getRiskIcon(country.RiskLevel)}
                    {country.RiskLevel} Risk
                </span>
            </div>

            <div className="flex items-end gap-2">
                <span className="text-4xl font-bold text-gray-900">{country.OverallScore}</span>
                <span className="text-sm text-gray-500 mb-1">/ 100</span>
            </div>
            <p className="text-sm text-gray-500 mt-1">Safety Score</p>
        </div>
    );
};

export default SafetyCard;
