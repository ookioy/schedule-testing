/** @type {import('@stryker-mutator/api/core').PartialStrykerOptions} */
// @ts-nocheck

const config = {
  testRunner: "jest",
  jest: {
    configFile: "jest.config.js",
    config: {
      testMatch: ["**/src/helper/**/*.test.js"],
      coverageThreshold: undefined,
    }
  },
  mutate: [
    "src/helper/getHref.js",
    "src/helper/search.js"
  ],
  mutator: {
    plugins: [],
    excludedMutations: []
  },
  reporters: ["html", "clear-text", "progress"],
  htmlReporter: {
    fileName: "reports/mutation/mutation.html"
  },
  coverageAnalysis: "perTest"
};
export default config;
