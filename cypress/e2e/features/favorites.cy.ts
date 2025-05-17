/// <reference types="cypress" />

describe("Favorite button in istructions", () => {
  beforeEach(() => {
    cy.clearAllLocalStorage();
    cy.intercept("https://www.themealdb.com/api/**/lookup.php?i=*", {
      fixture: "soup.json",
    });
  });

  it("is displayed", () => {
    cy.visit("http://localhost:5173/instructions?id=52973");
    cy.get("button.favorite");
  });

  it('is "pressed" if meal was added to favorites', () => {
    localStorage.setItem("52973", "{}");
    cy.visit("http://localhost:5173/instructions?id=52973");
    cy.get("button.favorite[aria-pressed=true");
  });

  it('is not "pressed" when meal is not in favorites', () => {
    localStorage.removeItem("52973");
    cy.visit("http://localhost:5173/instructions?id=52973");
    cy.get("button.favorite[aria-pressed=false");
  });
});

describe("Favorite button in meal list", () => {
  beforeEach(() => {
    cy.clearAllLocalStorage();
    cy.intercept("https://www.themealdb.com/api/**/search.php?s=*", {
      fixture: "soups.json",
    });
  });

  it("is displayed on each meal preview", () => {
    cy.visit("http://localhost:5173/?s=soup");

    cy.get("main div.grid a").each(($mealPreview) => {
      cy.wrap($mealPreview).find("button.favorite");
    });
  });

  it('is "pressed" when the meal in the favorite list', () => {
    ["52973", "52955", "52841"].forEach((id) => localStorage.setItem(id, "{}"));
    cy.visit("http://localhost:5173/?s=soup");

    cy.get("main div.grid button.favorite[aria-pressed=true").should(
      "have.length",
      3,
    );
    cy.get("main div.grid button.favorite[aria-pressed=false").should(
      "have.length",
      13,
    );
  });
});

describe("Favorite list", () => {
  beforeEach(() => {
    cy.clearAllLocalStorage();
  });

  it("is displayed in the index route", () => {
    cy.visit("http://localhost:5173/");
    cy.contains("Favorites");
  });

  it("displays all the saved favorites", () => {
    cy.fixture("favorite_meal.json").then((mock_meal) => {
      ["52973", "52955", "52841"].forEach((id) => {
        mock_meal.id = id;
        localStorage.setItem(id, JSON.stringify(mock_meal));
      });
    });
    cy.visit("http://localhost:5173/");

    cy.get("main div.grid button.favorite[aria-pressed=true").should(
      "have.length",
      3,
    );
  });

  it("displays a no favorites text is no element was added", () => {
    cy.visit("http://localhost:5173/");
    cy.contains("No favorite meals saved yet");
  });
});
