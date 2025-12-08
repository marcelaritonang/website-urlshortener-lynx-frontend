"use client";


import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-white border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
                {/* Logo Section */}
                <div className="flex justify-center mb-8">
                    <div className="flex items-center gap-2">
                        <div className="w-9 h-9 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 rounded-xl flex items-center justify-center shadow-md">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                            </svg>
                        </div>
                        <span className="text-2xl font-bold text-gray-900">Shorteny</span>
                    </div>
                </div>

                {/* Description */}
                <p className="text-center text-gray-600 mb-8 max-w-md mx-auto">
                    Create short, memorable links in seconds. Track clicks and optimize your campaigns.
                </p>

                {/* Links */}
                <div className="flex justify-center gap-8 mb-8">
                    <Link href="/privacy" className="text-gray-600 hover:text-gray-900 transition-colors">
                        Privacy
                    </Link>
                    <Link href="/terms" className="text-gray-600 hover:text-gray-900 transition-colors">
                        Terms
                    </Link>
                    <Link href="/contact" className="text-gray-600 hover:text-gray-900 transition-colors">
                        Contact
                    </Link>
                </div>

                {/* Copyright */}
                <div className="text-center text-gray-500 text-sm">
                    © {new Date().getFullYear()} Shorteny. All rights reserved.
                </div>
            </div>
        </footer>
    );
}