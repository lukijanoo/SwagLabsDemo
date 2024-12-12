import { BasePage } from "./BasePage";

export class InventoryPage extends BasePage {

    productTitle() {
        return this.waitForElement("div.product_label")
    }
    addToCartBtn() {
        return this.waitForElement('button.btn_inventory')
    }
    cartBtn() {
        return this.clickElement('#shopping_cart_container')
    }
    getItems() {
        return this.addToCartBtn().then(elements => {
            return elements
        })
    }

    cartBadgeCounter(options = {}) {
        return cy.get('span.shopping_cart_badge')
    }

    removeBtn() {
        return this.waitForElement('button').filter(':contains("REMOVE")');

    }
    compareRemoveBtnWithCartCounter() {
        this.cartBadgeCounter().then(badgeCounter => {
            this.removeBtn().then(removeBtnCounter => {
                expect(badgeCounter).to.eq(removeBtnCounter)
            })
        })
    }
    Item() {
        return this.waitForElement('.inventory_item_name')
    }
    addProductToCart(index: number) {
        return this.addToCartBtn().eq(index).click()
    }
    removeProductFromCart() {
        return this.removeBtn().eq(0).click()
    }
    clickOnCart() {
        return this.cartBtn()
    }
    verifyPageTitle(selector: string, text: string) {
        cy.get(selector).should('have.text', text)
    }

    sortItems(option: string) {
        return this.waitForElement('.product_sort_container').select(option);
    }
    clickItem() {
        return this.Item().first().click()
    }
    backToInventoryBtn() {
        return this.waitForElement('button.inventory_details_back_button')
    }
    goBackToInventory() {
        return this.backToInventoryBtn().click({ force: true })
    }
    verifyItemsSorted(
        order: 'ascending' | 'descending',
        type: 'text' | 'number',
        selector: string
    ) {
        cy.get(selector)
            .then((elements) => {
                const itemsArray = [...elements].map((el) =>
                    type === 'number' ? parseFloat(el.innerText.replace('$', '')) : el.innerText.trim()
                );

                const sortedArray = [...itemsArray].sort((a, b) => {
                    if (type === 'number') {
                        // For numbers, use subtraction
                        return order === 'ascending' ? (a as number) - (b as number) : (b as number) - (a as number);
                    } else {
                        // For text, use localeCompare
                        return order === 'ascending'
                            ? (a as string).localeCompare(b as string)
                            : (b as string).localeCompare(a as string);
                    }
                });

                expect(itemsArray).to.deep.equal(sortedArray);
            });
    }
}