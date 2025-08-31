import { test, expect } from '@playwright/test';

test('Auth: invalid login shows an error (classic or hosted)', async ({ page }) => {
  test.setTimeout(45_000);

  // 1) Try the classic Shopify login first
  await page.goto('/account/login', { waitUntil: 'domcontentloaded' });

  // If store uses the new hosted accounts, you’ll be redirected:
  if (/accounts\.shopify\.com/i.test(page.url())) {
    // Hosted login: just prove the hosted login loads and fields exist.
    const email = page.getByLabel(/email/i).first();
    const pass  = page.getByLabel(/password/i).first();
    await expect(email).toBeVisible({ timeout: 8000 });
    await expect(pass).toBeVisible();

    // Optional: do a negative submit (harmless) and expect an error/message
    await email.fill('wrong@example.com');
    await pass.fill('nottherightpassword');
    // Submit button label varies; match a few
    const submit = page.getByRole('button', { name: /sign in|log in|continue|submit/i }).first();
    await submit.click();
    await expect(page.getByText(/incorrect|invalid|try again|we couldn’t/i)).toBeVisible({ timeout: 8000 });
    return;
  }

  // 2) Classic customer accounts on the shop domain
  // Try common Shopify selectors, then fall back to role-based
  const email = page
    .locator('#CustomerEmail')
    .or(page.locator('input[name="customer[email]"]'))
    .or(page.getByLabel(/email/i))
    .first();

  const pass = page
    .locator('#CustomerPassword')
    .or(page.locator('input[name="customer[password]"]'))
    .or(page.getByLabel(/password/i))
    .first();

  const submit = page
    .locator('button[type="submit"]')
    .filter({ hasText: /sign in|log in|submit/i })
    .first()
    .or(page.locator('input[type="submit"]'))
    .or(page.getByRole('button', { name: /sign in|log in/i }).first());

  // If the theme doesn’t expose the form here, bail fast instead of waiting 30s
  if (!(await email.count()) || !(await pass.count()) || !(await submit.count())) {
    test.skip(true, 'Login form not found on /account/login (theme may hide it or use hosted login)');
  }

  await email.fill('wrong@example.com');
  await pass.fill('nottherightpassword');

  // For classic forms, we can just submit and expect an error banner/message
  await submit.click();

  // Shopify themes vary; match several likely messages
  const error = page
    .getByText(/incorrect email or password|invalid|try again|unable to log in|error/i)
    .first();

  await expect(error).toBeVisible({ timeout: 8000 });
});
