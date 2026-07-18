import type { Config } from "jest";

const config: Config = {
  verbose: true,
  watchman: false,
  collectCoverageFrom: ["src/**/*.ts", "!src/tests/**"],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
};

export default config;
