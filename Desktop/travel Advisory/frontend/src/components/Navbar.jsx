import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';

const Navbar = () => {
    return (
        <nav className="bg-white shadow-sm border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center gap-2">
                            <ShieldCheck className="h-8 w-8 text-blue-600" />
                            <span className="text-xl font-bold text-gray-900">SafeTravels</span>
                        </Link>
                        <div className="hidden md:flex items-center ml-10 space-x-8">
                            <Link to="/" className="text-gray-500 hover:text-blue-600 font-medium transition-colors">Home</Link>
                            <Link to="/rankings" className="text-gray-500 hover:text-blue-600 font-medium transition-colors">Rankings</Link>
                            <Link to="/compare" className="text-gray-500 hover:text-blue-600 font-medium transition-colors">Compare</Link>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <button className="p-2 rounded-full text-gray-500 hover:bg-gray-100">
                            {/* Theme toggle placeholder */}
                            <span className="sr-only">Toggle theme</span>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
