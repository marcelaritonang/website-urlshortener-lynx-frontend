"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AppLayout from '../components/AppLayout';
import Sidebar from '../components/Sidebar';
import { AnimatePresence } from "framer-motion";

export default function FeaturesPage() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const features = [
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
            ),
            title: "Instant Link Shortening",
            description: "Transform long URLs into short, memorable links in seconds. No registration required, completely free forever."
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                </svg>
            ),
            title: "QR Code Generation",
            description: "Automatically generate QR codes for every shortened link. Perfect for print materials, posters, and offline marketing."
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
            ),
            title: "Click Tracking",
            description: "Monitor how many times your links are clicked. Get real-time analytics to understand your audience better."
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
            ),
            title: "Easy Copy & Share",
            description: "One-click copy to clipboard. Share your shortened links instantly across social media, email, or messaging apps."
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            ),
            title: "Lightning Fast",
            description: "Blazing fast redirects with minimal latency. Your audience reaches their destination without any delay."
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
            ),
            title: "Secure & Reliable",
            description: "All links are securely stored and protected. Enterprise-grade infrastructure ensures 99.9% uptime."
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            title: "100% Free Forever",
            description: "No hidden costs, no premium tiers. All features are completely free to use, forever. No credit card required."
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
            ),
            title: "Mobile Friendly",
            description: "Fully responsive design works perfectly on all devices. Create and manage links on the go from anywhere."
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
            ),
            title: "Custom Branding",
            description: "Make your links recognizable with custom short codes. Build brand trust with memorable, branded URLs."
        }
    ];

    return (
        <AppLayout>
            <div className="bg-white min-h-screen">
                <Navbar 
                    showSidebarToggle={true}
                    onToggleSidebar={toggleSidebar}
                />

                <AnimatePresence>
                    {sidebarOpen && (
                        <Sidebar onClose={toggleSidebar} />
                    )}
                </AnimatePresence>

                <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-[280px]' : ''}`}>
                    {/* Hero Section */}
                    <section className="pt-32 pb-20 px-8">
                        <div className="max-w-6xl mx-auto text-center">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                <h1 className="text-6xl font-bold text-gray-900 mb-6">
                                    Powerful Features
                                </h1>
                                <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                                    Everything you need to shorten, track, and optimize your links. 
                                    All features are completely free, no registration required.
                                </p>
                                <div className="inline-flex items-center gap-2 px-6 py-3 bg-gray-50 rounded-full border border-gray-200">
                                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-sm font-medium text-gray-700">100% Free Forever</span>
                                </div>
                            </motion.div>
                        </div>
                    </section>

                    {/* Features Grid */}
                    <section className="pb-32 px-8">
                        <div className="max-w-7xl mx-auto">
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {features.map((feature, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg hover:border-gray-300 transition-all duration-300"
                                    >
                                        <div className="w-14 h-14 bg-gray-50 rounded-xl flex items-center justify-center mb-5 text-gray-900">
                                            {feature.icon}
                                        </div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                            {feature.title}
                                        </h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            {feature.description}
                                        </p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* CTA Section */}
                    <section className="pb-32 px-8">
                        <div className="max-w-4xl mx-auto">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                className="bg-gray-50 rounded-3xl p-12 text-center border border-gray-200"
                            >
                                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                                    Ready to get started?
                                </h2>
                                <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                                    Start shortening your links today. No sign-up required.
                                </p>
                                <a
                                    href="/"
                                    className="inline-block px-8 py-4 bg-gray-900 hover:bg-gray-800 text-white rounded-xl font-semibold transition-all hover:shadow-lg"
                                >
                                    Create Short Link
                                </a>
                            </motion.div>
                        </div>
                    </section>
                </div>

                <Footer />
            </div>
        </AppLayout>
    );
}