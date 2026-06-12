import type { Actor } from '../core/Actor';
import type { Performable } from '../core/Performable';
import { Click } from '../interactions/Click';
import { LoginPage } from '../ui/LoginPage';

/**
 * NIVEL 3 — Ejercicio 5 / reto (Issue #4).
 * Task: cerrar sesión (abrir el menú lateral y pulsar Logout).
 *
 * Uso: actor.attemptsTo(Logout.now())
 */
export class Logout implements Performable {
  static now(): Logout {
    return new Logout();
  }

  async performAs(actor: Actor): Promise<void> {
    await actor.attemptsTo(Click.on(LoginPage.MENU_BUTTON), Click.on(LoginPage.LOGOUT_LINK));
  }
}
