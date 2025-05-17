/// <reference types="cypress" />

describe("Instructions route", () => {
  it("displays meal name, ingredients and instructions", () => {
    cy.intercept("https://www.themealdb.com/api/**/lookup.php?i=52973", {
      fixture: "soup.json",
    }).as("fetchMeal");
    cy.visit("http://localhost:5173/instructions?id=52973");

    cy.wait("@fetchMeal");

    cy.contains("Leblebi Soup");
    cy.contains("Ingredients");
    cy.contains("Instructions");
    cy.contains("Video tutorial");
  });

  it("displays all meal ingredients", () => {
    cy.intercept("https://www.themealdb.com/api/**/lookup.php?i=52973", {
      fixture: "soup.json",
    }).as("fetchMeal");
    cy.visit("http://localhost:5173/instructions?id=52973");

    cy.wait("@fetchMeal");

    cy.contains("Ingredients")
      .parent()
      .get("ul li")
      .as("ingredients")
      .should("have.length", 10);
    cy.get("@ingredients")
      .first()
      .contains("Olive Oil")
      .contains("2 tbs")
      .next()
      .contains("Onion")
      .contains("1 medium finely diced")
      .next()
      .contains("Chickpeas")
      .contains("250g")
      .next()
      .contains("Vegetable Stock")
      .contains("1.5L")
      .next()
      .contains("Cumin")
      .contains("1 tsp")
      .next()
      .contains("Garlic")
      .contains("5 cloves")
      .next()
      .contains("Salt")
      .contains("1/2 tsp")
      .next()
      .contains("Harissa Spice")
      .contains("1 tsp")
      .next()
      .contains("Pepper")
      .contains("Pinch")
      .next()
      .contains("Lime")
      .contains("1/2");
  });

  it("displays all meal instructions", () => {
    cy.intercept("https://www.themealdb.com/api/**/lookup.php?i=52973", {
      fixture: "soup.json",
    }).as("fetchMeal");
    cy.visit("http://localhost:5173/instructions?id=52973");

    cy.wait("@fetchMeal");

    cy.contains("Instructions")
      .parent()
      .get("ol li")
      .as("instructions")
      .should("have.length", 5);
    cy.get("@instructions")
      .first()
      .contains("Heat the oil in a large pot")
      .next()
      .contains("Drain the soaked chickpeas")
      .next()
      .contains("toast the cumin in a small ungreased frying pan")
      .next()
      .contains("Add the paste and the harissa to the soup")
      .next()
      .contains("Season to taste with salt, pepper and lemon juice");
  });

  it("displays a spinner while loading recipe instructions", () => {
    cy.intercept(
      "https://www.themealdb.com/api/**/lookup.php?i=52973",
      (req) => {
        // simulate slow internet connection
        req.continue((res) => {
          res.delay = 10000;
          res.send();
        });
      },
    ).as("fetchMeal");
    cy.visit("http://localhost:5173/instructions?id=52973");

    cy.get("[role=status]").contains("Loading");
  });

  it("displays an error message on network errors", () => {
    cy.intercept("https://www.themealdb.com/api/**/lookup.php?i=52973", {
      forceNetworkError: true,
    }).as("fetchMeal");
    cy.visit("http://localhost:5173/instructions?id=52973");

    cy.wait("@fetchMeal");

    cy.contains("server is currently not reachable");
    cy.contains("recipe may have been removed from the database");
  });
});
