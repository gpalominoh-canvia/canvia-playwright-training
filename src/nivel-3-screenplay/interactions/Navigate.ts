import type { Actor } from '../core/Actor';
import type { Performable } from '../core/Performable';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';

/** Interaction: navegar a una ruta (relativa a la baseURL). */
export class Navigate implements Performable {
  private constructor(private readonly path: string) {}

  static to(path: string): Navigate {
    return new Navigate(path);
  }

  async performAs(actor: Actor): Promise<void> {
    await actor.abilityTo(BrowseTheWeb).page.goto(this.path);
  }
}
