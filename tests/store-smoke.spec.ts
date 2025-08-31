import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

test.describe('Store smoke', () => {
  test('search and add to cart', async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();

    // Stub products API so the test is stable in CI
    await page.route('**/api/products*', async route => {
      const url = new URL(route.request().url());
      const q = url.searchParams.get('query') ?? '';
      const body = { products: [{ id: 1, name: `Stubbed ${q || 'Item'}` }] };
      await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(body) });
    });

    await home.search('hoodie');
    await home.addFirstCardToCart();
    await home.openCart();

    await expect(page.getByRole('heading', { name: /your cart/i })).toBeVisible();
    await expect(page.getByRole('row', { name: /hoodie|stubbed/i })).toBeVisible();
  });
});