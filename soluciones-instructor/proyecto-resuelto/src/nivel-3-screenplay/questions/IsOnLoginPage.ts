import type { Actor } from '../core/Actor';
import type { Question } from '../core/Question';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';
import { LoginPage } from '../ui/LoginPage';

/**
 * NIVEL 3 — Ejercicio 5 / reto (Issue #4).
 * Question: ¿estamos en la página de login? (el botón de login está visible).
 */
export class IsOnLoginPage implements Question<boolean> {
  static value(): IsOnLoginPage {
    return new IsOnLoginPage();
  }

  async answeredBy(actor: Actor): Promise<boolean> {
    return actor.abilityTo(BrowseTheWeb).locate(LoginPage.LOGIN_BUTTON).isVisible();
  }
}
