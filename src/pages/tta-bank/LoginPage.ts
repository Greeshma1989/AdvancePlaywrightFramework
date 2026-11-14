
import { Locator, Page, expect } from '@playwright/test';
import { Logger } from '../../utils/loggers';

export class LoginPage {
  
private email: Locator;
private password: Locator;
private loginButton: Locator;

constructor(private page: Page) {
  this.email = page.getByTestId('login-email');
  this.password = page.getByTestId('login-password');
  this.loginButton = page.getByTestId('login-submit');
}
    // Navigate to application
    async navigate() {

        const url = process.env.TTA_BANK_URL;

        if (!url) {
            throw new Error('TTA_BANK_URL is missing in .env');
        }

        Logger.info('Opening TTA Bank application');

        await this.page.goto(url);

        Logger.success('TTA Bank application opened');
    }

    // Login using .env credentials
    async login() {

        const email = process.env.TTA_BANK_EMAIL;
        const password = process.env.TTA_BANK_PASSWORD;

        if (!email || !password) {
            throw new Error('Login credentials missing in .env');
        }

        Logger.info('Entering email');

        await this.email.fill(email);

        Logger.info('Entering password');

        await this.password.fill(password);

        Logger.info('Clicking Login button');

        await this.loginButton.click();

        // Verify successful login
        await expect(
            this.page.getByTestId('nav-dashboard')
        ).toBeVisible();

        Logger.success('Login successful');
    }
}
