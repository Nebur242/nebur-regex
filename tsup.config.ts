import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  minify: true,
  clean: true,
  sourcemap: false,
  target: "node18",
  treeshake: true,
  outDir: "dist",
});
