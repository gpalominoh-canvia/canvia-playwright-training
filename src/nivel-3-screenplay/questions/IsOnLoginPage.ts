import type { Actor } from '../core/Actor';
import type { Question } from '../core/Question';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';
import { LoginPage } from '../ui/LoginPage';

export class IsOnLoginPage implements Question<boolean> {
  private constructor() {}

  static displayed(): IsOnLoginPage {
    return new IsOnLoginPage();
  }

  async answeredBy(actor: Actor): Promise<boolean> {
    return actor.abilityTo(BrowseTheWeb).locate(LoginPage.LOGIN_BUTTON).isVisible();
  }
}
