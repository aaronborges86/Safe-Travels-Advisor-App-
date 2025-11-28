import React from 'react';
import { Phone, AlertCircle, Banknote, Languages } from 'lucide-react';

const InfoSection = ({ country }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Essential Info */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Essential Information</h3>
                <div className="space-y-4">
                    <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                        <Banknote className="h-5 w-5 text-gray-500" />
                        <div>
                            <p className="text-xs text-gray-500 uppercase">Currency</p>
                            <p className="font-medium text-gray-900">{country.Currency}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                        <Languages className="h-5 w-5 text-gray-500" />
                        <div>
                            <p className="text-xs text-gray-500 uppercase">Languages</p>
                            <p className="font-medium text-gray-900">{country.Language}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                        <Phone className="h-5 w-5 text-gray-500" />
                        <div>
                            <p className="text-xs text-gray-500 uppercase">Emergency Numbers</p>
                            <p className="font-medium text-gray-900">
                                Police: {country.EmergencyPolice} • Medical: {country.EmergencyMedical}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Travel Advisory */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Travel Advisory</h3>
                <div className="flex gap-4 items-start p-4 bg-yellow-50 rounded-xl border border-yellow-100">
                    <AlertCircle className="h-6 w-6 text-yellow-600 flex-shrink-0 mt-1" />
                    <div>
                        <h4 className="font-bold text-yellow-800 mb-1">Advisory Notice</h4>
                        <p className="text-yellow-700 text-sm leading-relaxed">
                            {country.TravelAdvisory}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InfoSection;
