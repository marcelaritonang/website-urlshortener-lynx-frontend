const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

// Helper untuk ngrok requests
const ngrokHeaders = {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': '69420', // Skip ngrok browser warning
};

export interface ShortenURLRequest {
    long_url: string;
    short_code?: string;
}

export interface ShortenURLResponse {
    success: boolean;
    message: string;
    data: {
        id: string;
        long_url: string;
        short_url: string;
        short_code: string;
        clicks: number;
        is_anonymous: boolean;
        expires_at: string;
        created_at: string;
    };
}

export const urlService = {
    async shortenURL(longUrl: string, customAlias?: string): Promise<ShortenURLResponse> {
        const response = await fetch(`${API_BASE_URL}/api/urls`, {
            method: 'POST',
            headers: ngrokHeaders,
            body: JSON.stringify({
                long_url: longUrl,
                custom_short_code: customAlias,
                expiry_hours: 168
            }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to shorten URL');
        }

        const result = await response.json();
        
        // Fix short_url to use ngrok domain instead of localhost
        if (result.data && result.data.short_url) {
            result.data.short_url = result.data.short_url.replace(
                'http://localhost:8080',
                API_BASE_URL
            );
        }

        return result;
    },

    getShortURL(shortCode: string): string {
        return `${API_BASE_URL}/urls/${shortCode}`;
    },

    getQRCodeURL(shortCode: string): string {
        return `${API_BASE_URL}/qr/${shortCode}`;
    },

    async getQRCodeBase64(shortCode: string) {
        const response = await fetch(`${API_BASE_URL}/qr/${shortCode}/base64`, {
            method: 'GET',
            headers: ngrokHeaders,
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to get QR code');
        }

        return response.json();
    },
};

// Add authenticated API functions
export const authApi = {
    async register(email: string, password: string, firstName: string, lastName: string) {
        const response = await fetch(`${API_BASE_URL}/v1/auth/register`, {
            method: 'POST',
            headers: ngrokHeaders,
            body: JSON.stringify({
                email,
                password,
                first_name: firstName,
                last_name: lastName
            }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to register');
        }

        return response.json();
    },

    async login(email: string, password: string) {
        const response = await fetch(`${API_BASE_URL}/v1/auth/login`, {
            method: 'POST',
            headers: ngrokHeaders,
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to login');
        }

        return response.json();
    },

    // Get user's URLs (authenticated)
    async getUserUrls(token: string, page: number = 1, perPage: number = 10) {
        const response = await fetch(
            `${API_BASE_URL}/v1/api/urls?page=${page}&per_page=${perPage}`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to fetch URLs');
        }

        return response.json();
    },

    // Create short URL (authenticated)
    async createShortUrl(token: string, longUrl: string, shortCode?: string) {
        const response = await fetch(`${API_BASE_URL}/v1/api/urls`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                long_url: longUrl,
                short_code: shortCode,
            }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to create short URL');
        }

        return response.json();
    },

    // Delete URL (authenticated)
    async deleteUrl(token: string, id: string) {
        const response = await fetch(`${API_BASE_URL}/v1/api/urls/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to delete URL');
        }

        return response.json();
    },

    // Get user details
    async getUserDetails(token: string) {
        const response = await fetch(`${API_BASE_URL}/v1/api/user/me`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to fetch user details');
        }

        return response.json();
    },

    // Logout
    async logout(token: string) {
        const response = await fetch(`${API_BASE_URL}/v1/api/user/logout`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to logout');
        }

        return response.json();
    },

    // Forgot Password
    async forgotPassword(email: string) {
        const response = await fetch(`${API_BASE_URL}/v1/auth/forgot-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to send reset email');
        }

        return response.json();
    },

    // Reset Password
    async resetPassword(token: string, newPassword: string) {
        const response = await fetch(`${API_BASE_URL}/v1/auth/reset-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token,
                new_password: newPassword,
            }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to reset password');
        }

        return response.json();
    },
};
