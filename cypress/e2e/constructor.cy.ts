describe('Тестирование конструктора бургеров, модальных окон и создания заказа', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' }).as(
      'getUser'
    );

    cy.intercept('POST', 'api/orders', {
      fixture: 'order.json'
    }).as('createOrder');

    window.localStorage.setItem('refreshToken', 'testRefreshToken');
    cy.setCookie('accessToken', 'testAccessToken');

    cy.visit('localhost:4000');
    cy.wait('@getIngredients');
  });

  afterEach(() => {
    window.localStorage.removeItem('refreshToken');
    cy.clearCookie('accessToken');
  });

  describe('Тестирование конструктора бургеров', () => {
    it('Тест на добавление булки в конструктор', () => {
      cy.get('[data-cy="ingredient-643d69a5c3f7b9001cfa093c"] button').click();

      cy.get('[data-cy="constructor-bun-top"]')
        .should('be.visible')
        .and('contain', 'Краторная булка N-200i');

      cy.get('[data-cy="constructor-bun-bottom"]')
        .should('be.visible')
        .and('contain', 'Краторная булка N-200i');
    });

    it('Тест на добавление начинки в конструктор', () => {
      cy.get('[data-cy="ingredient-643d69a5c3f7b9001cfa0941"] button').click();

      cy.get('[data-cy="constructor-main"]')
        .should('be.visible')
        .and('contain', 'Биокотлета из марсианской Магнолии');
    });

    it('Тест на добавление соуса в конструктор', () => {
      cy.get('[data-cy="ingredient-643d69a5c3f7b9001cfa0942"] button').click();

      cy.get('[data-cy="constructor-main"]')
        .should('be.visible')
        .and('contain', 'Соус Spicy-X');
    });

    it('Тест на добавление всех ингредиентов бургера', () => {
      cy.get('[data-cy="ingredient-643d69a5c3f7b9001cfa093c"] button').click();
      cy.get('[data-cy="ingredient-643d69a5c3f7b9001cfa0941"] button').click();
      cy.get('[data-cy="ingredient-643d69a5c3f7b9001cfa0942"] button').click();

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

      cy.get('[data-cy="modal"]')
        .should('be.visible')
        .and('contain', 'Краторная булка N-200i');

      cy.get('[data-cy="close-modal-button"]').click();
      cy.get('[data-cy="modal"]').should('not.exist');

      cy.get('[data-cy="ingredient-643d69a5c3f7b9001cfa093c"]').click();
      cy.get('[data-cy="close-modal-overlay"]').click({ force: true });
      cy.get('[data-cy="modal"]').should('not.exist');
    });

    it('Открытие и закрытие (по крестику и оверлею) модального окна ингредиента', () => {
      cy.get('[data-cy="ingredient-643d69a5c3f7b9001cfa0941"]').click();

      cy.get('[data-cy="modal"]')
        .should('be.visible')
        .and('contain', 'Биокотлета из марсианской Магнолии');

      cy.get('[data-cy="close-modal-button"]').click();
      cy.get('[data-cy="modal"]').should('not.exist');

      cy.get('[data-cy="ingredient-643d69a5c3f7b9001cfa0941"]').click();
      cy.get('[data-cy="close-modal-overlay"]').click({ force: true });
      cy.get('[data-cy="modal"]').should('not.exist');
    });

    it('Открытие и закрытие (по крестику и оверлею) модального окна соуса', () => {
      cy.get('[data-cy="ingredient-643d69a5c3f7b9001cfa0942"]').click();

      cy.get('[data-cy="modal"]')
        .should('be.visible')
        .and('contain', 'Соус Spicy-X');

      cy.get('[data-cy="close-modal-button"]').click();
      cy.get('[data-cy="modal"]').should('not.exist');

      cy.get('[data-cy="ingredient-643d69a5c3f7b9001cfa0942"]').click();
      cy.get('[data-cy="close-modal-overlay"]').click({ force: true });
      cy.get('[data-cy="modal"]').should('not.exist');
    });
  });

  describe('Тестирование создания заказа', () => {
    it('Создание заказа с проверкой модального окна и очистки конструктора', () => {
      cy.get('[data-cy="ingredient-643d69a5c3f7b9001cfa093c"] button').click();
      cy.get('[data-cy="ingredient-643d69a5c3f7b9001cfa0941"] button').click();
      cy.get('[data-cy="ingredient-643d69a5c3f7b9001cfa0942"] button').click();

      cy.get('[data-cy="constructor-bun-top"]')
        .should('be.visible')
        .and('contain', 'Краторная булка N-200i');

      cy.get('[data-cy="constructor-main"]')
        .should('be.visible')
        .and('contain', 'Биокотлета из марсианской Магнолии');

      cy.get('[data-cy="constructor-main"]')
        .should('be.visible')
        .and('contain', 'Соус Spicy-X');

      cy.get('[data-cy="constructor-bun-bottom"]')
        .should('be.visible')
        .and('contain', 'Краторная булка N-200i');

      cy.get('[data-cy="constructor-order-button"]').click();
      cy.wait('@createOrder');

      cy.get('[data-cy="modal"]').should('be.visible').and('contain', '12345');

      cy.get('[data-cy="close-modal-button"]').click();
      cy.get('[data-cy="modal"]').should('not.exist');

      cy.get('[data-cy="constructor-bun-top"]').should('not.exist');
      cy.get('[data-cy="constructor-main"]').should(
        'contain',
        'Выберите начинку'
      );
      cy.get('[data-cy="constructor-bun-bottom"]').should('not.exist');
    });
  });
});
