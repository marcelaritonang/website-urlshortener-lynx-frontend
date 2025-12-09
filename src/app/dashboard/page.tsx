"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AppLayout from "../components/AppLayout";
import { motion, AnimatePresence } from "framer-motion";
import { authApi, urlService } from "../services/api";

interface Url {
  id: string;
  long_url: string;
  short_url: string;
  clicks: number;
  created_at: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [urls, setUrls] = useState<Url[]>([]);
  const [inputUrl, setInputUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [totalLinks, setTotalLinks] = useState(0);
  const [totalClicks, setTotalClicks] = useState(0);
  const [copied, setCopied] = useState("");
  const [userName, setUserName] = useState("");
  const [showQRModal, setShowQRModal] = useState(false);
  const [selectedQR, setSelectedQR] = useState<{ url: string; qrCode: string } | null>(null);
  const [loadingQR, setLoadingQR] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      fetchUserData(token);
      fetchUrls(token);
    }
  }, [router]);

  // Auto-refresh URLs every 5 seconds to update clicks
  useEffect(() => {
    if (!autoRefresh) return;

    const token = localStorage.getItem("token");
    if (!token) return;

    const intervalId = setInterval(() => {
      fetchUrls(token, false); // false = silent refresh without loading spinner
    }, 5000); // Refresh every 5 seconds

    return () => clearInterval(intervalId);
  }, [autoRefresh]);

  const fetchUserData = async (token: string) => {
    try {
      const data = await authApi.getUserDetails(token);
      if (data.data) {
        setUserName(data.data.first_name || "User");
      }
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };

  const fetchUrls = async (token: string, showLoading = true) => {
    if (showLoading) setLoading(true);
    setError("");
    try {
      const data = await authApi.getUserUrls(token, 1, 10);

      if (data.data && Array.isArray(data.data)) {
        const urls = data.data.map((item: any) => item.url);
        setUrls(urls);
        setTotalLinks(data.meta?.total || 0);
        const clicks = urls.reduce(
          (sum: number, url: Url) => sum + url.clicks,
          0
        );
        setTotalClicks(clicks);
      } else {
        setUrls([]);
      }
    } catch (err: any) {
      if (showLoading) {
        setError(err.message || "Failed to fetch URLs");
      }
      if (err.message.includes("unauthorized") || err.message.includes("token")) {
        localStorage.removeItem("token");
        router.push("/login");
      }
    } finally {
      if (showLoading) setLoading(false);
    }
  };

  const handleShorten = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }

      const data = await authApi.createShortUrl(token, inputUrl);

      setUrls((prevUrls) => [data.data, ...prevUrls]);
      setInputUrl("");
      setSuccessMessage("Link shortened successfully!");
      setTotalLinks((prevTotal) => prevTotal + 1);
      setTotalClicks((prevTotal) => prevTotal + 0);
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err: any) {
      setError(err.message || "Failed to create short URL");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async (url: string) => {
    await navigator.clipboard.writeText(url);
    setCopied(url);
    setTimeout(() => setCopied(""), 2000);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this link?")) return;

    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }

      await authApi.deleteUrl(token, id);

      const deletedUrl = urls.find((url) => url.id === id);
      setUrls((prevUrls) => prevUrls.filter((url) => url.id !== id));
      setTotalLinks((prevTotal) => prevTotal - 1);
      if (deletedUrl) {
        setTotalClicks((prevTotal) => prevTotal - deletedUrl.clicks);
      }
      setSuccessMessage("Link deleted successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err: any) {
      setError(err.message || "Failed to delete URL");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        await authApi.logout(token);
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('token');
      // Trigger auth change event
      window.dispatchEvent(new Event('auth-change'));
      router.push('/');
    }
  };

  const handleShowQR = async (shortUrl: string) => {
    setLoadingQR(true);
    setShowQRModal(true);
    
    try {
      // Extract short code from URL
      const shortCode = shortUrl.split('/').pop();
      if (!shortCode) throw new Error('Invalid short code');
      
      const response = await urlService.getQRCodeBase64(shortCode);
      
      if (response.success && response.data) {
        setSelectedQR({
          url: shortUrl,
          qrCode: response.data.qr_code
        });
      }
    } catch (err: any) {
      console.error('Failed to load QR code:', err);
      setError('Failed to load QR code');
      setShowQRModal(false);
    } finally {
      setLoadingQR(false);
    }
  };

  const handleDownloadQR = () => {
    if (!selectedQR) return;
    
    const link = document.createElement('a');
    link.href = selectedQR.qrCode;
    link.download = `qr-code-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();                                                                                   
    document.body.removeChild(link);
  };

  return (
    <AppLayout>
      <div className="min-h-screen bg-white">
        <Navbar />

        <main className="pt-28 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-12">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                  Dashboard
                </h1>
                <p className="text-gray-600">
                  {userName
                    ? `Welcome back, ${userName}!`
                    : "Manage your shortened links"}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setAutoRefresh(!autoRefresh)}
                  className={`px-4 py-2.5 border-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                    autoRefresh
                      ? "border-green-500 text-green-600 bg-green-50"
                      : "border-gray-200 text-gray-700 hover:border-gray-900"
                  }`}
                  title={autoRefresh ? "Auto-refresh enabled (updates every 5s)" : "Click to enable auto-refresh"}
                >
                  <svg className={`w-5 h-5 ${autoRefresh ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span className="hidden sm:inline">
                    {autoRefresh ? "Auto-refresh On" : "Auto-refresh Off"}
                  </span>
                </button>
                <button
                  onClick={handleLogout}
                  className="px-6 py-2.5 border-2 border-gray-200 text-gray-700 rounded-lg font-medium hover:border-gray-900 hover:text-gray-900 transition-all"
                >
                  Logout
                </button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-8 bg-gray-50 rounded-2xl border-2 border-gray-100"
              >
                <p className="text-gray-600 mb-2">Total Links</p>
                <p className="text-4xl font-bold text-gray-900">{totalLinks}</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="p-8 bg-gray-50 rounded-2xl border-2 border-gray-100"
              >
                <p className="text-gray-600 mb-2">Total Clicks</p>
                <p className="text-4xl font-bold text-gray-900">{totalClicks}</p>
              </motion.div>
            </div>

            {/* Create Link Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Create new link
              </h2>
              <form onSubmit={handleShorten} className="flex gap-3">
                <input
                  type="url"
                  value={inputUrl}
                  onChange={(e) => setInputUrl(e.target.value)}
                  placeholder="Paste your long URL here"
                  className="flex-1 px-6 py-4 border-2 border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:border-gray-900 transition-all"
                  disabled={loading}
                  required
                />
                <button
                  type="submit"
                  className="px-8 py-4 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-all disabled:opacity-50"
                  disabled={loading}
                >
                  {loading ? "Creating..." : "Shorten"}
                </button>
              </form>

              {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
              {successMessage && (
                <p className="mt-3 text-sm text-green-600">{successMessage}</p>
              )}
            </motion.div>

            {/* Links List */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Your links</h2>

              {urls.length === 0 ? (
                <div className="text-center py-16 bg-gray-50 rounded-2xl border-2 border-gray-100">
                  <svg
                    className="w-16 h-16 mx-auto mb-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                    />
                  </svg>
                  <p className="text-gray-600">
                    No links yet. Create your first shortened link above!
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <AnimatePresence>
                    {urls.map((url, index) => (
                      <motion.div
                        key={url.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ delay: index * 0.05 }}
                        className="p-6 bg-gray-50 rounded-2xl border-2 border-gray-100 hover:border-gray-300 transition-all"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-gray-500 mb-2">
                              Original URL
                            </p>
                            <p className="text-gray-900 truncate mb-4">
                              {url.long_url}
                            </p>

                            <div className="flex items-center gap-4">
                              <a
                                href={url.short_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-900 font-semibold hover:underline"
                              >
                                {url.short_url}
                              </a>
                              <button
                                onClick={() => handleCopy(url.short_url)}
                                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                              >
                                {copied === url.short_url ? "Copied!" : "Copy"}
                              </button>
                              <button
                                onClick={() => handleShowQR(url.short_url)}
                                className="text-sm text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-1"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                                </svg>
                                QR Code
                              </button>
                            </div>
                          </div>

                          <div className="flex items-center gap-6">
                            <div className="text-center">
                              <p className="text-2xl font-bold text-gray-900">
                                {url.clicks}
                              </p>
                              <p className="text-sm text-gray-500">clicks</p>
                            </div>
                            <button
                              onClick={() => handleDelete(url.id)}
                              className="text-gray-400 hover:text-red-600 transition-colors"
                              disabled={loading}
                            >
                              <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </div>
        </main>

        {/* QR Code Modal */}
        <AnimatePresence>
          {showQRModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setShowQRModal(false)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">QR Code</h3>
                  <button
                    onClick={() => setShowQRModal(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {loadingQR ? (
                  <div className="flex flex-col items-center justify-center py-12">
                    <div className="w-16 h-16 border-4 border-gray-200 border-t-gray-900 rounded-full animate-spin mb-4"></div>
                    <p className="text-gray-600">Generating QR Code...</p>
                  </div>
                ) : selectedQR ? (
                  <div className="space-y-6">
                    <div className="bg-white border-2 border-gray-200 rounded-xl p-6 flex items-center justify-center">
                      <img
                        src={selectedQR.qrCode}
                        alt="QR Code"
                        className="w-64 h-64"
                      />
                    </div>

                    <div className="text-center">
                      <p className="text-sm text-gray-600 mb-1">Short URL</p>
                      <p className="text-gray-900 font-semibold break-all">
                        {selectedQR.url}
                      </p>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={handleDownloadQR}
                        className="flex-1 bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-all flex items-center justify-center gap-2"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Download
                      </button>
                      <button
                        onClick={() => setShowQRModal(false)}
                        className="flex-1 border-2 border-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:border-gray-900 hover:text-gray-900 transition-all"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                ) : null}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <Footer />
      </div>
    </AppLayout>
  );
}
