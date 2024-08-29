import { test, expect } from '@playwright/test';

test('app root URL is accessible', async ({ page }) => {
  await page.goto('/'); 
  await expect(page).toHaveTitle(/Video file compressor/i); 
})