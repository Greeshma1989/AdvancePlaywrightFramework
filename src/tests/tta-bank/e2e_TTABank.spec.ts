
import { test, expect } from '@playwright/test';

test('Verify successful bank transfer', async ({ page }) => {

  // 1. Login
  await page.goto('https://app.thetestingacademy.com/playwright/tta-bank/');

  await page.getByTestId('login-email')
    .fill('priya.tester@ttabank.in');

  await page.getByTestId('login-password')
    .fill('Test@1234');

  await page.getByTestId('login-submit').click();

    await expect(page.getByTestId('nav-dashboard')).toBeEnabled();
   
    await expect(page.getByTestId('balance-amount')).toBeVisible();

  // 2. Navigate to Send Money
  await page.getByTestId('qa-send').click();

  // 3. Select beneficiary
  await page.getByTestId('beneficiary-ben-102').click();

  // 4. Enter transfer details
  await page.getByTestId('send-amount').fill('500');

  await page.getByTestId('send-category')
    .selectOption('Rent');

  await page.getByTestId('send-note').fill('test');

  // 5. Submit transfer
  await page.getByTestId('send-submit').click();

  await page.getByTestId('confirm-send').click();

  // 6. Navigate to dashboard
  await page.getByTestId('nav-dashboard').click();

});
