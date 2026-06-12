import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { Navigate } from '@screenplay/interactions/Navigate';
import { LoginAs } from '@screenplay/tasks/LoginAs';
import { TextOf } from '@screenplay/questions/TextOf';
import { CountOf } from '@screenplay/questions/CountOf';
import { CurrentUrl } from '@screenplay/questions/CurrentUrl';
import { LoginPage } from '@screenplay/ui/LoginPage';
import { InventoryPage } from '@screenplay/ui/InventoryPage';
import { ScreenplayWorld } from '../support/world';

/**
 * Step definitions del Nivel 4.1: cada línea Gherkin se traduce a una acción
 * del Actor de Screenplay. Fíjate que NO hay selectores aquí — viven en los
 * Targets (`@screenplay/ui`) y el `cómo` lo encapsulan Tasks/Interactions.
 *
 * Gherkin (qué) ─▶ Step ─▶ Actor.attemptsTo(Task) / asksFor(Question)
 */

Given('que estoy en la página de login', async function (this: ScreenplayWorld) {
  await this.actor.attemptsTo(Navigate.to('/'));
});

When(
  'inicio sesión con usuario {string} y contraseña {string}',
  async function (this: ScreenplayWorld, usuario: string, contrasena: string) {
    await this.actor.attemptsTo(LoginAs.credentials(usuario, contrasena));
  },
);

Then('debería ver la página de inventario', async function (this: ScreenplayWorld) {
  expect(await this.actor.asksFor(TextOf.of(InventoryPage.TITLE))).toBe('Products');
  expect(await this.actor.asksFor(CountOf.of(InventoryPage.ITEMS))).toBeGreaterThan(0);
});

Then(
  'debería ver el mensaje de error {string}',
  async function (this: ScreenplayWorld, mensaje: string) {
    expect(await this.actor.asksFor(TextOf.of(LoginPage.ERROR_MESSAGE))).toContain(mensaje);
  },
);

// Ejercicio 4: aserción por Question (CurrentUrl), sin leer this.page.
Then('la URL debería contener {string}', async function (this: ScreenplayWorld, fragmento: string) {
  expect(await this.actor.asksFor(CurrentUrl.value())).toContain(fragmento);
});
