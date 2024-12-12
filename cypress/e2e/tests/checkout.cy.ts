import { ERROR_MESSAGES, IMAGES, SUCCESSFUL_MESSAGES, URLs, USER_CREDS } from "../../support/constants";
import { CheckoutPage } from "../../support/pageObjects/CheckoutPage";
import { InventoryPage } from "../../support/pageObjects/InventoryPage";


describe('Suite - Checkout', () => {
    const checkoutPage = new CheckoutPage();
    const inventoryPage = new InventoryPage();

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
        cy.addItemAndNavigateToCheckoutPage()
    });

    it('should be able to fill out the form and finish the purchase', () => {
        checkoutPage.subheaderTitle().should('have.text', "Checkout: Your Information")
        checkoutPage.fillTheFormAndContinue(USER_CREDS.FIRST_NAME, USER_CREDS.LAST_NAME, USER_CREDS.ZIP_CODE)
        checkoutPage.verifyUrl(URLs.CHECKOUT_PAGE_TWO)
        checkoutPage.clickFinish()
        checkoutPage.orderImage().should('have.attr', 'src', IMAGES.SUCCESSFUL_ORDER_IMAGE)
        checkoutPage.orderMessage().should('have.text', SUCCESSFUL_MESSAGES.ORDER_MESSAGE)
    })

    it('fill the form without firstname', () => {
        checkoutPage.fillLastName(USER_CREDS.LAST_NAME)
        checkoutPage.fillZipCode(USER_CREDS.ZIP_CODE)
        checkoutPage.clickContinue()
        checkoutPage.verifyErrorMessage(ERROR_MESSAGES.FORM_BLANK_FIRSTNAME)
    });
    it('fill the form without lastname', () => {
        checkoutPage.fillLastName(USER_CREDS.FIRST_NAME)
        checkoutPage.fillZipCode(USER_CREDS.ZIP_CODE)
        checkoutPage.clickContinue()
        checkoutPage.verifyErrorMessage(ERROR_MESSAGES.FORM_BLANK_LASTNAME)
    });
    it('fill the form without zip code', () => {
        checkoutPage.fillFirstName(USER_CREDS.FIRST_NAME)
        checkoutPage.fillLastName(USER_CREDS.LAST_NAME)
        checkoutPage.clickContinue()
        checkoutPage.verifyErrorMessage(ERROR_MESSAGES.FORM_BLANK_ZIPCODE)
    });
    it('should go back to cart clicking on cancel', () => {
        checkoutPage.clickCancel();
        checkoutPage.verifyUrl(URLs.CART_PAGE)
    })
    it('should navigate to item details page from checkout', () => {
        checkoutPage.fillTheFormAndContinue(USER_CREDS.FIRST_NAME, USER_CREDS.LAST_NAME, USER_CREDS.ZIP_CODE)
        inventoryPage.clickItem();
        inventoryPage.verifyUrl(URLs.INVENTORY_ITEM_PAGE);
    })

    it('validate totals on checkout', () => {
        checkoutPage.fillTheFormAndContinue(USER_CREDS.FIRST_NAME, USER_CREDS.LAST_NAME, USER_CREDS.ZIP_CODE)
        checkoutPage.validateTotals()
    })

});