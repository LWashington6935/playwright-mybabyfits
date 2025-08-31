import { test, expect } from '@playwright/test';

test.describe('MyBabyFits — shop & cart', () => {
  test('open Shop, use search field, open Cart', async ({ page }) => {
    // Go straight to the Shop page shown in your nav
    await page.goto('/shop.html');

    // Heading and search input that your page exposes
    await expect(page.getByRole('heading', { name: /shop our collection/i })).toBeVisible();
    const search = page.getByPlaceholder(/search products/i);
    await expect(search).toBeVisible();

    // Type a query (many Shopify themes filter live—no button press needed)
    await search.fill('onesie');
    await expect(search).toHaveValue(/onesie/i);

    // (Optional) If a product grid renders, sanity-check at least one item shows up
    // This is defensive: it only asserts if we see any product "article" elements.
    const cards = page.getByRole('article');
    const count = await cards.count().catch(() => 0);
    if (count > 0) {
      await expect(cards.first()).toBeVisible();
    }

    // Navigate to Cart and confirm the cart page heading
    await page.getByRole('link', { name: /^cart$/i }).click();
    await expect(page.getByRole('heading', { name: /your shopping cart/i })).toBeVisible();
  });
});
