import stylexPlugin from '@stylexjs/nextjs-plugin';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

export default stylexPlugin({
  rootDir: __dirname,
})(nextConfig); 