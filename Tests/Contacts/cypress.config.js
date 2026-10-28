import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000/src",
    setupNodeEvents(on, config) { },
    supportFile: "cypress/support/e2e.js"
  },
  defaultCommandTimeout: 4000,
  video: false,
  screenshotOnRunFailure: false,
  viewportHeight: 1000,
  viewportWidth: 1600,
  allowCypressEnv: false
});
