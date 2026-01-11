import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  test.skip('should allow user to login', async ({ page }) => {
    // TODO: ログインフローのE2Eテストを実装
    await page.goto('/login');
    // ... テストコード
  });

  test.skip('should allow user to logout', async ({ page }) => {
    // TODO: ログアウトフローのE2Eテストを実装
    await page.goto('/');
    // ... テストコード
  });
});
