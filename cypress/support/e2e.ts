/// <reference types="cypress" />
// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import "./commands";

beforeEach(() => {
  // Intercept YouTube iframe calls
  cy.intercept(
    { hostname: "googleads.g.doubleclick.net" },
    { forceNetworkError: true },
  );
  cy.intercept(
    { hostname: "jnn-pa.googleapis.com" },
    { forceNetworkError: true },
  );
  cy.intercept({ hostname: "www.youtube.com" }, { forceNetworkError: true });

  // fail tests if unmocked API requests
  cy.intercept("https://www.themealdb.com/api/**", (req) => {
    throw new Error("Request not mocked: " + req.url);
  }).as("Needs intercept");
});

Cypress.on("uncaught:exception", (err) => {
  // Cypress and React Hydrating the document don't get along very well
  // https://github.com/cypress-io/cypress/issues/27204
  if (
    /hydrat/i.test(err.message) ||
    /Minified React error #418/.test(err.message) ||
    /Minified React error #423/.test(err.message)
  ) {
    return false;
  }
});
