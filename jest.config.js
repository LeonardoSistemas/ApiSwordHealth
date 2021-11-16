/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/en/configuration.html
 */

module.exports = {
  // automock: false,
  // bail: true,
  // clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: [
    "<rootDir>/src/business/services/*.js",
    "<rootDir>/src/business/services/*/*.js",
    
    "<rootDir>/src/rest/controllers/*/*.js"],
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  testEnvironment: "node",
  testMatch: [
    "**/__tests__/**/*.spec.js?(x)"
  ],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1"
  }

};
