import type { Actor } from '../core/Actor';
import type { Performable } from '../core/Performable';
import { Navigate } from '../interactions/Navigate';
import { Enter } from '../interactions/Enter';
import { Click } from '../interactions/Click';
import { LoginPage } from '../ui/LoginPage';

/**
 * Task: iniciar sesión. Compone varias interactions en una acción de negocio
 * de alto nivel y legible: "el actor inicia sesión con estas credenciales".
 *
 * Uso: actor.attemptsTo(LoginAs.credentials(user, pass));
 */
export class LoginAs implements Performable {
  private constructor(
    private readonly username: string,
    private readonly password: string,
  ) {}

  static credentials(username: string, password: string): LoginAs {
    return new LoginAs(username, password);
  }

  async performAs(actor: Actor): Promise<void> {
    await actor.attemptsTo(
      Navigate.to('/'),
      Enter.theValue(this.username).into(LoginPage.USERNAME),
      Enter.theValue(this.password).into(LoginPage.PASSWORD),
      Click.on(LoginPage.LOGIN_BUTTON),
    );
  }
}
