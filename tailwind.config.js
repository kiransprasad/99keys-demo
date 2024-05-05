/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    // If TailwindCSS isn't working in a directory, add the directory path here!
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/react-tailwindcss-select/dist/index.esm.js",
  ],
  theme: {
    colors: {
      // Defining theme colours - change here to change the theme of the website!
      // Note: Some components required non-tailwind colour definitions, so changing these will recolour MOST but not necessarily ALL components.
      // To fix this, a dictionary could be defined in a seperate file with each theme colour mapped to the string (hex colour value), and then
      // it could be imported into both here and the pages it is required manually in order to replace hard-coded hex strings with its variable.
      t_Highlight: '#ff4b13',
      t_DarkHighlight: '#df3b03',
      t_Dark: '#474747',
      t_Medium: '#a4a4a4',
      t_MediumBg: '#e7e7e7',
      t_Light: '#ffffff',
    },
    extend: {},
  },
  plugins: [],
}
