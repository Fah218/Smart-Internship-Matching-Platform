import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Briefcase, User, Building2, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';

const Layout = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();
    const isAuthenticated = false; // TODO: Replace with auth context
    // const userRole = 'student'; // TODO: Replace with auth context

    const isActive = (path) => location.pathname === path;

    const NavLink = ({ to, icon: Icon, children }) => (
        <Link
            to={to}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${isActive(to)
                    ? 'bg-primary-50 text-primary-600 font-medium'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
        >
            <Icon size={18} />
            <span>{children}</span>
        </Link>
    );

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Navigation Bar */}
            <nav className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        {/* Logo */}
                        <div className="flex items-center">
                            <Link to="/" className="flex items-center space-x-2">
                                <div className="bg-primary-600 p-2 rounded-lg">
                                    <Briefcase className="text-white h-5 w-5" />
                                </div>
                                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-secondary-600">
                                    InternMatch
                                </span>
                            </Link>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-4">
                            <NavLink to="/" icon={Briefcase}>Home</NavLink>

                            {!isAuthenticated ? (
                                <>
                                    <Link to="/login" className="text-gray-600 hover:text-gray-900 font-medium px-4 py-2">
                                        Login
                                    </Link>
                                    <Link to="/register" className="bg-primary-600 text-white px-5 py-2 rounded-lg hover:bg-primary-700 transition-colors shadow-lg shadow-primary-500/30">
                                        Get Started
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <NavLink to="/dashboard" icon={User}>Dashboard</NavLink>
                                    <button className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                        <LogOut size={18} />
                                        <span>Logout</span>
                                    </button>
                                </>
                            )}
                        </div>

                        {/* Mobile menu button */}
                        <div className="md:hidden flex items-center">
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="text-gray-600 hover:text-gray-900 p-2"
                            >
                                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMobileMenuOpen && (
                    <div className="md:hidden border-t border-gray-100 bg-white">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            <NavLink to="/" icon={Briefcase}>Home</NavLink>
                            {!isAuthenticated ? (
                                <>
                                    <NavLink to="/login" icon={User}>Login</NavLink>
                                    <NavLink to="/register" icon={User}>Register</NavLink>
                                </>
                            ) : (
                                <>
                                    <NavLink to="/dashboard" icon={User}>Dashboard</NavLink>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </nav>

            {/* Main Content */}
            <main className="flex-grow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <Outlet />
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-100 mt-auto">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <p className="text-center text-gray-500 text-sm">
                        © 2026 InternMatch. Connecting talent with opportunity.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
