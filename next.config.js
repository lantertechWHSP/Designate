const { createSecureHeaders } = require('next-secure-headers');

const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true
    },
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: createSecureHeaders({
                    poweredByHeader: false,
                    frameGuard: 'deny'
                })
            }
        ];
    },
    async redirects() {
        return [
            {
                source: '/home',
                destination: '/',
                permanent: true
            }
        ];
    }
};

module.exports = nextConfig;
