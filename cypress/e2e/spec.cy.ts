describe("template spec", () => {
  it("passes", () => {
    cy.visit("http://localhost:5173/");
    cy.url().should("not.match", /\/stories\/.+\/.+/);
  });
});
