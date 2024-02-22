// eslint-disable-next-line import/no-extraneous-dependencies
import BundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = BundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
    removeConsole: true,
  },
  transpilePackages: [

  ],
};

export default withBundleAnalyzer(nextConfig);
