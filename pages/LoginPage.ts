import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly email: Locator;
  readonly password: Locator;
  readonly submit: Locator;

  constructor(page: Page) {
    this.page = page;
    this.email = page.getByLabel(/email/i);
    this.password = page.getByLabel(/password/i);
    this.submit = page.getByRole('button', { name: /sign in|log in/i });
  }

  async goto() { await this.page.goto('/login'); }

  async login(user: string, pass: string) {
    await this.email.fill(user);
    await this.password.fill(pass);
    await this.submit.click();
  }
}