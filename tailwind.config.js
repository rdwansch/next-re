/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}', // Note the addition of the `app` directory.
    './src/components/**/*.{js,ts,jsx,tsx}',
    '!./node_modules',
  ],
};
