"use client";


import Link from "next/link";
import { motion } from "framer-motion";

interface SidebarProps {
    onClose: () => void;
}

export default function Sidebar({ onClose }: SidebarProps) {
    return (
        <>
            {/* Backdrop overlay */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            />
            
            {/* Sidebar */}
            <motion.div
                initial={{ x: -240 }}
                animate={{ x: 0 }}
                exit={{ x: -240 }}
                transition={{ type: "tween", duration: 0.3 }}
                className="fixed top-0 left-0 h-full w-[240px] bg-white/80 backdrop-blur-md border-r border-gray-200 shadow-xl transform z-50"
            >
                {/* Exit Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label="Close Sidebar"
                >
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                </button>

                <div className="h-full flex flex-col pt-14">
                    {/* User Profile Section */}
                    <div className="px-5 mb-6">
                        <div className="flex items-center">
                            <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center text-white font-medium shadow-md">
                                L
                            </div>
                            <div className="ml-3">
                                <h2 className="text-gray-800 font-semibold tracking-wide text-sm">RIANCO&apos;S</h2>
                                <p className="text-gray-500 text-xs">WORKSPACE</p>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <nav className="flex flex-col py-2 px-3">
                        {[
                            { name: 'Dashboard', href: '/dashboard', icon: '📊' },
                            { name: 'Link History', href: '/history', icon: '🔗' },
                            { name: 'Help Center', href: '/help', icon: '❔' }
                        ].map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="px-4 py-3 text-gray-600 hover:bg-purple-50 hover:text-purple-600 transition-colors text-sm font-medium rounded-lg flex items-center gap-3"
                            >
                                <span>{item.icon}</span>
                                {item.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Upgrade to Pro Section */}
                    <div className="px-5 py-4 mt-auto mb-6">
                        <div className="p-4 rounded-xl bg-gradient-to-r from-indigo-50 to-purple-50 border border-purple-100">
                            <h3 className="text-gray-800 font-semibold mb-2">Upgrade to Pro</h3>
                            <p className="text-gray-600 text-sm mb-3">Get advanced features and detailed analytics</p>
                            <button className="w-full px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg text-sm font-medium hover:shadow-md transition-shadow">
                                View Plans
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </>
    );
}