"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import AppLayout from './components/AppLayout';
import Footer from './components/Footer';
import TypeWriter from './components/TypeWriter';
import { urlService, ShortenURLResponse } from './services/api';

export default function Home() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [longUrl, setLongUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [result, setResult] = useState<ShortenURLResponse['data'] | null>(null);
    const [copied, setCopied] = useState(false);
    const [qrCode, setQrCode] = useState<string | null>(null);
    const [loadingQR, setLoadingQR] = useState(false);
    const [showQRModal, setShowQRModal] = useState(false);
    const shortenerRef = useRef<HTMLDivElement>(null);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const scrollToShortener = () => {
        shortenerRef.current?.scrollIntoView({ 
            behavior: 'smooth',
            block: 'center'
        });
    };

    const handleShorten = async () => {
        if (!longUrl.trim()) {
            setError("Please enter a URL");
            return;
        }

        // Basic URL validation
        try {
            new URL(longUrl);
        } catch {
            setError("Please enter a valid URL");
            return;
        }

        setLoading(true);
        setError("");
        setResult(null);
        setQrCode(null);

        try {
            const response = await urlService.shortenURL(longUrl);
            setResult(response.data);
            setLongUrl("");
            
            // Fetch QR Code
            const shortCode = response.data.short_code;
            if (shortCode) {
                setLoadingQR(true);
                try {
                    const qrResponse = await urlService.getQRCodeBase64(shortCode);
                    if (qrResponse.success && qrResponse.data) {
                        setQrCode(qrResponse.data.qr_code);
                    }
                } catch (qrError) {
                    console.error('Failed to load QR code:', qrError);
                } finally {
                    setLoadingQR(false);
                }
            }
        } catch (err: any) {
            setError(err.message || "Failed to shorten URL. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleCopy = async () => {
        if (result) {
            await navigator.clipboard.writeText(result.short_url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const handleShowQR = () => {
        setShowQRModal(true);
    };

    const handleDownloadQR = () => {
        if (!qrCode) return;
        
        const link = document.createElement('a');
        link.href = qrCode;
        link.download = `qr-code-${result?.short_code || Date.now()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleShorten();
        }
    };

    return (
        <AppLayout>
            <div className="bg-white min-h-screen relative overflow-hidden">
                <Navbar 
                    showSidebarToggle={true}
                    onToggleSidebar={toggleSidebar}
                    onGetStartedClick={scrollToShortener}
                />

                <AnimatePresence>
                    {sidebarOpen && (
                        <Sidebar onClose={toggleSidebar} />
                    )}
                </AnimatePresence>

                {/* Floating Isometric Elements */}
                <motion.div 
                    className="absolute right-32 top-32 w-20 h-20 bg-gradient-to-br from-indigo-400 to-purple-500 opacity-20"
                    style={{
                        transform: 'rotateX(45deg) rotateZ(45deg)',
                        transformStyle: 'preserve-3d',
                    }}
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 0.2, y: 0 }}
                    transition={{ duration: 1, delay: 0.3 }}
                />

                <motion.div 
                    className="absolute right-64 top-64 w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-500 opacity-15"
                    style={{
                        transform: 'rotateX(45deg) rotateZ(45deg)',
                        transformStyle: 'preserve-3d',
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 0.15, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                />

                <motion.div 
                    className="absolute right-20 bottom-40 w-24 h-24 bg-gradient-to-br from-purple-400 to-indigo-500 opacity-10"
                    style={{
                        transform: 'rotateX(45deg) rotateZ(45deg)',
                        transformStyle: 'preserve-3d',
                    }}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 0.1, x: 0 }}
                    transition={{ duration: 1.2, delay: 0.9 }}
                />

                <motion.div 
                    className="absolute left-32 top-48 w-14 h-14 bg-gradient-to-br from-blue-400 to-indigo-500 opacity-15"
                    style={{
                        transform: 'rotateX(45deg) rotateZ(45deg)',
                        transformStyle: 'preserve-3d',
                    }}
                    initial={{ opacity: 0, rotate: -45 }}
                    animate={{ opacity: 0.15, rotate: 0 }}
                    transition={{ duration: 1, delay: 0.4 }}
                />

                <motion.div 
                    className="absolute left-64 bottom-32 w-18 h-18 bg-gradient-to-br from-indigo-400 to-blue-500 opacity-12"
                    style={{
                        transform: 'rotateX(45deg) rotateZ(45deg)',
                        transformStyle: 'preserve-3d',
                    }}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 0.12, y: 0 }}
                    transition={{ duration: 0.9, delay: 1.1 }}
                />

                <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-[280px]' : ''}`}>
                    <main className="flex items-center w-full max-w-6xl px-8 mx-auto min-h-screen relative z-10">
                        <div ref={shortenerRef} className="w-full max-w-3xl mx-auto">
                            <motion.div 
                                className="text-center mb-12"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                <h1 className="text-7xl font-bold mb-6 text-gray-900 leading-tight min-h-[5rem]">
                                    <TypeWriter 
                                        texts={[
                                            "Shorten your links",
                                            "Track your clicks",
                                            "Grow your business",
                                            "Share with ease"
                                        ]}
                                        typingSpeed={100}
                                        deletingSpeed={50}
                                        delayBetween={2000}
                                    />
                                </h1>
                                <p className="text-gray-600 text-xl max-w-2xl mx-auto">
                                    Create short, memorable links in seconds. Track clicks and optimize your campaigns.
                                </p>
                            </motion.div>

                            {/* URL Input */}
                            <motion.div 
                                className="bg-gray-50 rounded-2xl p-8 mb-8 shadow-sm"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                            >
                                <div className="flex items-stretch gap-3 mb-4">
                                    <input
                                        type="text"
                                        value={longUrl}
                                        onChange={(e) => setLongUrl(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                        placeholder="Paste your long URL here"
                                        className="flex-1 px-6 py-5 bg-white border-2 border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:border-gray-900 text-lg transition-all"
                                        disabled={loading}
                                    />
                                    <button 
                                        onClick={handleShorten}
                                        disabled={loading}
                                        className="bg-gray-900 text-white px-10 py-5 rounded-xl font-semibold hover:bg-gray-800 transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {loading ? "Shortening..." : "Shorten"}
                                    </button>
                                </div>

                                {error && (
                                    <p className="text-sm text-red-600 text-center mb-2">
                                        {error}
                                    </p>
                                )}

                                <p className="text-sm text-gray-500 text-center">
                                    Free forever • No registration required
                                </p>
                            </motion.div>

                            {/* Result Display */}
                            <AnimatePresence>
                                {result && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200"
                                    >
                                        {/* Short URL Display with Logo */}
                                        <div className="flex items-center gap-3 mb-6">
                                            {/* Logo */}
                                            <div className="w-12 h-12 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                                </svg>
                                            </div>
                                            {/* URL with Copy Box */}
                                            <div className="flex-1 flex items-center gap-2 bg-gray-50 rounded-xl p-4 border border-gray-200">
                                                <a 
                                                    href={result.short_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex-1 text-lg font-semibold text-gray-900 hover:text-indigo-600 transition-colors truncate"
                                                >
                                                    {result.short_url}
                                                </a>
                                                <button
                                                    onClick={handleCopy}
                                                    className="px-4 py-2 bg-white hover:bg-gray-100 border border-gray-300 text-gray-700 rounded-lg font-medium transition-all flex items-center gap-2 flex-shrink-0"
                                                >
                                                    {copied ? (
                                                        <>
                                                            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                            </svg>
                                                            <span className="text-green-600">Copied</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                            </svg>
                                                            Copy
                                                        </>
                                                    )}
                                                </button>
                                            </div>
                                        </div>

                                        {/* QR Code Button */}
                                        <div className="mb-6">
                                            <button
                                                onClick={handleShowQR}
                                                className="w-full px-6 py-3 border-2 border-gray-200 text-gray-700 hover:border-gray-900 hover:text-gray-900 rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                                                </svg>
                                                View QR Code
                                            </button>
                                        </div>

                                        {/* Stats */}
                                        <div className="pt-6 border-t border-gray-200">
                                            <div className="grid grid-cols-2 gap-6">
                                                <div>
                                                    <p className="text-xs text-gray-500 mb-1.5 uppercase tracking-wide">Original URL</p>
                                                    <p className="text-gray-900 text-sm truncate font-medium">
                                                        {result.long_url}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500 mb-1.5 uppercase tracking-wide">Total Clicks</p>
                                                    <p className="text-gray-900 text-2xl font-bold">
                                                        {result.clicks}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </main>
                </div>
            </div>

            {/* QR Code Modal */}
            <AnimatePresence>
                {showQRModal && result && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => setShowQRModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-2xl font-bold text-gray-900">Share via QR code</h3>
                                <button
                                    onClick={() => setShowQRModal(false)}
                                    className="text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {/* QR Code */}
                            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 mb-6 flex items-center justify-center">
                                {loadingQR ? (
                                    <div className="w-64 h-64 flex items-center justify-center">
                                        <div className="flex flex-col items-center gap-3">
                                            <div className="w-12 h-12 border-4 border-gray-200 border-t-gray-900 rounded-full animate-spin"></div>
                                            <p className="text-sm text-gray-600 font-medium">Generating...</p>
                                        </div>
                                    </div>
                                ) : qrCode ? (
                                    <img
                                        src={qrCode}
                                        alt="QR Code"
                                        className="w-64 h-64 object-contain"
                                    />
                                ) : (
                                    <div className="w-64 h-64 flex flex-col items-center justify-center text-gray-400">
                                        <svg className="w-16 h-16 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                                        </svg>
                                        <p className="text-sm">QR Code unavailable</p>
                                    </div>
                                )}
                            </div>

                            {/* URL Display */}
                            <div className="text-center mb-6">
                                <p className="text-sm text-gray-500 mb-2">Here is your unique QR code that will direct</p>
                                <p className="text-gray-900 font-semibold break-all">
                                    {result.short_url}
                                </p>
                            </div>

                            {/* Download Button */}
                            {qrCode && (
                                <button
                                    onClick={handleDownloadQR}
                                    className="w-full px-6 py-3.5 bg-gray-900 hover:bg-gray-800 text-white rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                    </svg>
                                    Download QR Code
                                </button>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <Footer />
        </AppLayout>
    );
}