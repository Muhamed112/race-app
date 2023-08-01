/** @type {import('next').NextConfig} */
const { parsed: env } = require("dotenv").config();

const nextConfig = {
  env: {
    EMAIL: env.EMAIL,
    PASSWORD: env.PASSWORD,
  },
};

module.exports = nextConfig;
