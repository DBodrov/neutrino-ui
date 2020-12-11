/// <reference types="cypress" />
/// <reference types="@testing-library/cypress" />

it('test InputMask', () => {
  cy.visit('/inputmask');
  cy.get('[name="passport"]').type('1234567890');
  cy.get('[name="passport"]').should('have.value', '1234 567890');
  cy.get('[name="date"]').type('12061980');
  cy.get('[name="date"]').should('have.value', '12.06.1980');
  cy.get('[name="phone"]').type('91012345');
  cy.get('[name="phone"]').should('have.value', '+7(910) 12-345');
  cy.get('[name="phone"]').clear();
  cy.get('[name="phone"]').should('have.value', '');
});
