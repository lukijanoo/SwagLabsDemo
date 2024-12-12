import { BasePage } from "./BasePage";

export class CheckoutPage extends BasePage {
    // PART-ONE
    subheaderTitle() {
        return this.waitForElement('.subheader');
    }

    form() {
        return this.waitForElement('.checkout_info_wrapper');
    }

    fillFirstName(firstname: string) {
        return this.fillInput('#first-name', firstname);
    }

    fillLastName(lastname: string) {
        return this.fillInput('#last-name', lastname);
    }

    fillZipCode(zipcode: string) {
        return this.fillInput('#postal-code', zipcode);
    }

    continueBtn() {
        return this.waitForElement('input[value="CONTINUE"]');
    }

    cartCancelBtn() {
        return this.waitForElement('.cart_cancel_link');
    }

    clickCancel() {
        return this.cartCancelBtn().click();
    }

    clickContinue() {
        return this.continueBtn().click();
    }

    fillTheFormAndContinue(firstname: string, lastname: string, zipcode: string) {
        this.fillFirstName(firstname);
        this.fillLastName(lastname);
        this.fillZipCode(zipcode);
        this.clickContinue();
    }

    // PART TWO
    finishBtn() {
        return this.waitForElement('.cart_footer > .cart_button');
    }

    clickFinish() {
        return this.finishBtn().click();
    }

    // COMPLETE
    orderMessage() {
        return cy.get(".complete-header");
    }

    orderImage() {
        return cy.get(".pony_express");
    }

    // VALIDATE TOTALS
    validateTotals() {
        const taxRate = 0.08; // 8% tax rate
        let itemTotal = 0;

        return cy.get('.cart_item').each(($el) => {
            const price = parseFloat($el.find('.inventory_item_price').text().replace('$', ''));
            console.log("Cena: " + price)
            const quantity = parseInt($el.find('.summary_quantity').text());
            console.log("Kolicina:" + quantity)
            itemTotal += price * quantity;
            console.log("Ukupno: " + itemTotal)
        }).then(() => {
            const tax = parseFloat((itemTotal * taxRate).toFixed(2));
            console.log("Taksa sa 8% x Ukupno: " + tax);

            const total = parseFloat((itemTotal + tax).toFixed(2));
            console.log("Total: " + total);

            cy.get('.summary_subtotal_label').should('contain', `$${itemTotal.toFixed(2)}`);
            cy.get('.summary_tax_label').should('contain', `$${tax}`);
            cy.get('.summary_total_label').should('contain', `$${total}`);
        });
    }
}
