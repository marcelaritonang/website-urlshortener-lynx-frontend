"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { authApi } from '../services/api';

interface NavbarProps {
    showSidebarToggle?: boolean;
    onToggleSidebar?: () => void;
    onGetStartedClick?: () => void;
}

export default function Navbar({ showSidebarToggle = false, onToggleSidebar, onGetStartedClick }: NavbarProps) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const checkAuth = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const data = await authApi.getUserDetails(token);
                if (data.data) {
                    setIsLoggedIn(true);
                    const displayName = data.data.first_name || data.data.username || data.data.email.split('@')[0];
                    setUserName(displayName);
                }
            } catch (error) {
                console.error('Auth check failed:', error);
                setIsLoggedIn(false);
                setUserName("");
                localStorage.removeItem('token');
            }
        } else {
            setIsLoggedIn(false);
            setUserName("");
        }
    };

    useEffect(() => {
        checkAuth();

        const handleStorageChange = () => {
            checkAuth();
        };

        const handleAuthChange = () => {
            checkAuth();
        };

        window.addEventListener('storage', handleStorageChange);
        window.addEventListener('auth-change', handleAuthChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('auth-change', handleAuthChange);
        };
    }, []);

    const handleLogout = async () => {
        setShowDropdown(false);
        try {
            const token = localStorage.getItem('token');
            if (token) {
                await authApi.logout(token);
            }
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            localStorage.removeItem('token');
            setIsLoggedIn(false);
            setUserName("");
            window.dispatchEvent(new Event('auth-change'));
            router.push('/');
        }
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (showDropdown && !target.closest('.user-dropdown')) {
                setShowDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [showDropdown]);

    const isActive = (path: string) => pathname === path;

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            isScrolled ? 'bg-white/95 backdrop-blur-lg shadow-sm' : 'bg-white'
        }`}>
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-10 h-10 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-all">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                            </svg>
                        </div>
                        <span className="text-2xl font-bold text-gray-900 group-hover:text-gray-700 transition-colors">
                            Shorteny
                        </span>
                    </Link>

                    {/* Center Navigation */}
                    <div className="hidden md:flex items-center gap-1">
                        {isLoggedIn && (
                            <Link 
                                href="/dashboard" 
                                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                                    isActive('/dashboard')
                                        ? 'bg-gray-900 text-white'
                                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                                }`}
                            >
                                Dashboard
                            </Link>
                        )}
                        <Link 
                            href="/features" 
                            className={`px-4 py-2 rounded-lg font-medium transition-all ${
                                isActive('/features')
                                    ? 'bg-gray-100 text-gray-900'
                                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                            }`}
                        >
                            Features
                        </Link>
                        <Link 
                            href="/pricing" 
                            className={`px-4 py-2 rounded-lg font-medium transition-all ${
                                isActive('/pricing')
                                    ? 'bg-gray-100 text-gray-900'
                                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                            }`}
                        >
                            Pricing
                        </Link>
                        <Link 
                            href="/api" 
                            className={`px-4 py-2 rounded-lg font-medium transition-all ${
                                isActive('/api')
                                    ? 'bg-gray-100 text-gray-900'
                                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                            }`}
                        >
                            API
                        </Link>
                    </div>

                    {/* Right Side - Auth */}
                    <div className="flex items-center gap-3">
                        {isLoggedIn ? (
                            <div className="relative user-dropdown">
                                <button
                                    onClick={() => setShowDropdown(!showDropdown)}
                                    className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 transition-all"
                                >
                                    <div className="w-9 h-9 bg-gradient-to-br from-gray-900 to-gray-700 rounded-full flex items-center justify-center text-white font-semibold shadow-sm">
                                        {userName.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="hidden sm:flex flex-col items-start">
                                        <span className="text-sm font-semibold text-gray-900">{userName}</span>
                                        <span className="text-xs text-gray-500">View profile</span>
                                    </div>
                                    <svg 
                                        className={`w-4 h-4 text-gray-600 transition-transform ${showDropdown ? 'rotate-180' : ''}`}
                                        fill="none" 
                                        stroke="currentColor" 
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                {/* Dropdown Menu */}
                                {showDropdown && (
                                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-200 py-2 overflow-hidden">
                                        {/* User Info Header */}
                                        <div className="px-4 py-3 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                                            <p className="text-sm font-semibold text-gray-900">{userName}</p>
                                            <p className="text-xs text-gray-600 mt-1">Logged in</p>
                                        </div>
                                        
                                        {/* Menu Items */}
                                        <div className="py-2">
                                            <Link
                                                href="/dashboard"
                                                className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors"
                                                onClick={() => setShowDropdown(false)}
                                            >
                                                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                                </svg>
                                                <div className="flex-1">
                                                    <p className="text-sm font-medium">Dashboard</p>
                                                    <p className="text-xs text-gray-500">View your links</p>
                                                </div>
                                            </Link>
                                            
                                            <Link
                                                href="/profile"
                                                className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors"
                                                onClick={() => setShowDropdown(false)}
                                            >
                                                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                                <div className="flex-1">
                                                    <p className="text-sm font-medium">Profile</p>
                                                    <p className="text-xs text-gray-500">Account settings</p>
                                                </div>
                                            </Link>
                                        </div>

                                        {/* Logout Button */}
                                        <div className="border-t border-gray-200 pt-2 mt-2">
                                            <button
                                                onClick={handleLogout}
                                                className="flex items-center gap-3 w-full px-4 py-2.5 text-red-600 hover:bg-red-50 transition-colors"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                                </svg>
                                                <span className="text-sm font-medium">Logout</span>
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className="px-5 py-2.5 text-gray-700 font-medium hover:text-gray-900 transition-colors"
                                >
                                    Sign in
                                </Link>
                                <button
                                    onClick={onGetStartedClick}
                                    className="px-6 py-2.5 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-all shadow-sm hover:shadow-md"
                                >
                                    Get Started
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}