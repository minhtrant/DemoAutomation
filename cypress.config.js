const { defineConfig } = require("cypress");
const { allureCypress } = require("allure-cypress/reporter");

module.exports = defineConfig({
  reporterOptions: {
    charts: true,
    reportPageTitle: "custom-title",
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      allureCypress(on, {
        resultsDir: "./allure-results",
      });
      return config;
    },
    video: false,
    watchForFileChanges: false,
    pageLoadTimeout: 60000,
    baseUrl: 'https://88edf335-0352-40c1-a29f-0c3170c0787f.mock.pstmn.io/'
  }
});
