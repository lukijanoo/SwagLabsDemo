import { URLs } from "../constants";
import { LoginPage } from "../pageObjects/LoginPage";

Cypress.Commands.add('login', (username: string, password: string) => {
    const loginPage = new LoginPage();

    cy.visit(URLs.LOGIN_PAGE)
    loginPage.fillUsername(username)
    loginPage.fillPassword(password)
    loginPage.clickLoginButton()
});