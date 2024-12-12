import { URLs } from "../constants";
import { CartPage } from "../pageObjects/CartPage";
import { InventoryPage } from "../pageObjects/InventoryPage";

Cypress.Commands.add('addItemAndNavigateToCartPage', () => {
    const inventoryPage = new InventoryPage();

    cy.visit(URLs.INVENTORY_PAGE)
    inventoryPage.addProductToCart(0)
    inventoryPage.clickOnCart()
});
Cypress.Commands.add('addItemAndNavigateToCheckoutPage', () => {
    const inventoryPage = new InventoryPage();
    const cartPage = new CartPage();

    cy.visit(URLs.INVENTORY_PAGE)
    inventoryPage.addProductToCart(0)
    inventoryPage.addProductToCart(1)
    inventoryPage.clickOnCart()
    cartPage.goCheckout()

});