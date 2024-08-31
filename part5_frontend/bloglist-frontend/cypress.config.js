import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    // cypress.config.js
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
});
