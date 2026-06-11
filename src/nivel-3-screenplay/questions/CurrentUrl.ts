import type { Actor } from '../core/Actor';
import type { Question } from '../core/Question';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';

export class CurrentUrl implements Question<string> {
  private constructor() {}

  static displayed(): CurrentUrl {
    return new CurrentUrl();
  }

  async answeredBy(actor: Actor): Promise<string> {
    return actor.abilityTo(BrowseTheWeb).page.url();
  }
}
