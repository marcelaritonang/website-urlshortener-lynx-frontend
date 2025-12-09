"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from 'next/link';
import Navbar from './Navbar';

interface AppLayoutProps {
    children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
    const [mounted, setMounted] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const sidebarItems = [
        { name: 'Dashboard', href: '/dashboard', icon: '📊' },
        { name: 'Link History', href: '/history', icon: '🔗' },
        { name: 'Help Center', href: '/help', icon: '❔' }
    ];

    if (!mounted) return null;

    return (
        <div className="min-h-screen">
            {/* Navbar */}
            <Navbar 
                showSidebarToggle={true}
                onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
            />

            <div className="flex min-h-screen pt-16">
                {/* Sidebar */}
                <AnimatePresence>
                    {isSidebarOpen && (
                        <>
                            {/* Backdrop - only show on mobile */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsSidebarOpen(false)}
                                className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
                            />
                            
                            {/* Sidebar */}
                            <motion.aside
                                initial={{ x: -280 }}
                                animate={{ x: 0 }}
                                exit={{ x: -280 }}
                                transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                                className="fixed lg:relative top-0 left-0 h-full w-[280px] bg-white shadow-xl z-50"
                            >
                                <div className="h-full flex flex-col pt-16">
                                    {/* User Profile Section */}
                                    <div className="p-4 border-b border-gray-200">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center text-white font-medium shadow-md">
                                                    L
                                                </div>
                                                <div className="ml-3">
                                                    <h2 className="text-gray-800 font-semibold tracking-wide text-sm">RIANCO&apos;S</h2>
                                                    <p className="text-gray-500 text-xs">WORKSPACE</p>
                                                </div>
                                            </div>
                                            <button 
                                                onClick={() => setIsSidebarOpen(false)}
                                                className="text-gray-500 hover:text-gray-700 lg:hidden"
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    </div>

                                    {/* Navigation Links */}
                                    <nav className="flex-1 overflow-y-auto px-4 py-4">
                                        {sidebarItems.map((item) => (
                                            <Link
                                                key={item.name}
                                                href={item.href}
                                                className="flex items-center px-4 py-3 text-gray-600 rounded-lg hover:bg-purple-50 hover:text-purple-600 transition-colors mb-1"
                                                onClick={() => setIsSidebarOpen(false)}
                                            >
                                                <span className="mr-3">{item.icon}</span>
                                                {item.name}
                                            </Link>
                                        ))}
                                    </nav>

                                    {/* Upgrade Section */}
                                    <div className="p-4 border-t border-gray-200">
                                        <div className="p-4 rounded-xl bg-gradient-to-r from-indigo-50 to-purple-50 border border-purple-100">
                                            <h3 className="text-gray-800 font-semibold mb-2">Upgrade to Pro</h3>
                                            <p className="text-gray-600 text-sm mb-3">Get advanced features and analytics</p>
                                            <button className="w-full px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg text-sm font-medium hover:shadow-md transition-shadow">
                                                View Plans
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.aside>
                        </>
                    )}
                </AnimatePresence>

                {/* Main Content */}
                <main 
                    className={`
                        flex-1 transition-all duration-300
                        ${isSidebarOpen ? 'lg:ml-0' : ''}
                    `}
                >
                    {children}
                </main>
            </div>
        </div>
    );
}