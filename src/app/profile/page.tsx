"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AppLayout from "../components/AppLayout";
import { authApi } from "../services/api";
import Link from "next/link";

interface UserData {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    username?: string;
    created_at: string;
}

export default function ProfilePage() {
    const router = useRouter();
    const [userData, setUserData] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
    });

    const fetchUserData = useCallback(async (token: string) => {
        setLoading(true);
        try {
            const data = await authApi.getUserDetails(token);
            if (data.data) {
                setUserData(data.data);
                setFormData({
                    first_name: data.data.first_name || "",
                    last_name: data.data.last_name || "",
                    email: data.data.email || "",
                });
            }
        } catch (err: any) {
            setError("Failed to load profile data");
            if (err.message.includes("unauthorized") || err.message.includes("token")) {
                localStorage.removeItem("token");
                router.push("/login");
            }
        } finally {
            setLoading(false);
        }
    }, [router]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/login");
        } else {
            fetchUserData(token);
        }
    }, [router, fetchUserData]);

    const handleSave = async () => {
        setSaving(true);
        setError("");
        setSuccess("");

        try {
            // TODO: Implement update profile API when backend is ready
            // const token = localStorage.getItem("token");
            // await authApi.updateProfile(token, formData);
            
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            setSuccess("Profile updated successfully!");
            setEditing(false);
            
            // Trigger navbar update
            window.dispatchEvent(new Event('auth-change'));
        } catch (err: any) {
            setError(err.message || "Failed to update profile");
        } finally {
            setSaving(false);
        }
    };

    const handleCancel = () => {
        setFormData({
            first_name: userData?.first_name || "",
            last_name: userData?.last_name || "",
            email: userData?.email || "",
        });
        setEditing(false);
        setError("");
    };

    if (loading) {
        return (
            <AppLayout>
                <div className="min-h-screen bg-white flex items-center justify-center">
                    <div className="text-gray-600">Loading...</div>
                </div>
            </AppLayout>
        );
    }

    return (
        <AppLayout>
            <div className="min-h-screen bg-white">
                <Navbar />

                <main className="pt-28 pb-16 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto">
                        {/* Header */}
                        <div className="mb-8">
                            <h1 className="text-4xl font-bold text-gray-900 mb-2">Profile Settings</h1>
                            <p className="text-gray-600">Manage your account information</p>
                        </div>

                        {/* Messages */}
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mb-6 p-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg"
                            >
                                {error}
                            </motion.div>
                        )}
                        
                        {success && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mb-6 p-4 text-sm text-green-600 bg-green-50 border border-green-100 rounded-lg"
                            >
                                {success}
                            </motion.div>
                        )}

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Profile Card */}
                            <div className="lg:col-span-1">
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="bg-gray-50 rounded-2xl p-8 border-2 border-gray-100 text-center"
                                >
                                    <div className="w-24 h-24 bg-gradient-to-br from-gray-900 to-gray-700 rounded-full mx-auto mb-4 flex items-center justify-center">
                                        <span className="text-white text-3xl font-bold">
                                            {userData?.first_name?.charAt(0).toUpperCase() || "U"}
                                        </span>
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                        {userData?.first_name} {userData?.last_name}
                                    </h2>
                                    <p className="text-gray-600">{userData?.email}</p>
                                </motion.div>
                            </div>

                            {/* Profile Form */}
                            <div className="lg:col-span-2">
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="bg-gray-50 rounded-2xl p-8 border-2 border-gray-100"
                                >
                                    <div className="flex justify-between items-center mb-6">
                                        <h3 className="text-xl font-bold text-gray-900">Personal Information</h3>
                                        {!editing && (
                                            <button
                                                onClick={() => setEditing(true)}
                                                className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium transition-colors flex items-center gap-2"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                                Edit
                                            </button>
                                        )}
                                    </div>

                                    <div className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-900 mb-2">
                                                    First Name
                                                </label>
                                                <input
                                                    type="text"
                                                    value={formData.first_name}
                                                    onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                                                    disabled={!editing}
                                                    className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:border-gray-900 transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-900 mb-2">
                                                    Last Name
                                                </label>
                                                <input
                                                    type="text"
                                                    value={formData.last_name}
                                                    onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                                                    disabled={!editing}
                                                    className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:border-gray-900 transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-900 mb-2">
                                                Email Address
                                            </label>
                                            <input
                                                type="email"
                                                value={formData.email}
                                                disabled={true}
                                                className="w-full px-4 py-3 bg-gray-100 border-2 border-gray-200 rounded-lg text-gray-500 cursor-not-allowed"
                                            />
                                            <p className="text-xs text-gray-500 mt-2">Email cannot be changed</p>
                                        </div>

                                        {editing && (
                                            <div className="flex gap-3 pt-4">
                                                <button
                                                    onClick={handleSave}
                                                    disabled={saving}
                                                    className="flex-1 bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-all disabled:opacity-50"
                                                >
                                                    {saving ? "Saving..." : "Save Changes"}
                                                </button>
                                                <button
                                                    onClick={handleCancel}
                                                    disabled={saving}
                                                    className="flex-1 border-2 border-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:border-gray-900 hover:text-gray-900 transition-all"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </main>

                <Footer />
            </div>
        </AppLayout>
    );
}
