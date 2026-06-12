import { test, expect } from '@playwright/test';
import { Actor } from '@screenplay/core/Actor';
import { BrowseTheWeb } from '@screenplay/abilities/BrowseTheWeb';
import { LoginAs } from '@screenplay/tasks/LoginAs';
import { Logout } from '@screenplay/tasks/Logout';
import { IsOnLoginPage } from '@screenplay/questions/IsOnLoginPage';

/**
 * NIVEL 3 — Ejercicio 5 / reto (Issue #4): Task Logout + Question IsOnLoginPage.
 */
test('el actor cierra sesión y vuelve al login', async ({ page }) => {
  const qa = Actor.named('QA').whoCan(BrowseTheWeb.using(page));

  await qa.attemptsTo(LoginAs.credentials('standard_user', 'secret_sauce'));
  await qa.attemptsTo(Logout.now());

  expect(await qa.asksFor(IsOnLoginPage.value())).toBe(true);
});
