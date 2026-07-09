import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        red: colors.red,
        blue: colors.blue,
        green: colors.green,
        // Add other palettes if needed
      },
    },
  },
  plugins: [],
};

export default config;