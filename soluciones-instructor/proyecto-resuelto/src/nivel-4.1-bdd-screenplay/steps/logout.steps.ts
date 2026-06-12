import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { Logout } from '@screenplay/tasks/Logout';
import { IsOnLoginPage } from '@screenplay/questions/IsOnLoginPage';
import { ScreenplayWorld } from '../support/world';

/**
 * NIVEL 4.1 — Ejercicio 3 (Issue #35): logout reutilizando la Task Logout y la
 * Question IsOnLoginPage del Nivel 3 (importadas de @screenplay). Sin selectores.
 */
When('cierro sesión', async function (this: ScreenplayWorld) {
  await this.actor.attemptsTo(Logout.now());
});

Then('debería estar en la página de login', async function (this: ScreenplayWorld) {
  expect(await this.actor.asksFor(IsOnLoginPage.value())).toBe(true);
});
