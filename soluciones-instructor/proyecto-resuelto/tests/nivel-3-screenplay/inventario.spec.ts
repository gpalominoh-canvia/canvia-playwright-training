import { test, expect } from '@playwright/test';
import { Actor } from '@screenplay/core/Actor';
import { BrowseTheWeb } from '@screenplay/abilities/BrowseTheWeb';
import { LoginAs } from '@screenplay/tasks/LoginAs';
import { AddProductToCart } from '@screenplay/tasks/AddProductToCart';
import { Select } from '@screenplay/interactions/Select';
import { CurrentUrl } from '@screenplay/questions/CurrentUrl';
import { CartBadgeCount } from '@screenplay/questions/CartBadgeCount';
import { InventoryPage } from '@screenplay/ui/InventoryPage';

/**
 * NIVEL 3 — Ejercicio 4 (Issue #4): test de comportamiento que combina
 * Task (LoginAs, AddProductToCart), Interaction (Select) y Questions
 * (CurrentUrl, CartBadgeCount). El test se lee como una narración.
 */
test.describe('Inventario con Screenplay', () => {
  test('el actor inicia sesión, ordena y agrega un producto', async ({ page }) => {
    const qa = Actor.named('QA').whoCan(BrowseTheWeb.using(page));

    await qa.attemptsTo(LoginAs.credentials('standard_user', 'secret_sauce'));
    expect(await qa.asksFor(CurrentUrl.value())).toContain('/inventory.html');

    await qa.attemptsTo(Select.option('Price (low to high)').from(InventoryPage.SORT_DROPDOWN));

    await qa.attemptsTo(AddProductToCart.the(InventoryPage.ADD_BACKPACK));
    expect(await qa.asksFor(CartBadgeCount.value())).toBe(1);
  });
});
