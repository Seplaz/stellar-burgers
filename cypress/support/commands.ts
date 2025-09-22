/// <reference types="cypress" />
import { SELECTORS } from './selectors';

Cypress.Commands.add('addBunToConstructor', () => {
  cy.get(`${SELECTORS.INGREDIENT_BUN} button`).click();
});

Cypress.Commands.add('addMainToConstructor', () => {
  cy.get(`${SELECTORS.INGREDIENT_MAIN} button`).click();
});

Cypress.Commands.add('addSauceToConstructor', () => {
  cy.get(`${SELECTORS.INGREDIENT_SAUCE} button`).click();
});

Cypress.Commands.add(
  'openIngredientModal',
  (ingredientType: 'bun' | 'main' | 'sauce') => {
    const selectors = {
      bun: SELECTORS.INGREDIENT_BUN,
      main: SELECTORS.INGREDIENT_MAIN,
      sauce: SELECTORS.INGREDIENT_SAUCE
    };
    cy.get(selectors[ingredientType]).click();
  }
);

Cypress.Commands.add('closeModalByButton', () => {
  cy.get(SELECTORS.CLOSE_MODAL_BUTTON).click();
  cy.get(SELECTORS.MODAL).should('not.exist');
});

Cypress.Commands.add('closeModalByOverlay', () => {
  cy.get(SELECTORS.CLOSE_MODAL_OVERLAY).click({ force: true });
  cy.get(SELECTORS.MODAL).should('not.exist');
});

Cypress.Commands.add('verifyConstructorBuns', (bunName: string) => {
  cy.get(SELECTORS.CONSTRUCTOR_BUN_TOP)
    .should('be.visible')
    .and('contain', bunName);
  cy.get(SELECTORS.CONSTRUCTOR_BUN_BOTTOM)
    .should('be.visible')
    .and('contain', bunName);
});

Cypress.Commands.add(
  'verifyConstructorIngredient',
  (ingredientName: string) => {
    cy.get(SELECTORS.CONSTRUCTOR_MAIN)
      .should('be.visible')
      .and('contain', ingredientName);
  }
);

Cypress.Commands.add('verifyEmptyConstructor', () => {
  cy.get(SELECTORS.CONSTRUCTOR_BUN_TOP).should('not.exist');
  cy.get(SELECTORS.CONSTRUCTOR_BUN_BOTTOM).should('not.exist');
  cy.get(SELECTORS.CONSTRUCTOR_MAIN).should('contain', 'Выберите начинку');
});

declare global {
  namespace Cypress {
    interface Chainable {
      addBunToConstructor(): Chainable<void>;
      addMainToConstructor(): Chainable<void>;
      addSauceToConstructor(): Chainable<void>;
      openIngredientModal(
        ingredientType: 'bun' | 'main' | 'sauce'
      ): Chainable<void>;
      closeModalByButton(): Chainable<void>;
      closeModalByOverlay(): Chainable<void>;
      verifyConstructorBuns(bunName: string): Chainable<void>;
      verifyConstructorIngredient(ingredientName: string): Chainable<void>;
      verifyEmptyConstructor(): Chainable<void>;
    }
  }
}
