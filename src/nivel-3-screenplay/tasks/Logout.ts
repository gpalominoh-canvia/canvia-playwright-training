import type { Actor } from '../core/Actor';
import type { Performable } from '../core/Performable';
import { InventoryPage } from '../ui/InventoryPage';
import { Click } from '@screenplay/interactions/Click';

export class Logout implements Performable {
  private constructor() {}
  static fromTheApp(): Logout {
    return new Logout();
  }
  async performAs(actor: Actor): Promise<void> {
    await actor.attemptsTo(
      Click.on(InventoryPage.MENU_BUTTON),
      Click.on(InventoryPage.LOGOUT_BUTTON),
    );
  }
}
