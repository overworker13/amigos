/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "bg-sort-asc": "url('/public/icons/ico-sort-asc.svg')",
        "bg-sort-desc": "url('/public/icons/ico-sort-dsc.svg')",
      },
    },
  },
  plugins: [],
}
