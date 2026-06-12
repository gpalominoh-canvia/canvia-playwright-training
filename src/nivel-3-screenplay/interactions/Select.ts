import type { Actor } from '../core/Actor';
import type { Performable } from '../core/Performable';
import { Target } from '../core/Target';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';

export class Select implements Performable {
  private constructor(
    private readonly value: string,
    private readonly target: Target,
  ) {}

  static options(value: string): { from: (target: Target) => Select } {
    return {
      from: (target: Target) => new Select(value, target),
    };
  }
  async performAs(actor: Actor): Promise<void> {
    await actor.abilityTo(BrowseTheWeb).locate(this.target).selectOption(this.value);
  }
}
