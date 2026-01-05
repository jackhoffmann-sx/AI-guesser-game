/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'team-blue': '#3B82F6',
        'team-green': '#10B981',
        'team-purple': '#8B5CF6',
        'team-orange': '#F59E0B',
      },
    },
  },
  plugins: [],
}
