describe('Тестирование конструктора бургеров, модальных окон и создания заказа', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' }).as(
      'getUser'
    );

    window.localStorage.setItem('refreshToken', 'testRefreshToken');
    cy.setCookie('accessToken', 'testAccessToken');

    cy.visit('localhost:4000');
    cy.wait('@getIngredients');
  });

  describe('Тестирование конструктора бургеров', () => {
    it('Тест на добавление булки в конструктор', () => {
      cy.get(':nth-child(2) > .szzp3k0uBXITrGixPLCJ > .common_button').click();

      cy.get('[data-cy="constructor-bun-top"]')
        .should('be.visible')
        .and('contain', 'Краторная булка N-200i');

      cy.get('[data-cy="constructor-bun-bottom"]')
        .should('be.visible')
        .and('contain', 'Краторная булка N-200i');
    });

    it('Тест на добавление начинки в конструктор', () => {
      cy.get(':nth-child(4) > .szzp3k0uBXITrGixPLCJ > .common_button').click();

      cy.get('[data-cy="constructor-main"]')
        .should('be.visible')
        .and('contain', 'Биокотлета из марсианской Магнолии');
    });

    it('Тест на добавление соуса в конструктор', () => {
      cy.get(':nth-child(6) > .szzp3k0uBXITrGixPLCJ > .common_button').click();

      cy.get('[data-cy="constructor-main"]')
        .should('be.visible')
        .and('contain', 'Соус Spicy-X');
    });

    it('Тест на добавление всех ингредиентов бургера', () => {
      cy.get(':nth-child(2) > .szzp3k0uBXITrGixPLCJ > .common_button').click();
      cy.get(':nth-child(4) > .szzp3k0uBXITrGixPLCJ > .common_button').click();
      cy.get(':nth-child(6) > .szzp3k0uBXITrGixPLCJ > .common_button').click();

      cy.get('[data-cy="constructor-bun-top"]')
        .should('be.visible')
        .and('contain', 'Краторная булка N-200i');

      cy.get('[data-cy="constructor-bun-bottom"]')
        .should('be.visible')
        .and('contain', 'Краторная булка N-200i');

      cy.get('[data-cy="constructor-main"]')
        .should('be.visible')
        .and('contain', 'Биокотлета из марсианской Магнолии');

      cy.get('[data-cy="constructor-main"]')
        .should('be.visible')
        .and('contain', 'Соус Spicy-X');
    });
  });

  describe('Тестирование модальных окон', () => {
    it('Открытие и закрытие (по крестику и оверлею) модального окна булки', () => {
      cy.get('[data-cy="ingredient-643d69a5c3f7b9001cfa093c"]').click();

      cy.get('[data-cy="ingredient-modal"]')
        .should('be.visible')
        .and('contain', 'Краторная булка N-200i');

      cy.get('[data-cy="close-modal-button"]').click();
      cy.get('[data-cy="ingredient-modal"]').should('not.exist');

      cy.get('[data-cy="ingredient-643d69a5c3f7b9001cfa093c"]').click();
      cy.get('[data-cy="close-modal-overlay"]').click({ force: true });
      cy.get('[data-cy="ingredient-modal"]').should('not.exist');
    });

    it('Открытие и закрытие (по крестику и оверлею) модального окна ингредиента', () => {
      cy.get('[data-cy="ingredient-643d69a5c3f7b9001cfa0941"]').click();

      cy.get('[data-cy="ingredient-modal"]')
        .should('be.visible')
        .and('contain', 'Биокотлета из марсианской Магнолии');

      cy.get('[data-cy="close-modal-button"]').click();
      cy.get('[data-cy="ingredient-modal"]').should('not.exist');

      cy.get('[data-cy="ingredient-643d69a5c3f7b9001cfa0941"]').click();
      cy.get('[data-cy="close-modal-overlay"]').click({ force: true });
      cy.get('[data-cy="ingredient-modal"]').should('not.exist');
    });

    it('Открытие и закрытие (по крестику и оверлею) модального окна соуса', () => {
      cy.get('[data-cy="ingredient-643d69a5c3f7b9001cfa0942"]').click();

      cy.get('[data-cy="ingredient-modal"]')
        .should('be.visible')
        .and('contain', 'Соус Spicy-X');

      cy.get('[data-cy="close-modal-button"]').click();
      cy.get('[data-cy="ingredient-modal"]').should('not.exist');

      cy.get('[data-cy="ingredient-643d69a5c3f7b9001cfa0942"]').click();
      cy.get('[data-cy="close-modal-overlay"]').click({ force: true });
      cy.get('[data-cy="ingredient-modal"]').should('not.exist');
    });
  });
});
