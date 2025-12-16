"use client";

import Link from "next/link";

export default function Footer() {
    return (
        <footer className="relative bg-white border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
                {/* Logo & Description Section */}
                <div className="text-center mb-12">
                    <div className="flex items-center gap-3 justify-center mb-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 rounded-xl flex items-center justify-center shadow-sm">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                            </svg>
                        </div>
                        <span className="text-2xl font-bold text-gray-900">Shorteny</span>
                    </div>
                    <p className="text-gray-600 text-base leading-relaxed max-w-md mx-auto">
                        Create short, memorable links in seconds. Track clicks and optimize your campaigns with powerful analytics.
                    </p>
                </div>

                {/* Creator Section */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
                    {/* Made by */}
                    <div className="flex items-center gap-3">
                        <img
                            src="https://avatars.githubusercontent.com/u/100265008?v=4"
                            alt="Rianco Marcellino Andreas"
                            className="w-10 h-10 rounded-full border-2 border-gray-200 shadow-sm"
                        />
                        <div>
                            <div className="text-xs text-gray-500">Made by</div>
                            <div className="font-semibold text-gray-900">Rianco Marcellino Andreas</div>
                        </div>
                    </div>

                    {/* Social Links */}
                    <div className="flex items-center gap-3">
                        <a
                            href="https://github.com/marcelaritonang"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-all border border-gray-200"
                        >
                            <svg className="w-4 h-4 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.606-2.665-.304-5.466-1.332-5.466-5.931 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23a11.5 11.5 0 013.003-.404c1.018.005 2.045.138 3.003.404 2.291-1.553 3.297-1.23 3.297-1.23.653 1.653.242 2.873.119 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.803 5.625-5.475 5.921.43.372.823 1.102.823 2.222v3.293c0 .322.218.694.825.576C20.565 21.796 24 17.297 24 12c0-6.63-5.37-12-12-12z" />
                            </svg>
                            <span className="text-sm text-gray-700 font-medium">GitHub</span>
                        </a>

                        <a
                            href="https://www.linkedin.com/in/rianco-marcellino-andreas/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-all border border-gray-200"
                        >
                            <svg className="w-4 h-4 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.966 0-1.75-.79-1.75-1.76 0-.97.784-1.76 1.75-1.76s1.75.79 1.75 1.76c0 .97-.784 1.76-1.75 1.76zm13.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.89v1.23h.04c.4-.76 1.38-1.56 2.84-1.56 3.04 0 3.6 2 3.6 4.59v4.74z" />
                            </svg>
                            <span className="text-sm text-gray-700 font-medium">LinkedIn</span>
                        </a>

                        <a
                            href="https://riancomarcellinoandreas.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-all border border-gray-200"
                        >
                            <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <circle cx="12" cy="12" r="10" />
                                <path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" />
                            </svg>
                            <span className="text-sm text-gray-700 font-medium">Website</span>
                        </a>
                    </div>
                </div>

                {/* Copyright */}
                <div className="text-center text-gray-500 text-sm pt-8 border-t border-gray-100">
                    © {new Date().getFullYear()} Shorteny. All rights reserved.
                </div>
            </div>
        </footer>
    );
}