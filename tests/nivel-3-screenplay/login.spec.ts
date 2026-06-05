import { test, expect } from '@playwright/test';
import { Actor } from '@screenplay/core/Actor';
import { BrowseTheWeb } from '@screenplay/abilities/BrowseTheWeb';
import { LoginAs } from '@screenplay/tasks/LoginAs';
import { TextOf } from '@screenplay/questions/TextOf';
import { CountOf } from '@screenplay/questions/CountOf';
import { InventoryPage } from '@screenplay/ui/InventoryPage';

/**
 * NIVEL 3 — Screenplay.
 *
 * El test se lee como una narración del comportamiento del usuario:
 * un Actor con la habilidad de navegar la web INTENTA iniciar sesión
 * y luego PREGUNTA por el estado del sistema para validarlo.
 */
test.describe('Login con Screenplay', () => {
  test('un usuario estándar inicia sesión y ve el inventario', async ({ page }) => {
    const giancarlo = Actor.named('Giancarlo').whoCan(BrowseTheWeb.using(page));

    await giancarlo.attemptsTo(LoginAs.credentials('standard_user', 'secret_sauce'));

    await expect(page).toHaveURL(/inventory/);
    expect(await giancarlo.asksFor(TextOf.of(InventoryPage.TITLE))).toBe('Products');
    expect(await giancarlo.asksFor(CountOf.of(InventoryPage.ITEMS))).toBeGreaterThan(0);
  });
});
