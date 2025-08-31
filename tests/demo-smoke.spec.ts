import { test, expect } from '@playwright/test';

test('demo app adds a todo (env check)', async ({ page }) => {
  await page.goto('/');
  await page.getByPlaceholder('What needs to be done?').fill('Buy milk');
  await page.keyboard.press('Enter');
  await expect(page.getByRole('listitem')).toContainText('Buy milk');
});