import { SHORT_DELAY_IN_MS, DELAY_IN_MS } from '../../src/constants/delays';

describe('test list page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/list');
  });

  it('buttons should be disabled when input is empty', () => {
    cy.get('input').clear();
    cy.get('button').eq(1).should('be.disabled');
    cy.get('button').eq(2).should('be.disabled');
    cy.get('button').eq(5).should('be.disabled');
    cy.get('button').eq(6).should('be.disabled');
  });

  it('correct render default data', () => {
    cy.get('[class*=circle_content]')
      .should('have.length', 4)
      .each((el, index) => {
        cy.wrap(el).find('[class*=circle_default]');
        if (index === 0) cy.wrap(el).contains('head');
        if (index === 3) cy.wrap(el).contains('tail');
      });
  });

  it('correct adding data to head', () => {
    cy.get('input').eq(0).type('a');
    cy.get('button').eq(1).click();

    cy.wait(DELAY_IN_MS);

    cy.get('[class*=circle_content]')
      .should('have.length', 5)
      .each((el, index) => {
        if (index === 0) cy.wrap(el).contains('a');
        if (index === 0) cy.wrap(el).contains('head');
      });
    
    cy.get('input').eq(0).type('b');
    cy.get('button').eq(1).click();

    cy.wait(DELAY_IN_MS);

    cy.get('[class*=circle_content]')
      .should('have.length', 6)
      .each((el, index) => {
        if (index === 0) cy.wrap(el).contains('b');
        if (index === 0) cy.wrap(el).contains('head');
      });
  });

  it('correct adding element to tail', () => {
    cy.get('input').eq(0).type('c');
    cy.get('button').eq(2).click();

    cy.wait(DELAY_IN_MS);

    cy.get('[class*=circle_content]')
      .should('have.length', 5)
      .each((el, index) => {
        if (index === 4) cy.wrap(el).contains('c');
        if (index === 4) cy.wrap(el).contains('tail');
      });
    
    cy.get('input').eq(0).type('d');
    cy.get('button').eq(2).click();

    cy.wait(DELAY_IN_MS);

    cy.get('[class*=circle_content]')
      .should('have.length', 6)
      .each((el, index) => {
        if (index === 5) cy.wrap(el).contains('d');
        if (index === 5) cy.wrap(el).contains('tail');
      });
  });

  it('correct adding element by index', () => {
    cy.get('input').eq(0).type('e');
    cy.get('input').eq(1).type('2');
    cy.get('button').eq(5).click();

    cy.wait(SHORT_DELAY_IN_MS * 4);

    cy.get('[class*=circle_content]').should('have.length', 5);

    cy.get('[class*=circle_content]')
      .each((el, index) => {
        if (index === 2) cy.wrap(el).contains('e');
      });
    cy.wait(DELAY_IN_MS);
  });

  it('correct remove element from head', () => {
    cy.get('button').eq(3).click();

    cy.get('[class*=circle_content]').should('have.length', 3);

    cy.get('[class*=circle_content]')
      .each((el, index) => {
        if (index === 0) cy.wrap(el).contains('head');
        if (index === 2) cy.wrap(el).contains('tail');
      });

    cy.get('button').eq(3).click();

    cy.get('[class*=circle_content]').should('have.length', 2);

    cy.get('[class*=circle_content]')
      .each((el, index) => {
        if (index === 0) cy.wrap(el).contains('head');
        if (index === 1) cy.wrap(el).contains('tail');
      });
  });

  it('correct remove element from tail', () => {
    cy.get('button').eq(4).click();

    cy.get('[class*=circle_content]').should('have.length', 3);

    cy.get('[class*=circle_content]')
      .each((el, index) => {
        if (index === 0) cy.wrap(el).contains('head');
        if (index === 2) cy.wrap(el).contains('tail');
      });

    cy.get('button').eq(4).click();

    cy.get('[class*=circle_content]').should('have.length', 2);

    cy.get('[class*=circle_content]')
      .each((el, index) => {
        if (index === 0) cy.wrap(el).contains('head');
        if (index === 1) cy.wrap(el).contains('tail');
      });
  });

  it('correct remove element by index', () => {
    cy.get('input').eq(1).type('2');
    cy.get('button').eq(6).click();

    cy.get('[class*=circle_content]').should('have.length', 3);

    cy.wait(SHORT_DELAY_IN_MS * 3);

    cy.get('[class*=circle_content]')
      .each((el, index) => {
        if (index === 0) cy.wrap(el).contains('head');
        if (index === 2) cy.wrap(el).contains('tail');
      });

    cy.get('input').eq(1).type('1');
    cy.get('button').eq(6).click();

    cy.get('[class*=circle_content]').should('have.length', 2);

    cy.wait(SHORT_DELAY_IN_MS * 2);

    cy.get('[class*=circle_content]')
      .each((el, index) => {
        if (index === 0) cy.wrap(el).contains('head');
        if (index === 1) cy.wrap(el).contains('tail');
      });
  });
});