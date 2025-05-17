/// <reference types="cypress" />

describe("Meals route", () => {
  it("displays meals matching the seached name", () => {
    cy.intercept("https://www.themealdb.com/api/**/search.php?s=soup", {
      fixture: "soups.json",
    }).as("listMeals");
    cy.visit("http://localhost:5173/?s=soup");

    cy.wait("@listMeals");

    cy.get("main div.grid a").as("meals").should("have.length", 16);

    [
      "Leblebi Soup",
      "Red Peas Soup",
      "Egg Drop Soup",
      "Split Pea Soup",
      "Fish Soup (Ukha)",
      "French Onion Soup",
      "Hot and Sour Soup",
      "Creamy Tomato Soup",
      "Tunisian Lamb Soup",
      "Moroccan Carrot Soup",
      "Cabbage Soup (Shchi)",
      "Broccoli & Stilton soup",
      "Beetroot Soup (Borscht)",
      "Rosol (Polish Chicken Soup)",
      "Snert (Dutch Split Pea Soup)",
      "Mushroom soup with buckwheat",
    ].forEach((soup) => cy.get("@meals").contains(soup));
  });

  it("displays a spinner while loading recipe instructions", () => {
    cy.intercept(
      "https://www.themealdb.com/api/**/search.php?s=soup",
      (req) => {
        // simulate slow internet connection
        req.continue((res) => {
          res.delay = 10000;
          res.send();
        });
      },
    );
    cy.visit("http://localhost:5173/?s=soup");

    cy.get("[role=status]").contains("Loading");
  });

  it("displays an error message on network errors", () => {
    cy.intercept("https://www.themealdb.com/api/**/search.php?s=soup", {
      forceNetworkError: true,
    }).as("listMeals");
    cy.visit("http://localhost:5173/?s=soup");

    cy.get("input[type=search]").type("soup");
    cy.get("button").contains("Search").click();

    cy.wait("@listMeals");

    cy.contains("Could not fetch meals");
  });
});
