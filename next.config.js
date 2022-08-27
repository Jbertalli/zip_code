/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig

module.exports = {
  env: {
    API_ENDPOINT: `https://api.openweathermap.org/data/2.5/weather?`,
    API_KEY: `0a6c7a4e56dfa967793cbd7761dde032`
  }
};
