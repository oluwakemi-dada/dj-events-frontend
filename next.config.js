/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', process.env.IMAGE_DOMAIN],
  },
};
