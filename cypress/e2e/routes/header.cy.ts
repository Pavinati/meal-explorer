/// <reference types="cypress" />

describe("App header with logo and searchbar", () => {
  beforeEach(() => {
    cy.intercept("GET", "https://www.themealdb.com/api/json/v1/*/search.php*", {
      fixture: "soups.json",
    }).as("listMeals");
    cy.intercept("GET", "https://www.themealdb.com/api/json/v1/*/lookup.php*", {
      fixture: "soup.json",
    }).as("fetchMeal");
  });

  it("is visible in the index route", () => {
    cy.visit("http://localhost:5173/");

    cy.get("header img").should("have.attr", "src").should("include", "logo");
    cy.get("input[type=search]").should("be.visible");
    cy.get("button").contains("Search");
  });

  it("is visible when searching for meals", () => {
    cy.visit("http://localhost:5173/?s=soup");

    cy.get("header img").should("have.attr", "src").should("include", "logo");
    cy.get("input[type=search]").should("be.visible");
    cy.get("button").contains("Search");
  });

  it("Is visible when scrolling at the bottom of long meal lists", () => {
    cy.visit("http://localhost:5173/?s=soup");

    cy.get("input[type=search]").should("be.visible");
    cy.get("button").contains("Search").should("be.visible");

    cy.wait("@listMeals");
    cy.scrollTo("bottom");

    cy.get("input[type=search]").should("be.visible");
    cy.get("button").contains("Search").should("be.visible");
  });

  it("is visible when looking at recepies", () => {
    cy.visit("http://localhost:5173/instructions?id=52973");

    cy.get("header img").should("have.attr", "src").should("include", "logo");
    cy.get("input[type=search]").should("be.visible");
    cy.get("button").contains("Search");
  });

  it.only("is visible when scrolling at the bottom of long meal instructions", () => {
    cy.visit("http://localhost:5173/instructions?id=52973");

    cy.get("input[type=search]").should("be.visible");
    cy.get("button").contains("Search").should("be.visible");

    cy.wait("@fetchMeal");
    cy.scrollTo("bottom");

    cy.get("input[type=search]").should("be.visible");
    cy.get("button").contains("Search").should("be.visible");
  });

  it("searches for a meal when clicking the search button", () => {
    cy.visit("http://localhost:5173/");

    cy.get("input[type=search]").type("soup");
    cy.get("button").contains("Search").click();

    cy.wait("@listMeals");

    cy.location().should((location) => {
      expect(location.pathname).to.eq("/");
      expect(location.search).to.eq("?s=soup");
    });
  });
});
