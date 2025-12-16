"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AppLayout from '../components/AppLayout';
import Sidebar from '../components/Sidebar';
import { AnimatePresence } from "framer-motion";

export default function PricingPage() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const features = [
        "Unlimited URL shortening",
        "QR code generation",
        "Click tracking & analytics",
        "Custom short links",
        "No expiration dates",
        "Lightning fast redirects",
        "Mobile-friendly interface",
        "No registration required",
        "No ads or watermarks",
        "99.9% uptime guarantee",
        "Secure HTTPS links",
        "24/7 availability"
    ];

    const faqs = [
        {
            question: "Is Shorteny really free?",
            answer: "Yes! Shorteny is 100% free with no hidden costs, premium tiers, or credit card requirements. All features are available to everyone, forever."
        },
        {
            question: "Do I need to create an account?",
            answer: "No account needed! You can start shortening URLs immediately without any registration or sign-up process."
        },
        {
            question: "Are there any limits?",
            answer: "We don't impose artificial limits on URL shortening. You can create as many short links as you need, completely free."
        },
        {
            question: "Will there be paid plans in the future?",
            answer: "Shorteny is committed to remaining free forever. We believe URL shortening should be accessible to everyone."
        },
        {
            question: "How do you sustain this service?",
            answer: "Shorteny is a passion project created to provide value to the community. We keep costs low through efficient infrastructure."
        },
        {
            question: "Can I use this for commercial purposes?",
            answer: "Absolutely! Use Shorteny for personal projects, business campaigns, marketing materials, or any purpose you need."
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
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full border border-green-200 mb-6">
                                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-sm font-semibold text-green-700">No Credit Card Required</span>
                                </div>
                                <h1 className="text-6xl font-bold text-gray-900 mb-6">
                                    Simple Pricing
                                </h1>
                                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                                    No tiers, no hidden fees, no surprises. 
                                    Everything is free, forever.
                                </p>
                            </motion.div>
                        </div>
                    </section>

                    {/* Pricing Card */}
                    <section className="pb-20 px-8">
                        <div className="max-w-2xl mx-auto">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="relative bg-white border-2 border-gray-900 rounded-3xl p-12 shadow-xl"
                            >
                                {/* Popular Badge */}
                                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                    <div className="bg-gray-900 text-white px-6 py-2 rounded-full text-sm font-semibold">
                                        Most Popular
                                    </div>
                                </div>

                                {/* Plan Name */}
                                <div className="text-center mb-8">
                                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                                        Free Plan
                                    </h2>
                                    <p className="text-gray-600">
                                        All features, unlimited use
                                    </p>
                                </div>

                                {/* Price */}
                                <div className="text-center mb-10">
                                    <div className="flex items-center justify-center gap-2 mb-2">
                                        <span className="text-7xl font-bold text-gray-900">$0</span>
                                        <span className="text-2xl text-gray-500">/forever</span>
                                    </div>
                                    <p className="text-sm text-gray-500">
                                        No payment method required
                                    </p>
                                </div>

                                {/* CTA Button */}
                                <a
                                    href="/"
                                    className="block w-full py-4 bg-gray-900 hover:bg-gray-800 text-white rounded-xl font-semibold text-center transition-all hover:shadow-lg mb-10"
                                >
                                    Start Shortening Now
                                </a>

                                {/* Features List */}
                                <div className="space-y-4">
                                    <p className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">
                                        Everything included:
                                    </p>
                                    {features.map((feature, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.4, delay: 0.3 + (index * 0.05) }}
                                            className="flex items-center gap-3"
                                        >
                                            <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                            <span className="text-gray-700">{feature}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </section>

                    {/* Comparison Section */}
                    <section className="pb-20 px-8">
                        <div className="max-w-4xl mx-auto">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                className="text-center mb-12"
                            >
                                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                                    Why Choose Shorteny?
                                </h2>
                                <p className="text-xl text-gray-600">
                                    Compare us with other URL shortening services
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.5 }}
                                className="bg-gray-50 rounded-2xl p-8 border border-gray-200"
                            >
                                <div className="grid md:grid-cols-3 gap-6">
                                    {/* Shorteny */}
                                    <div className="text-center">
                                        <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center mx-auto mb-4">
                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                            </svg>
                                        </div>
                                        <h3 className="font-bold text-gray-900 mb-2">Shorteny</h3>
                                        <div className="text-3xl font-bold text-green-600 mb-4">FREE</div>
                                        <div className="space-y-2 text-sm text-gray-600">
                                            <p>✓ All features</p>
                                            <p>✓ Unlimited links</p>
                                            <p>✓ No ads</p>
                                            <p>✓ No registration</p>
                                        </div>
                                    </div>

                                    {/* Competitor 1 */}
                                    <div className="text-center opacity-60">
                                        <div className="w-12 h-12 bg-gray-300 rounded-xl flex items-center justify-center mx-auto mb-4">
                                            <span className="text-xl">🔗</span>
                                        </div>
                                        <h3 className="font-bold text-gray-900 mb-2">Service A</h3>
                                        <div className="text-3xl font-bold text-gray-900 mb-4">$29/mo</div>
                                        <div className="space-y-2 text-sm text-gray-600">
                                            <p>✓ Limited features</p>
                                            <p>✗ Link limits</p>
                                            <p>✗ Ads on free tier</p>
                                            <p>✓ Registration required</p>
                                        </div>
                                    </div>

                                    {/* Competitor 2 */}
                                    <div className="text-center opacity-60">
                                        <div className="w-12 h-12 bg-gray-300 rounded-xl flex items-center justify-center mx-auto mb-4">
                                            <span className="text-xl">🔗</span>
                                        </div>
                                        <h3 className="font-bold text-gray-900 mb-2">Service B</h3>
                                        <div className="text-3xl font-bold text-gray-900 mb-4">$49/mo</div>
                                        <div className="space-y-2 text-sm text-gray-600">
                                            <p>✓ All features</p>
                                            <p>✗ Monthly limits</p>
                                            <p>✗ Premium only</p>
                                            <p>✓ Registration required</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </section>

                    {/* FAQ Section */}
                    <section className="pb-32 px-8">
                        <div className="max-w-4xl mx-auto">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.6 }}
                                className="text-center mb-12"
                            >
                                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                                    Frequently Asked Questions
                                </h2>
                                <p className="text-xl text-gray-600">
                                    Everything you need to know about our pricing
                                </p>
                            </motion.div>

                            <div className="space-y-6">
                                {faqs.map((faq, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.7 + (index * 0.1) }}
                                        className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-shadow"
                                    >
                                        <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                            {faq.question}
                                        </h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            {faq.answer}
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
                                transition={{ duration: 0.6, delay: 1 }}
                                className="bg-gray-900 text-white rounded-3xl p-12 text-center"
                            >
                                <h2 className="text-4xl font-bold mb-4">
                                    Ready to get started?
                                </h2>
                                <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                                    Join thousands of users who trust Shorteny for their link shortening needs.
                                </p>
                                <a
                                    href="/"
                                    className="inline-block px-8 py-4 bg-white hover:bg-gray-100 text-gray-900 rounded-xl font-semibold transition-all hover:shadow-lg"
                                >
                                    Create Your First Link
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