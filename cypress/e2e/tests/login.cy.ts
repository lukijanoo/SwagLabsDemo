import { LoginPage } from '../../support/pageObjects/LoginPage';
import { ERROR_MESSAGES, IMAGES, URLs } from '../../support/constants';

describe('Suite - Login', () => {
    const loginPage = new LoginPage()
    let testData;

    beforeEach(() => {
        cy.fixture("user").then(jsonData => { testData = jsonData })
        cy.visit(URLs.LOGIN_PAGE)
    })

    it('should visit login page', () => {
        loginPage.verifyUrl(URLs.LOGIN_PAGE)
        loginPage.verifyLoginImage(IMAGES.LOGIN_PAGE_IMAGE)
    });
    it('should login successfully with valid credentials', () => {
        loginPage.login(testData.username, testData.password)
        loginPage.verifyUrl(URLs.INVENTORY_PAGE)
    });
    it('should login with invalid credentials', () => {
        loginPage.login(testData.username, testData.invalidPassword)
        loginPage.verifyErrorMessage(ERROR_MESSAGES.INVALID_CREDENTIALS)
    });
    it('should login with blank password', () => {
        loginPage.fillUsername(testData.username)
        loginPage.clickLoginButton()
        loginPage.verifyErrorMessage(ERROR_MESSAGES.BLANK_PASSWORD)
    });
    it('should login with blank username', () => {
        loginPage.fillPassword(testData.password)
        loginPage.clickLoginButton()
        loginPage.verifyErrorMessage(ERROR_MESSAGES.BLANK_USERNAME)
    });
});