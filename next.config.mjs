// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
    // Enable React Strict Mode for better debugging during development
    reactStrictMode: true,

    // Define environment variables to use across the app
    env: {
        MONGODB_URI: process.env.MONGODB_URI, 
    },
};

export default nextConfig;
