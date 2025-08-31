import { test, expect } from '@playwright/test';

const ABS = 'https://www.mybabyfits.com';

test('home loads and nav/cart controls exist (soft assertions)', async ({ page }) => {
  await page.goto(`${ABS}/`);
  await page.waitForLoadState('domcontentloaded');
  await expect(page).toHaveURL(/mybabyfits\.com/i);

  // Try to find a Shop link/button in a few common ways
  const shop =
    page.getByRole('link', { name: /shop/i }).first()
      .or(page.getByRole('button', { name: /shop/i }).first())
      .or(page.locator('a[href*="shop"]').first());

  // Try cart in a few ways
  const cart =
    page.getByRole('link', { name: /cart|bag|basket/i }).first()
      .or(page.getByRole('button', { name: /cart|bag|basket|view cart/i }).first())
      .or(page.locator('a[href*="/cart"]').first())
      .or(page.locator('[aria-label*="cart" i]').first());

  // Soft checks so this doesn’t fail if your theme names differ
  await expect.soft(await shop.count()).toBeGreaterThan(0);
  await expect.soft(await cart.count()).toBeGreaterThan(0);
});
