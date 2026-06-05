import type { Actor } from '../core/Actor';
import type { Performable } from '../core/Performable';
import { Target } from '../core/Target';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';

/**
 * Interaction: escribir un valor en un campo.
 * Uso: Enter.theValue('texto').into(Target).
 */
export class Enter implements Performable {
  private constructor(
    private readonly value: string,
    private readonly target: Target,
  ) {}

  static theValue(value: string): { into: (target: Target) => Enter } {
    return {
      into: (target: Target) => new Enter(value, target),
    };
  }

  async performAs(actor: Actor): Promise<void> {
    await actor.abilityTo(BrowseTheWeb).locate(this.target).fill(this.value);
  }
}
