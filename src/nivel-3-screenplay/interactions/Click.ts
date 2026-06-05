import type { Actor } from '../core/Actor';
import type { Performable } from '../core/Performable';
import { Target } from '../core/Target';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';

/** Interaction: hacer clic sobre un elemento. */
export class Click implements Performable {
  private constructor(private readonly target: Target) {}

  static on(target: Target): Click {
    return new Click(target);
  }

  async performAs(actor: Actor): Promise<void> {
    await actor.abilityTo(BrowseTheWeb).locate(this.target).click();
  }
}
