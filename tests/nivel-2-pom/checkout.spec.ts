import { test } from '@pom/fixtures/pages.fixture';
import { users } from '@pom/data/users';

test.describe('s', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.login(users.standard.username, users.standard.password);
  });
});
