const { defineConfig } = require("cypress");
const allureWriter = require('@shelex/cypress-allure-plugin/writer');
const projectId = process.env.CYPRESS_PROJECT_ID 
module.exports = defineConfig({
  projectId: projectId, // give correct projectId when running the project
  viewportWidth: 1280,
  viewportHeight: 720,
  defaultCommandTimeout: 10000, 
  pageLoadTimeout: 10000, 
  requestTimeout: 10000, 
  screenshotsFolder: 'cypress/screenshots',
  videosFolder: 'cypress/videos',
  e2e:{
    setupNodeEvents(on, config) {
      // implement node event listeners here
      allureWriter(on, config);
      return config;
    },
    baseUrl: 'https://petstore.swagger.io/v2/pet/',
    userBaseUrl : 'https://petstore.swagger.io/v2/',
    specPattern : [
      'cypress/e2e/*/positive_cases/*.spec.js',
      'cypress/e2e/*/negative_cases/*.spec.js'
    ],
    allureReuseAfterSpec: true,
    reporterOptions: {
      "resultsDir": "allure-results"
    }
  },
  
  validCommonHeaders: {
    'accept': 'application/json',
    'Content-Type': 'application/json'
  },
  invalidCommonHeaders: {
    'accept': 'application',
    'Content-Type': 'application'
  },
});

