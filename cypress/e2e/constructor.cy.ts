import { SELECTORS, INGREDIENT_NAMES } from '../support/selectors';

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

    cy.visit('/');
    cy.wait('@getIngredients');
  });

  afterEach(() => {
    window.localStorage.removeItem('refreshToken');
    cy.clearCookie('accessToken');
  });

  describe('Тестирование конструктора бургеров', () => {
    it('Тест на добавление булки в конструктор', () => {
      cy.addBunToConstructor();
      cy.verifyConstructorBuns(INGREDIENT_NAMES.BUN);
    });

    it('Тест на добавление начинки в конструктор', () => {
      cy.addMainToConstructor();
      cy.verifyConstructorIngredient(INGREDIENT_NAMES.MAIN);
    });

    it('Тест на добавление соуса в конструктор', () => {
      cy.addSauceToConstructor();
      cy.verifyConstructorIngredient(INGREDIENT_NAMES.SAUCE);
    });

    it('Тест на добавление всех ингредиентов бургера', () => {
      cy.addBunToConstructor();
      cy.addMainToConstructor();
      cy.addSauceToConstructor();

      cy.verifyConstructorBuns(INGREDIENT_NAMES.BUN);
      cy.verifyConstructorIngredient(INGREDIENT_NAMES.MAIN);
      cy.verifyConstructorIngredient(INGREDIENT_NAMES.SAUCE);
    });
  });

  describe('Тестирование модальных окон', () => {
    it('Открытие и закрытие (по крестику и оверлею) модального окна булки', () => {
      cy.openIngredientModal('bun');

      cy.get(SELECTORS.MODAL)
        .as('modal')
        .should('be.visible')
        .and('contain', INGREDIENT_NAMES.BUN);

      cy.closeModalByButton();

      cy.openIngredientModal('bun');
      cy.closeModalByOverlay();
    });

    it('Открытие и закрытие (по крестику и оверлею) модального окна ингредиента', () => {
      cy.openIngredientModal('main');

      cy.get(SELECTORS.MODAL)
        .as('modal')
        .should('be.visible')
        .and('contain', INGREDIENT_NAMES.MAIN);

      cy.closeModalByButton();

      cy.openIngredientModal('main');
      cy.closeModalByOverlay();
    });

    it('Открытие и закрытие (по крестику и оверлею) модального окна соуса', () => {
      cy.openIngredientModal('sauce');

      cy.get(SELECTORS.MODAL)
        .as('modal')
        .should('be.visible')
        .and('contain', INGREDIENT_NAMES.SAUCE);

      cy.closeModalByButton();

      cy.openIngredientModal('sauce');
      cy.closeModalByOverlay();
    });
  });

  describe('Тестирование создания заказа', () => {
    it('Создание заказа с проверкой модального окна и очистки конструктора', () => {
      cy.addBunToConstructor();
      cy.addMainToConstructor();
      cy.addSauceToConstructor();

      cy.verifyConstructorBuns(INGREDIENT_NAMES.BUN);
      cy.verifyConstructorIngredient(INGREDIENT_NAMES.MAIN);
      cy.verifyConstructorIngredient(INGREDIENT_NAMES.SAUCE);

      cy.get(SELECTORS.CONSTRUCTOR_ORDER_BUTTON).click();
      cy.wait('@createOrder');

      cy.get(SELECTORS.MODAL)
        .as('modal')
        .should('be.visible')
        .and('contain', '12345');

      cy.closeModalByButton();

      cy.verifyEmptyConstructor();
    });
  });
});
