import babel from "rollup-plugin-babel";

export default {
  input: "src/main.js",
  plugins: [
    babel({
      exclude: "node_modules/**"
    })
  ],
  output: {
    format: "iife",
    sourcemap: true,
    file: "dist/main.min.js"
  }
};
