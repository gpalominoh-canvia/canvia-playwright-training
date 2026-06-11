import { BrowseTheWeb } from '../abilities/BrowseTheWeb';
import { Question } from '@screenplay/core/Question';
import { LoginPage } from '@screenplay/ui/LoginPage';
import { Actor } from '@screenplay/core/Actor';
export class IsLoginPage implements Question<boolean> {
  static displayed(): IsLoginPage {
    return new IsLoginPage();
  }
  async answeredBy(actor: Actor): Promise<boolean> {
    return actor.abilityTo(BrowseTheWeb).locate(LoginPage.LOGIN_BUTTON).isVisible();
  }
}
