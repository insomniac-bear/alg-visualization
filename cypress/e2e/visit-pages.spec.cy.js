const URL = "http://localhost:3000"
describe("Six pages with algoritms are visit", () => {
  it("visit recursion page", () => {
    cy.visit(`${URL}/recursion`);
  });

  it("visit fibonacci page", () => {
    cy.visit(`${URL}/fibonacci`);
  });

  it("visit sorting page", () => {
    cy.visit(`${URL}/sorting`);
  });

  it("visit stack page", () => {
    cy.visit(`${URL}/sorting`);
  });

  it("visit queue page", () => {
    cy.visit(`${URL}/queue`);
  });

  it("visit list page", () => {
    cy.visit(`${URL}/list`);
  });
});