import React from 'react';

const SkeletonLoader = ({ type = 'text' }) => {
    if (type === 'card') {
        return (
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-10 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            </div>
        );
    }

    if (type === 'header') {
        return (
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8 animate-pulse">
                <div className="flex justify-between items-center mb-6">
                    <div className="w-1/2">
                        <div className="h-10 bg-gray-200 rounded w-3/4 mb-3"></div>
                        <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                    </div>
                    <div className="h-16 bg-gray-200 rounded w-32"></div>
                </div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
        );
    }

    return <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>;
};

export default SkeletonLoader;
