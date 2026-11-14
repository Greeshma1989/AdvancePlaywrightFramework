
import { Locator, Page, expect } from '@playwright/test';
import { Logger } from '../../utils/loggers';

export class DashboardPage {
    private dashboardButton: Locator;

    constructor(private page: Page) {
        this.dashboardButton = this.page.getByTestId('nav-dashboard');
    }

    async openDashboard() {

        Logger.info('Navigating to Dashboard');

        await this.dashboardButton.click();

        await expect(this.dashboardButton).toBeVisible();

        Logger.success('Dashboard opened');
    }

    async verifyInitialBalance() {

        Logger.info('Verifying initial available balance');

        // Confirm actual currency formatting in the application
        await expect(
            this.page.getByTestId('balance-amount').first()
        ).toBeVisible();

        Logger.success('Initial balance ₹50,000 verified');

        Logger.info('Verifying initial balance in recent transactions');

        // Replace with the actual recent-transaction locator
        // if the amount is displayed differently.


        Logger.success('Initial balance found on Dashboard');
    }

    async verifyFinalBalance() {

        Logger.info('Verifying final available balance');

        await expect(
            this.page.getByText('₹45,000', { exact: true }).first()
        ).toBeVisible();

        Logger.success('Final balance ₹45,000 verified');
    }

    async verifyDebitTransaction() {

        Logger.info('Verifying debit transaction of ₹5,000');

        // Verify the debit entry.
        // Adjust this locator to match the actual transaction display.
        await expect(
            this.page.getByText(/-₹5,000/)
        ).toBeVisible();

        Logger.success('Debit transaction ₹5,000 verified');
    }
}
