export class BasePage {
    getUrl() {
        return cy.url();
    }

    waitForElement(selector: string) {
        return cy.get(selector).should('exist');
    }
    clickElement(selector: string) {
        return cy.get(selector).should('exist').click()
    }
    fillInput(selector: string, value: any) {
        return cy.get(selector).should('exist').clear().type(value);
    }
    verifyUrl(text: string) {
        cy.url().should('include', text);
    }
    verifyElementAttribute(selector: string, attribute: string, value: string) {
        cy.get(selector).should('have.attr', attribute, value);
    }

    getErrorMessage() {
        return cy.get('h3[data-test="error"]');
    }

    verifyErrorMessage(expectedMessage: string) {
        this.getErrorMessage().should('contain', expectedMessage);
    }
}
