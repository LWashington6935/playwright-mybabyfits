import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('shows validation on bad login', async ({ page }) => {
  const login = new LoginPage(page);
  await login.goto();

  // Stub a 401 from your auth endpoint so we don't depend on real creds
  await page.route('**/api/auth/login', route =>
    route.fulfill({ status: 401, contentType: 'application/json', body: JSON.stringify({ error: 'Invalid email or password' }) })
  );

  await login.login('wrong@example.com', 'badpassword');
  await expect(page.getByText(/invalid email or password/i)).toBeVisible();
});