import { URLs } from "../../support/constants";
import { InventoryPage } from "../../support/pageObjects/InventoryPage";

describe('Suite - Inventory', () => {
    const inventoryPage = new InventoryPage()
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

        cy.visit(URLs.INVENTORY_PAGE);
    });
    it('should display the inventory page correctly', () => {
        inventoryPage.verifyUrl(URLs.INVENTORY_PAGE);
        inventoryPage.productTitle().should('have.text', "Products")
        inventoryPage.getItems().should('have.length.greaterThan', 0);
    });

    it('should add a specific item to the cart', () => {
        inventoryPage.addProductToCart(0)
        inventoryPage.cartBadgeCounter().should('exist')
    });
    it('should remove an item from the cart', () => {
        inventoryPage.addProductToCart(0)
        inventoryPage.cartBadgeCounter().should('exist')
        inventoryPage.removeProductFromCart()
        inventoryPage.cartBadgeCounter({ timeout: 0 }).should('not.exist');
    });
    it('should sort items by name (A to Z)', () => {
        inventoryPage.sortItems('az');
        inventoryPage.verifyItemsSorted('ascending', 'text', '.inventory_item_name');
    });

    it('should sort items by name (Z to A)', () => {
        inventoryPage.sortItems('za');
        inventoryPage.verifyItemsSorted('descending', 'text', '.inventory_item_name');
    });

    it('should sort items by price (low to high)', () => {
        inventoryPage.sortItems('lohi');
        inventoryPage.verifyItemsSorted('ascending', 'number', '.inventory_item_price');
    });

    it('should sort items by price (high to low)', () => {
        inventoryPage.sortItems('hilo');
        inventoryPage.verifyItemsSorted('descending', 'number', '.inventory_item_price');
    });
    it('should navigate to item details page', () => {
        inventoryPage.clickItem();
        inventoryPage.verifyUrl(URLs.INVENTORY_ITEM_PAGE);
    });
    it('should return to inventory page from item details', () => {
        inventoryPage.clickItem();
        inventoryPage.goBackToInventory();
        inventoryPage.verifyUrl(URLs.INVENTORY_PAGE);
    });

});