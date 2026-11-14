
import { test } from '@playwright/test';

import { LoginPage } from '../../pages/tta-bank/LoginPage';
import { DashboardPage } from '../../pages/tta-bank/DashboardPage';
import { SendMoneyPage } from '../../pages/tta-bank/SendMoneyPage';

import { Logger } from '../../utils/loggers';

test('TTA Bank - Verify Money Transfer and Balance', async ({ page }) => {

    // Initialize Page Objects
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const sendMoneyPage = new SendMoneyPage(page);

    Logger.info('========== TEST STARTED ==========');

    try {

        // STEP 1: Navigate to TTA Bank
        await loginPage.navigate();

        // STEP 2: Login using credentials from .env
        await loginPage.login();

        // STEP 3: Verify dashboard after login
        Logger.info('Verifying dashboard after login');

        await dashboardPage.verifyInitialBalance();

        Logger.success('Initial balance ₹50,000 verified');

        // STEP 4: Send money to Meera Iyer
        Logger.info('Starting money transfer');

        await sendMoneyPage.sendMoney();

        // STEP 5: Navigate back to Dashboard
        await dashboardPage.openDashboard();

        // STEP 6: Verify ₹5,000 debit transaction
        await dashboardPage.verifyDebitTransaction();

        // STEP 7: Verify final available balance ₹45,000
        await dashboardPage.verifyFinalBalance();

        Logger.success('Final balance ₹45,000 verified');

        Logger.success('========== TEST COMPLETED SUCCESSFULLY ==========');

    } catch (error) {

        Logger.error('========== TEST FAILED ==========');

        throw error;
    }

});
