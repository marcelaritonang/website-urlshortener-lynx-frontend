"use client";
export const dynamic = 'force-dynamic';

import { useState, useEffect, Suspense } from 'react'; // tambahkan Suspense
import { useRouter, useSearchParams } from 'next/navigation';
import { LoginForm } from '../components/login/LoginForm';
import AppLayout from '../components/AppLayout';
import Link from 'next/link';

// Pisahkan komponen yang pakai useSearchParams
function LoginContent() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        if (typeof window === 'undefined') return;
        
        const token = localStorage.getItem('token');
        if (token) {
            router.push('/dashboard');
            return;
        }

        if (searchParams.get('registered') === 'true') {
            setSuccess('Account created successfully! Please sign in.');
        }
    }, [searchParams, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            console.log('Attempting login with:', { email });

            const response = await fetch('http://localhost:8080/v1/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });

            const data = await response.json();
            console.log('Login response:', response.status, data);

            if (response.ok && data?.data?.token) {
                localStorage.setItem('token', data.data.token);
                
                window.dispatchEvent(new Event('storage'));
                window.dispatchEvent(new Event('auth-change'));
                
                router.push('/dashboard');
            } else {
                if (response.status === 401) {
                    setError('Invalid email or password. Please try again.');
                } else if (data.error) {
                    setError(data.error);
                } else if (data.message) {
                    setError(data.message);
                } else {
                    setError('Login failed. Please check your credentials.');
                }
            }
        } catch (error: any) {
            console.error('Login error:', error);
            setError('Network error. Please check your connection and try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
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

                {/* Success Message */}
                {success && (
                    <div className="mb-6 p-4 text-sm text-green-600 bg-green-50 border border-green-100 rounded-lg">
                        {success}
                    </div>
                )}

                {/* Login Form Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                    <LoginForm
                        email={email}
                        password={password}
                        setEmail={setEmail}
                        setPassword={setPassword}
                        handleSubmit={handleSubmit}
                        error={error}
                        loading={loading}
                    />
                </div>
            </div>
        </div>
    );
}

// Export dengan Suspense wrapper
export default function LoginPage() {
    return (
        <AppLayout>
            <Suspense fallback={
                <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                    <div className="text-center">
                        <div className="w-16 h-16 border-4 border-gray-200 border-t-gray-900 rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-gray-600">Loading...</p>
                    </div>
                </div>
            }>
                <LoginContent />
            </Suspense>
        </AppLayout>
    );
}