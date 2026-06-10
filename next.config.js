module.exports = {
	reactStrictMode: true,
	images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'scontent.cdninstagram.com',
      },
      {
        protocol: 'https',
        hostname: 'cdninstagram.com',
      },
      {
        protocol: 'https',
        hostname: 'mdbootstrap.com',
      },
    ],
  },
	async redirects() {
    return [
      {
        source: '/sign-up/register',
        destination: '/',
        permanent: true,
      },
      {
        source: '/register',
        destination: '/',
        permanent: true,
      },
      {
        source: '/course-info',
        destination: '/classes',
        permanent: true,
      },
			{
        source: '/courses',
        destination: '/classes',
        permanent: true,
      }
    ]
  },
};
