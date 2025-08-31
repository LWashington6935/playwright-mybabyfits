import { Page, Locator, expect } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly searchBox: Locator;
  readonly searchBtn: Locator;
  readonly firstCard: Locator;
  readonly cartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    // Replace these with selectors that match your site (ARIA-first recommended)
    this.searchBox = page.getByRole('searchbox');
    this.searchBtn = page.getByRole('button', { name: /search/i });
    this.firstCard = page.getByRole('article').first();
    this.cartLink = page.getByRole('link', { name: /cart/i });
  }

  async goto() { await this.page.goto('/'); }

  async search(term: string) {
    await this.searchBox.fill(term);
    await this.searchBtn.click();
  }

  async addFirstCardToCart() {
    await expect(this.firstCard).toBeVisible();
    await this.firstCard.getByRole('button', { name: /add to cart/i }).click();
  }

  async openCart() { await this.cartLink.click(); }
}