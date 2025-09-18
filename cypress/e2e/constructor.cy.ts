import { ingredients } from '../fixtures/ingredients.json';

describe('Тест контсруктора бургеров', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );

    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' }).as(
      'getUser'
    );

    window.localStorage.setItem('refreshToken', 'testRefreshToken');
    cy.setCookie('accessToken', 'testAccessToken');

    cy.visit('localhost:4000');
    cy.wait('@getIngredients');
  });

  it('Тест на добавление ингредиентов в конструктор', () => {
    //
  });
});
