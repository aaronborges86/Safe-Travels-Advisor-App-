import React from 'react';

const FilterPanel = ({ filters, setFilters }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Filter Countries</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Min Safety Score</label>
                    <input
                        type="number"
                        name="minScore"
                        min="0"
                        max="100"
                        value={filters.minScore}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Min LGBTQ+ Safety</label>
                    <input
                        type="number"
                        name="minLGBTQ"
                        min="0"
                        max="100"
                        value={filters.minLGBTQ}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Min Women's Safety</label>
                    <input
                        type="number"
                        name="minWomen"
                        min="0"
                        max="100"
                        value={filters.minWomen}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Min Political Stability</label>
                    <input
                        type="number"
                        name="minPolitical"
                        min="0"
                        max="100"
                        value={filters.minPolitical}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>
                <div className="flex items-end">
                    <button
                        onClick={() => setFilters({ minScore: 0, minLGBTQ: 0, minWomen: 0, minPolitical: 0 })}
                        className="w-full p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium"
                    >
                        Reset Filters
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FilterPanel;
