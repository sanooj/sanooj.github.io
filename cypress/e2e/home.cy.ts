/// <reference types="cypress" />

// Page Object Model for Homepage
class HomePage {
  // Selectors
  private readonly logo = '[data-cy="logo"]';

  private readonly mainContent = '[data-cy="main-content"]';

  // Actions
  visit(): Cypress.Chainable {
    return cy.visit("http://localhost:5173/");
  }

  getLogo() {
    return cy.get(this.logo);
  }

  getMainContent(): Cypress.Chainable {
    return cy.get(this.mainContent);
  }
}

describe("Homepage", () => {
  const homePage = new HomePage();

  beforeEach(() => {
    // Visit the homepage before each test
    homePage.visit();
  });

  describe("Page Load", () => {
    it("should load the homepage successfully", () => {
      // Verify that the main content is visible
      homePage.getMainContent().should("be.visible").and("exist");

      // Verify that the logo is present
      homePage.getLogo().should("be.visible").and("exist");
    });

    it("should have the correct title", () => {
      // Verify page title
      cy.title().should("not.be.empty");
    });
  });

  describe("Interactions", () => {
    it("should handle responsive behavior", () => {
      // Test mobile viewport
      cy.viewport(768, 1024);

      // Verify main content adjusts to mobile view
      homePage.getMainContent().should("be.visible").and("have.css", "width", "768px");
    });
  });

  describe("StoryList Component", () => {
    it("should render the StoryList component", () => {
      // Verify that the StoryList component is visible
      cy.get('[data-cy="story-list"]').should("be.visible");
    });

    it("should navigate to the story page when a story item is clicked", () => {
      // Visit the homepage
      homePage.visit();

      // Click the first story item
      cy.get('[data-cy="story-list"] li').first().click();

      // Verify that the URL contains the expected path
      cy.url().should("match", /\/stories\/.+\/.+/);
    });
  });

  describe("StoryList Navigation", () => {
    it("should change the current index when clicking next and previous", () => {
      // Visit the homepage
      homePage.visit();

      cy.get('[data-cy="story-list"] li').first().click();

      // Click the next button
      cy.get('[data-cy="next-button"]').click();

      // Verify that the current index has changed
      cy.get('[data-cy="story"]').should("have.attr", "data-index").and("not.equal", "0");

      // Click the previous button
      cy.get('[data-cy="prev-button"]').click();

      // Verify that the current index changes back
      cy.get('[data-cy="story"]').should("have.attr", "data-index").and("equal", "0");

      // If the current index is the last one, clicking next should switch to the next user
      cy.get('[data-cy="next-button"]').click();

      cy.url().should("match", /\/stories\/.+\/.+/);
    });
  });

  describe("Story Navigation", () => {
    it("should navigate back to the homepage when the close button is clicked", () => {
      // Visit the homepage
      homePage.visit();

      // Click the first story item to navigate to the story page
      cy.get('[data-cy="story-list"] li').first().click();

      // Click the close button
      cy.get('[data-cy="close-button"]').click();

      cy.url().should("not.match", /\/stories\/.+\/.+/);
    });
  });
});
