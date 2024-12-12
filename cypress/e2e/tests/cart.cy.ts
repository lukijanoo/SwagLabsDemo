import { URLs } from "../../support/constants";
import { CartPage } from "../../support/pageObjects/CartPage";
import { CheckoutPage } from "../../support/pageObjects/CheckoutPage";


describe('Suite - Cart', () => {
    const cartPage = new CartPage()
    const checkoutPage = new CheckoutPage();

    let testData;
    before(() => {
        // Load test data once before all tests
        cy.fixture("user").then((jsonData) => {
            testData = jsonData;
        });
    });

    beforeEach(() => {
        cy.session([testData.username, testData.password], () => {
            cy.login(testData.username, testData.password);
        });
        cy.addItemAndNavigateToCartPage()
    });

    it('should be able to go back', () => {
        cartPage.goBack()
        cartPage.verifyUrl(URLs.INVENTORY_PAGE)
        cy.get('.product_label').should('have.text', "Products")
    });
    it('should be able to checkout', () => {
        cartPage.goCheckout()
        cartPage.verifyUrl(URLs.CHECKOUT_PAGE_ONE)
        checkoutPage.form().should('be.visible')
    });
    it('should be able to remove an item', () => {
        cartPage.removeItemFromCart()
        cy.get('.cart_list').should('not.have.descendants', '.cart_item');
    });


});