import React from 'react';

const MetricCard = ({ label, score, icon: Icon }) => {
    const getColor = (score) => {
        if (score >= 80) return 'bg-green-500';
        if (score >= 60) return 'bg-yellow-500';
        return 'bg-red-500';
    };

    return (
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <div className="flex justify-between items-start mb-3">
                <span className="text-gray-600 font-medium">{label}</span>
                {Icon && <Icon className="h-5 w-5 text-gray-400" />}
            </div>
            <div className="flex items-end gap-2 mb-3">
                <span className="text-3xl font-bold text-gray-900">{score}</span>
                <span className="text-xs text-gray-400 mb-1">/100</span>
            </div>
            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div
                    className={`h-full rounded-full ${getColor(score)}`}
                    style={{ width: `${score}%` }}
                />
            </div>
        </div>
    );
};

export default MetricCard;
