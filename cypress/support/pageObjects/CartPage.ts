import { BasePage } from "./BasePage";

export class CartPage extends BasePage {
    //Elements
    subheaderTitle() {
        return this.waitForElement('.subheader')
    }
    continueShoppingBtn() {
        return this.waitForElement(".cart_footer > .btn_secondary")
    }
    checkoutBtn() {
        return this.waitForElement(".cart_footer > .btn_action");
    }
    removeBtn() {
        return this.waitForElement('.item_pricebar > .btn_secondary');
    }
    cartItem() {
        return this.waitForElement('.cart_item')
    }

    //Actions
    goBack() {
        return this.continueShoppingBtn().click()
    }
    goCheckout() {
        return this.checkoutBtn().click()
    }
    removeItemFromCart() {
        return this.removeBtn().click()
    }
    verifyItemsInCart() {
        this.cartItem()
    }
    
}