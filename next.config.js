module.exports = {
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'http://localhost:3000/:path*',
        },
        {
          source: '/moderate/:path*',
          destination: 'http://localhost:3001/:path*',
        },
        {
          source: '/submit/:path*',
          destination: 'http://localhost:3002/:path*',
        },
      ];
    },
  };
  