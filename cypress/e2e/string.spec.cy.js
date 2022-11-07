const TESTING_STRING = "qwerty";
describe("Testing string-page", () => {
   beforeEach(() => {
    cy.visit('http://localhost:3000/recursion');
  });

  it("Button should be disable when input is empty", () => {
    cy.get("input").clear();
    cy.get("button").should("be.disabled");
  });

  it('page should render circles', () => {
    cy.get('input').type(TESTING_STRING);
    cy.get('button').eq(1).click();

    cy.get('[class*=circle_content]')
      .should('have.length', 6)
      .each((el, index) => {
        cy.wrap(el).contains(TESTING_STRING[index]);

        if (index === 0 || index === 5) {
          cy.wrap(el).find('[class*=circle_changing]');
        }

        if (index === 1 || index === 2 || index === 3 || index === 4) {
          cy.wrap(el).find('[class*=circle_default]');
        }
      });

    cy.get('[class*=circle_content]')
      .should('have.length', 6)
      .each((el, index) => {
        cy.wrap(el).contains(TESTING_STRING[TESTING_STRING.length - index - 1]);

        cy.wrap(el).find('[class*=modified]');
      });
    });
  });