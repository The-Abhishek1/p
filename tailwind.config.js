/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      //Max-width
      m2xl: { max: "1535px" },

      mxl: { max: "1279px" },

      mlg: { max: "1023px" },
      mex: { max: "900px" },

      mmd: { max: "767px" },

      msm: { max: "639px" },
      ms: { max: "580px" },
      msmm: { max: "500px" },
      msmmm: { max: "450px" },

      //Min width

      smmm: { min: "450px" },
      smm: { min: "500px" },
      mss: { min: "581px" },
      sm: { min: "640px" },

      md: { min: "768px" },
      smex: { min: "901px" },
      lg: { min: "1024px" },

      xl: { min: "1280px" },
      xxl: { min: "1277px" },
    },
  },
  plugins: [],
};
