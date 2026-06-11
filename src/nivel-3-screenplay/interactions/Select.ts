import type { Actor } from '../core/Actor';
import { Target } from '../core/Target';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';
import { Performable } from '@screenplay/core/Performable';

export class Select implements Performable {
  private constructor(
    private readonly target: Target,
    private readonly value: string,
  ) {}

  static option(value: string): { from: (target: Target) => Select } {
    return {
      from: (target: Target) => new Select(target, value),
    };
  }

  async performAs(actor: Actor): Promise<void> {
    await actor.abilityTo(BrowseTheWeb).locate(this.target).selectOption(this.value);
  }
}
