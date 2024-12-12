import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "https://www.saucedemo.com/v1",
    defaultCommandTimeout: 10000,
    chromeWebSecurity: false,
    viewportHeight: 900,
    viewportWidth: 1400,
    reporter: 'cypress-mochawesome-reporter',
    screenshotOnRunFailure: true,
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on)
    },
  },
});
