import { Config } from "tailwindcss"

const config: Config = {
  content: ["src/app/**/*.tsx", "src/components/*.tsx"],
  theme: {
    extend: {
      colors: {
        foreground: "#1b1304",
        background: "#fdf8ee",
        primary: "#df932a",
      },
    },
  },
}

export default config
