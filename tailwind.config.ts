import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        'crausel1': 'infiniteCarusel1 20s linear infinite',
        'crausel2': 'infiniteCarusel2 20s linear infinite'
      },
      keyframes: {
        infiniteCarusel1: {
          '0%': {transform: 'translateX(-100%)'},
          '100%': {transform: 'translateX(0)'}
        },
        infiniteCarusel2: {
          '0%': {transform: 'translateX(0%)'},
          '100%': {transform: 'translateX(100%)'}
        }
      },
      fontFamily: {
        main: ["PretendardVariable", "sans-serif"],
        styled: ["NanumMyeongjo", "serif"],
      },
      colors: {
        navbar: "#D9D9D9",
        brown: {
          1: "#fefae0",
          2: "eae0d5",
          3: "#c6ac8f",
          4: "#5e503f",
        },
        font: {
          textPrimary: "#292524",
          textSecondary: "#78716c",
        },
        border: "#A8A29E",
      },
      height: {
        "minu-nav": "calc(100vh - 100px)",
      },
    },
  },
  plugins: [],
};
export default config;

// !!!!텍스크 크기는 아래 텍스트 사용하되 변경 및 추가 시 협의!!!!
// - fontSize: sm, base, 3xl,
// - fontWeight: nomal semi-bold, bold,
