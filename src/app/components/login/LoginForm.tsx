"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface LoginFormProps {
    email: string;
    password: string;
    setEmail: (email: string) => void;
    setPassword: (password: string) => void;
    handleSubmit: (e: React.FormEvent) => void;
    error?: string;
    loading?: boolean;
}

export function LoginForm({ 
    email, 
    password, 
    setEmail, 
    setPassword, 
    handleSubmit,
    error,
    loading 
}: LoginFormProps) {
    const [showPassword, setShowPassword] = useState(false);

    return (    
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
        >
            <div className="text-center md:text-left">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                    Welcome back
                </h1>
                <p className="text-gray-600">Sign in to your account to continue</p>
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

                <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                        Password
                    </label>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 pr-12 bg-white border-2 border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:border-gray-900 transition-all"
                            placeholder="Enter your password"
                            required
                            disabled={loading}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                            disabled={loading}
                        >
                            {showPassword ? (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="remember"
                            className="h-4 w-4 text-gray-900 focus:ring-gray-900 border-gray-300 rounded"
                            disabled={loading}
                        />
                        <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                            Remember me 
                        </label>
                    </div>
                    <Link 
                        href="/forgot-password" 
                        className="text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors"
                    >
                        Forgot password?
                    </Link>
                </div>

                <button
                    type="submit"
                    className={`w-full bg-gray-900 text-white py-3 rounded-lg font-semibold transition-all ${
                        loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-gray-800'
                    }`}
                    disabled={loading}
                >
                    {loading ? 'Signing in...' : 'Sign in'}
                </button>
            </form>

            <p className="text-center text-sm text-gray-600">
                Don&apos;t have an account?{' '}
                <Link href="/signup" className="text-gray-900 hover:underline font-semibold">
                    Sign up
                </Link>
            </p>
        </motion.div>
    );
}