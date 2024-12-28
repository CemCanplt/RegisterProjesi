describe("template spec", () => {
  it("passes", () => {
    cy.visit("http://localhost:5173/");

    cy.get('[data-cy="ad-input"]').type("ik");
    cy.contains("en az").should("be.visible");
  });
});
