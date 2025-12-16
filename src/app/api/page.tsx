"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AppLayout from '../components/AppLayout';
import Sidebar from '../components/Sidebar';
import { AnimatePresence } from "framer-motion";

export default function APIPage() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('javascript');
    const [copiedEndpoint, setCopiedEndpoint] = useState<string | null>(null);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const handleCopy = (text: string, endpoint: string) => {
        navigator.clipboard.writeText(text);
        setCopiedEndpoint(endpoint);
        setTimeout(() => setCopiedEndpoint(null), 2000);
    };

    const codeExamples = {
        javascript: `// Using Fetch API
const API_BASE = 'https://api.shorteny.com';

// Shorten URL (Anonymous)
fetch(\`\${API_BASE}/api/urls\`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    long_url: 'https://example.com/very-long-url'
  })
})
.then(response => response.json())
.then(data => {
  console.log('Short URL:', data.data.short_url);
  console.log('Short Code:', data.data.short_code);
})
.catch(error => console.error('Error:', error));`,
        
        python: `# Using requests library
import requests

API_BASE = "https://api.shorteny.com"

# Shorten URL (Anonymous)
url = f"{API_BASE}/api/urls"
payload = {
    "long_url": "https://example.com/very-long-url"
}

response = requests.post(url, json=payload)
data = response.json()

print("Short URL:", data['data']['short_url'])
print("Short Code:", data['data']['short_code'])`,

        curl: `# Shorten URL (Anonymous)
curl -X POST https://api.shorteny.com/api/urls \\
  -H "Content-Type: application/json" \\
  -d '{
    "long_url": "https://example.com/very-long-url"
  }'

# Get QR Code (Base64)
curl https://api.shorteny.com/qr/abc123/base64`,

        php: `<?php
// Using cURL
$api_base = 'https://api.shorteny.com';

// Shorten URL (Anonymous)
$ch = curl_init("$api_base/api/urls");

$data = array(
    'long_url' => 'https://example.com/very-long-url'
);

curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($ch);
curl_close($ch);

$result = json_decode($response, true);
echo "Short URL: " . $result['data']['short_url'];
?>`
    };

    const endpoints = [
        {
            method: 'POST',
            path: '/api/urls',
            title: 'Shorten URL (Anonymous)',
            description: 'Create a shortened URL without authentication. Free and instant.',
            request: `{
  "long_url": "https://example.com/very-long-url"
}`,
            response: `{
  "success": true,
  "message": "URL shortened successfully",
  "data": {
    "id": 123,
    "short_url": "https://shorteny.com/urls/abc123",
    "short_code": "abc123",
    "long_url": "https://example.com/very-long-url",
    "clicks": 0,
    "created_at": "2024-12-16T10:30:00Z",
    "updated_at": "2024-12-16T10:30:00Z"
  }
}`
        },
        {
            method: 'GET',
            path: '/urls/:shortCode',
            title: 'Redirect to Long URL',
            description: 'Redirects to the original long URL and increments click count',
            request: null,
            response: `HTTP 302 Redirect
Location: https://example.com/very-long-url`
        },
        {
            method: 'GET',
            path: '/qr/:shortCode',
            title: 'Get QR Code (PNG Image)',
            description: 'Returns QR code as PNG image for the shortened URL',
            request: null,
            response: `Content-Type: image/png

[Binary PNG Image Data]`
        },
        {
            method: 'GET',
            path: '/qr/:shortCode/base64',
            title: 'Get QR Code (Base64)',
            description: 'Returns QR code as base64-encoded string',
            request: null,
            response: `{
  "success": true,
  "data": {
    "short_code": "abc123",
    "qr_code": "data:image/png;base64,iVBORw0KGgoAAAANS..."
  }
}`
        },
        {
            method: 'GET',
            path: '/health',
            title: 'Health Check',
            description: 'Check if the API service is running',
            request: null,
            response: `{
  "success": true,
  "message": "Service is healthy",
  "data": {
    "time": "2024-12-16T10:30:00Z"
  }
}`
        }
    ];

    const authenticatedEndpoints = [
        {
            method: 'POST',
            path: '/v1/auth/register',
            title: 'Register User',
            description: 'Create a new user account',
            request: `{
  "email": "user@example.com",
  "password": "securePassword123",
  "name": "John Doe"
}`,
            response: `{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": 1,
      "email": "user@example.com",
      "name": "John Doe"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}`
        },
        {
            method: 'POST',
            path: '/v1/auth/login',
            title: 'Login',
            description: 'Authenticate and get JWT token',
            request: `{
  "email": "user@example.com",
  "password": "securePassword123"
}`,
            response: `{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": 1,
      "email": "user@example.com",
      "name": "John Doe"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}`
        },
        {
            method: 'POST',
            path: '/v1/api/urls',
            title: 'Create Short URL (Authenticated)',
            description: 'Create a shortened URL with authentication. Track all your links.',
            auth: true,
            request: `{
  "long_url": "https://example.com/very-long-url"
}`,
            response: `{
  "success": true,
  "message": "URL shortened successfully",
  "data": {
    "id": 123,
    "user_id": 1,
    "short_url": "https://shorteny.com/urls/abc123",
    "short_code": "abc123",
    "long_url": "https://example.com/very-long-url",
    "clicks": 0,
    "created_at": "2024-12-16T10:30:00Z"
  }
}`
        },
        {
            method: 'GET',
            path: '/v1/api/urls',
            title: 'Get User URLs',
            description: 'Get all shortened URLs for authenticated user',
            auth: true,
            request: null,
            response: `{
  "success": true,
  "data": [
    {
      "id": 123,
      "short_url": "https://shorteny.com/urls/abc123",
      "short_code": "abc123",
      "long_url": "https://example.com/page1",
      "clicks": 142
    },
    {
      "id": 124,
      "short_url": "https://shorteny.com/urls/def456",
      "short_code": "def456",
      "long_url": "https://example.com/page2",
      "clicks": 89
    }
  ]
}`
        },
        {
            method: 'DELETE',
            path: '/v1/api/urls/:id',
            title: 'Delete URL',
            description: 'Delete a shortened URL (authenticated users only)',
            auth: true,
            request: null,
            response: `{
  "success": true,
  "message": "URL deleted successfully"
}`
        }
    ];

    const errorCodes = [
        { code: 400, message: 'Bad Request', description: 'Invalid URL format or missing required fields' },
        { code: 401, message: 'Unauthorized', description: 'Invalid or missing authentication token' },
        { code: 404, message: 'Not Found', description: 'Short code does not exist' },
        { code: 429, message: 'Too Many Requests', description: 'Rate limit exceeded (100 req/min)' },
        { code: 500, message: 'Internal Server Error', description: 'Server error occurred' }
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
                        <div className="max-w-6xl mx-auto">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full border border-blue-200 mb-6">
                                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                    </svg>
                                    <span className="text-sm font-semibold text-blue-700">RESTful API</span>
                                </div>
                                <h1 className="text-6xl font-bold text-gray-900 mb-6">
                                    Developer API
                                </h1>
                                <p className="text-xl text-gray-600 max-w-3xl">
                                    Integrate Shorteny into your applications with our simple REST API. 
                                    No authentication required for basic URL shortening.
                                </p>
                            </motion.div>
                        </div>
                    </section>

                    {/* Quick Start */}
                    <section className="pb-16 px-8">
                        <div className="max-w-6xl mx-auto">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                            >
                                <h2 className="text-3xl font-bold text-gray-900 mb-6">Quick Start</h2>
                                <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
                                    <p className="text-gray-700 mb-6">
                                        The Shorteny API is a RESTful API built with Golang (Gin framework). 
                                        All responses are returned in JSON format with consistent structure.
                                    </p>
                                    <div className="grid md:grid-cols-3 gap-6">
                                        <div className="flex items-start gap-3">
                                            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0 border border-gray-200">
                                                <svg className="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-gray-900 mb-1">No Auth for Basic</h3>
                                                <p className="text-sm text-gray-600">Anonymous URL shortening available</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0 border border-gray-200">
                                                <svg className="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-gray-900 mb-1">Redis Cached</h3>
                                                <p className="text-sm text-gray-600">Lightning fast with Redis caching</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0 border border-gray-200">
                                                <svg className="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-gray-900 mb-1">JWT Protected</h3>
                                                <p className="text-sm text-gray-600">Secure authentication for user features</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </section>

                    {/* Base URL */}
                    <section className="pb-16 px-8">
                        <div className="max-w-6xl mx-auto">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                            >
                                <h2 className="text-3xl font-bold text-gray-900 mb-6">Base URL</h2>
                                <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
                                    <div className="flex items-center justify-between">
                                        <code className="text-green-400 font-mono text-lg">https://api.shorteny.com</code>
                                        <button
                                            onClick={() => handleCopy('https://api.shorteny.com', 'base')}
                                            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-sm transition-colors"
                                        >
                                            {copiedEndpoint === 'base' ? 'Copied!' : 'Copy'}
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </section>

                    {/* Public Endpoints */}
                    <section className="pb-16 px-8">
                        <div className="max-w-6xl mx-auto">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                            >
                                <h2 className="text-3xl font-bold text-gray-900 mb-4">Public Endpoints</h2>
                                <p className="text-gray-600 mb-8">No authentication required. Free to use instantly.</p>
                                <div className="space-y-8">
                                    {endpoints.map((endpoint, index) => (
                                        <div key={index} className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
                                            <div className="p-8 border-b border-gray-200">
                                                <div className="flex items-center gap-4 mb-4">
                                                    <span className={`px-3 py-1 rounded-lg text-sm font-semibold ${
                                                        endpoint.method === 'POST' 
                                                            ? 'bg-green-100 text-green-700' 
                                                            : 'bg-blue-100 text-blue-700'
                                                    }`}>
                                                        {endpoint.method}
                                                    </span>
                                                    <code className="text-lg font-mono text-gray-900">{endpoint.path}</code>
                                                </div>
                                                <h3 className="text-xl font-semibold text-gray-900 mb-2">{endpoint.title}</h3>
                                                <p className="text-gray-600">{endpoint.description}</p>
                                            </div>
                                            
                                            {endpoint.request && (
                                                <div className="p-8 bg-gray-50 border-b border-gray-200">
                                                    <div className="flex items-center justify-between mb-3">
                                                        <h4 className="text-sm font-semibold text-gray-700 uppercase">Request Body</h4>
                                                        <button
                                                            onClick={() => handleCopy(endpoint.request!, `request-${index}`)}
                                                            className="text-sm text-gray-600 hover:text-gray-900"
                                                        >
                                                            {copiedEndpoint === `request-${index}` ? '✓ Copied' : 'Copy'}
                                                        </button>
                                                    </div>
                                                    <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
                                                        <code>{endpoint.request}</code>
                                                    </pre>
                                                </div>
                                            )}
                                            
                                            <div className="p-8">
                                                <div className="flex items-center justify-between mb-3">
                                                    <h4 className="text-sm font-semibold text-gray-700 uppercase">Response</h4>
                                                    <button
                                                        onClick={() => handleCopy(endpoint.response, `response-${index}`)}
                                                        className="text-sm text-gray-600 hover:text-gray-900"
                                                    >
                                                        {copiedEndpoint === `response-${index}` ? '✓ Copied' : 'Copy'}
                                                    </button>
                                                </div>
                                                <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
                                                    <code>{endpoint.response}</code>
                                                </pre>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </section>

                    {/* Authenticated Endpoints */}
                    <section className="pb-16 px-8">
                        <div className="max-w-6xl mx-auto">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.5 }}
                            >
                                <h2 className="text-3xl font-bold text-gray-900 mb-4">Authenticated Endpoints</h2>
                                <p className="text-gray-600 mb-8">
                                    Requires JWT token in Authorization header: <code className="bg-gray-100 px-2 py-1 rounded text-sm">Bearer &lt;token&gt;</code>
                                </p>
                                <div className="space-y-8">
                                    {authenticatedEndpoints.map((endpoint, index) => (
                                        <div key={index} className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
                                            <div className="p-8 border-b border-gray-200">
                                                <div className="flex items-center gap-4 mb-4">
                                                    <span className={`px-3 py-1 rounded-lg text-sm font-semibold ${
                                                        endpoint.method === 'POST' 
                                                            ? 'bg-green-100 text-green-700'
                                                            : endpoint.method === 'DELETE'
                                                            ? 'bg-red-100 text-red-700' 
                                                            : 'bg-blue-100 text-blue-700'
                                                    }`}>
                                                        {endpoint.method}
                                                    </span>
                                                    <code className="text-lg font-mono text-gray-900">{endpoint.path}</code>
                                                    {endpoint.auth && (
                                                        <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs font-semibold rounded">
                                                            🔒 AUTH
                                                        </span>
                                                    )}
                                                </div>
                                                <h3 className="text-xl font-semibold text-gray-900 mb-2">{endpoint.title}</h3>
                                                <p className="text-gray-600">{endpoint.description}</p>
                                            </div>
                                            
                                            {endpoint.request && (
                                                <div className="p-8 bg-gray-50 border-b border-gray-200">
                                                    <div className="flex items-center justify-between mb-3">
                                                        <h4 className="text-sm font-semibold text-gray-700 uppercase">Request Body</h4>
                                                        <button
                                                            onClick={() => handleCopy(endpoint.request!, `auth-request-${index}`)}
                                                            className="text-sm text-gray-600 hover:text-gray-900"
                                                        >
                                                            {copiedEndpoint === `auth-request-${index}` ? '✓ Copied' : 'Copy'}
                                                        </button>
                                                    </div>
                                                    <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
                                                        <code>{endpoint.request}</code>
                                                    </pre>
                                                </div>
                                            )}
                                            
                                            <div className="p-8">
                                                <div className="flex items-center justify-between mb-3">
                                                    <h4 className="text-sm font-semibold text-gray-700 uppercase">Response</h4>
                                                    <button
                                                        onClick={() => handleCopy(endpoint.response, `auth-response-${index}`)}
                                                        className="text-sm text-gray-600 hover:text-gray-900"
                                                    >
                                                        {copiedEndpoint === `auth-response-${index}` ? '✓ Copied' : 'Copy'}
                                                    </button>
                                                </div>
                                                <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
                                                    <code>{endpoint.response}</code>
                                                </pre>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </section>

                    {/* Code Examples */}
                    <section className="pb-16 px-8">
                        <div className="max-w-6xl mx-auto">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.6 }}
                            >
                                <h2 className="text-3xl font-bold text-gray-900 mb-8">Code Examples</h2>
                                <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
                                    <div className="flex border-b border-gray-200">
                                        {Object.keys(codeExamples).map((lang) => (
                                            <button
                                                key={lang}
                                                onClick={() => setActiveTab(lang)}
                                                className={`px-6 py-4 font-semibold transition-colors ${
                                                    activeTab === lang
                                                        ? 'bg-gray-900 text-white'
                                                        : 'bg-white text-gray-600 hover:text-gray-900'
                                                }`}
                                            >
                                                {lang.charAt(0).toUpperCase() + lang.slice(1)}
                                            </button>
                                        ))}
                                    </div>
                                    <div className="relative">
                                        <button
                                            onClick={() => handleCopy(codeExamples[activeTab as keyof typeof codeExamples], 'code')}
                                            className="absolute top-4 right-4 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-sm transition-colors"
                                        >
                                            {copiedEndpoint === 'code' ? 'Copied!' : 'Copy'}
                                        </button>
                                        <pre className="bg-gray-900 text-green-400 p-8 overflow-x-auto">
                                            <code>{codeExamples[activeTab as keyof typeof codeExamples]}</code>
                                        </pre>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </section>

                    {/* Error Codes */}
                    <section className="pb-16 px-8">
                        <div className="max-w-6xl mx-auto">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.7 }}
                            >
                                <h2 className="text-3xl font-bold text-gray-900 mb-8">Error Codes</h2>
                                <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
                                    <table className="w-full">
                                        <thead className="bg-gray-50 border-b border-gray-200">
                                            <tr>
                                                <th className="px-8 py-4 text-left text-sm font-semibold text-gray-900">Code</th>
                                                <th className="px-8 py-4 text-left text-sm font-semibold text-gray-900">Message</th>
                                                <th className="px-8 py-4 text-left text-sm font-semibold text-gray-900">Description</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {errorCodes.map((error, index) => (
                                                <tr key={index} className="border-b border-gray-200 last:border-0">
                                                    <td className="px-8 py-4">
                                                        <code className="text-red-600 font-mono font-semibold">{error.code}</code>
                                                    </td>
                                                    <td className="px-8 py-4 text-gray-900 font-medium">{error.message}</td>
                                                    <td className="px-8 py-4 text-gray-600">{error.description}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </motion.div>
                        </div>
                    </section>

                    {/* Rate Limiting */}
                    <section className="pb-32 px-8">
                        <div className="max-w-6xl mx-auto">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.8 }}
                            >
                                <h2 className="text-3xl font-bold text-gray-900 mb-8">Rate Limiting & Best Practices</h2>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="bg-white border border-gray-200 rounded-2xl p-8">
                                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Rate Limits</h3>
                                        <ul className="space-y-3 text-gray-600">
                                            <li className="flex items-start gap-3">
                                                <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                </svg>
                                                <span><strong>General:</strong> 100 requests/minute</span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <svg className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                </svg>
                                                <span><strong>Auth endpoints:</strong> Strict limits apply</span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <svg className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                </svg>
                                                <span><strong>Block duration:</strong> 30 minutes if exceeded</span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="bg-white border border-gray-200 rounded-2xl p-8">
                                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Best Practices</h3>
                                        <ul className="space-y-3 text-gray-600">
                                            <li className="flex items-start gap-3">
                                                <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                                </svg>
                                                <span>Cache responses with Redis</span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                                </svg>
                                                <span>Handle CORS properly in production</span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                                </svg>
                                                <span>Always use HTTPS in production</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </section>
                </div>

                <Footer />
            </div>
        </AppLayout>
    );
}