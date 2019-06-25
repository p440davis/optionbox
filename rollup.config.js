import typescript from "rollup-plugin-typescript2";

export default {
  input: "src/ts/optionbox.ts",
  plugins: [
    typescript()
  ],
  output: {
    format: "iife",
    sourcemap: true,
    file: "dist/optionbox.js"
  }
};
