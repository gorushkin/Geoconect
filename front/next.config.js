module.exports = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_TYPE: process.env.NEXT_PUBLIC_TYPE,
    NEXT_PUBLIC_ORIGIN: process.env.ORIGIN,
    NEXT_PUBLIC_DEV_ORIGIN: process.env.DEV_ORIGIN,
    NEXT_PUBLIC_PROD_ORIGIN: process.env.PROD_ORIGIN,
    NEXT_PUBLIC_LOCAL_ORIGIN: process.env.LOCAL_ORIGIN,
  },
};
