"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import AppLayout from '../components/AppLayout';
import { authApi } from '../services/api';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await authApi.forgotPassword(email);
            
            if (response.success) {
                setSuccess(true);
            } else {
                setError(response.message || 'Failed to send reset email');
            }
        } catch (err: any) {
            console.error('Forgot password error:', err);
            setError(err.message || 'Failed to send reset email. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AppLayout>
            <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
                <div className="w-full max-w-md">
                    {/* Logo */}
                    <div className="text-center mb-8">
                        <Link href="/" className="inline-flex items-center justify-center mb-6">
                            <div className="w-16 h-16 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 rounded-2xl flex items-center justify-center shadow-xl">
                                <svg
                                    className="w-9 h-9 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2.5}
                                        d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                                    />
                                </svg>
                            </div>
                        </Link>
                        <h2 className="text-3xl font-bold text-gray-900">Shorteny</h2>
                    </div>

                    {/* Forgot Password Card */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            className="space-y-6"
                        >
                            {!success ? (
                                <>
                                    <div className="text-center md:text-left">
                                        <h1 className="text-4xl font-bold text-gray-900 mb-2">
                                            Forgot password?
                                        </h1>
                                        <p className="text-gray-600">
                                            Enter your email and we&apos;ll send you instructions to reset your password.
                                        </p>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-5">
                                        {error && (
                                            <div className="p-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg">
                                                {error}
                                            </div>
                                        )}

                                        <div>
                                            <label className="block text-sm font-medium text-gray-900 mb-2">
                                                Email address
                                            </label>
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:border-gray-900 transition-all"
                                                placeholder="Enter your email"
                                                required
                                                disabled={loading}
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            className={`w-full bg-gray-900 text-white py-3 rounded-lg font-semibold transition-all ${
                                                loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-gray-800'
                                            }`}
                                            disabled={loading}
                                        >
                                            {loading ? 'Sending...' : 'Send reset link'}
                                        </button>
                                    </form>
                                </>
                            ) : (
                                <div className="text-center py-8">
                                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                        Check your email
                                    </h2>
                                    <p className="text-gray-600 mb-6">
                                        We&apos;ve sent a password reset link to<br />
                                        <span className="font-medium text-gray-900">{email}</span>
                                    </p>
                                    <p className="text-sm text-gray-500 mb-6">
                                        Didn&apos;t receive the email? Check your spam folder or{' '}
                                        <button
                                            onClick={() => setSuccess(false)}
                                            className="text-gray-900 hover:underline font-semibold"
                                        >
                                            try again
                                        </button>
                                    </p>
                                    <Link
                                        href="/login"
                                        className="inline-block px-6 py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-all"
                                    >
                                        Back to Login
                                    </Link>
                                </div>
                            )}

                            {!success && (
                                <p className="text-center text-sm text-gray-600">
                                    Remember your password?{' '}
                                    <Link href="/login" className="text-gray-900 hover:underline font-semibold">
                                        Sign in
                                    </Link>
                                </p>
                            )}
                        </motion.div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}