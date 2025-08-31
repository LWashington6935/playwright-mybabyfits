import { test, expect } from '@playwright/test';

test('MyBabyFits — home → shop → product → add to cart → cart', async ({ page }) => {
  // If you set BASE_URL in .env you can use '/' here; absolute works too:
  await page.goto('/');

  // --- Go to Shop (try a few common selectors; stop at the first that exists)
  let clicked = false;
  for (const loc of [
    page.getByRole('link', { name: /shop/i }),
    page.getByRole('button', { name: /shop/i }),
    page.locator('a[href*="shop"]').first(),
    page.locator('nav a:has-text("Shop")').first(),
  ]) {
    if (await loc.count()) { await loc.first().click(); clicked = true; break; }
  }
  expect(clicked, 'Could not find a Shop link/button').toBeTruthy();
  await page.waitForLoadState('domcontentloaded');

  // --- Open a product (works whether you have a grid or list)
  const firstCard = page.getByRole('article').first();
  if (await firstCard.count()) {
    // If cards have links, follow it to PDP
    const anchor = firstCard.locator('a').first();
    if (await anchor.count()) await anchor.click();
  }

  // --- Add to cart (covers PDP or grid “Add to cart” buttons)
  let added = false;
  for (const add of [
    page.getByRole('button', { name: /add to cart/i }),
    page.locator('[data-testid="add-to-cart"]'),
    page.locator('button:has-text("Add to cart")'),
  ]) {
    if (await add.count()) { await add.first().click(); added = true; break; }
  }
  expect(added, 'Add to cart button not found').toBeTruthy();

  // --- Open/verify cart: some themes show a drawer, others navigate
  // If no drawer pops, click Cart in the header
  const cartDrawer = page.getByRole('dialog').filter({ hasText: /cart|bag|shopping/i });
  if (!(await cartDrawer.count())) {
    for (const cart of [
      page.getByRole('link', { name: /cart|bag|basket/i }),
      page.getByRole('button', { name: /cart|bag|basket|view cart/i }),
      page.locator('a[href*="/cart"]').first(),
      page.locator('[aria-label*="cart" i]').first(),
    ]) {
      if (await cart.count()) { await cart.first().click(); break; }
    }
  }

  // Assert either drawer or page
  if (await cartDrawer.count()) {
    await expect(cartDrawer.first()).toBeVisible();
  } else if (await page.getByRole('heading', { name: /cart|shopping/i }).count()) {
    await expect(page.getByRole('heading', { name: /cart|shopping/i }).first()).toBeVisible();
  } else {
    await expect(page, 'URL should include /cart after adding').toHaveURL(/\/cart/i);
  }

  // Optional: don’t actually check out, just confirm button exists
  const checkout = page.getByRole('button', { name: /checkout/i })
                 .or(page.getByRole('link', { name: /checkout/i }));
  await expect.soft(checkout).toBeVisible();
});
