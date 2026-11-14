
import { Locator, Page, expect } from '@playwright/test';
import { Logger } from '../../utils/loggers';
import { DataGenerator } from '../../utils/dataGenerators';

export class SendMoneyPage {

    private sendButton :Locator;
    private beneficiary :Locator;
    private amount :Locator;
    private category :Locator;
    private note :Locator;
    private reviewButton :Locator;
    private confirmButton :Locator;

    constructor(private page: Page) {

    this.sendButton = this.page.getByTestId('qa-send');
   
    this.beneficiary = this.page.getByText('Meera Iyer', {
        exact: true
    });

    this.amount = this.page.getByTestId('send-amount');

    this.category = this.page.getByTestId('send-category');

    this.note = this.page.getByTestId('send-note');

    this. reviewButton = this.page.getByTestId('send-submit');

    this.confirmButton = this.page.getByTestId('confirm-send');
    }
    async sendMoney() {

        Logger.info('Opening Send Money page');

        await this.sendButton.click();

        Logger.success('Send Money page opened');

        Logger.info('Selecting beneficiary: Meera Iyer');

        await this.beneficiary.click();

        Logger.success('Beneficiary selected');

        Logger.info('Entering transfer amount: 5000');

        await this.amount.fill('5000');

        Logger.info('Selecting category: Travel');

        // Select Travel category
        await this.category.selectOption('Travel');

        // Generate note using Groq AI
        const generatedNote =
            await DataGenerator.generateTransferNote();

        // Enter generated note
        await this.note.fill(generatedNote);

      
        // Verify that the generated note is not empty.
        await expect(this.note).not.toHaveValue('');

        Logger.success('Transfer note generated');

        Logger.info('Reviewing transfer');

        await this.reviewButton.click();

        Logger.success('Review Transfer clicked');

        Logger.info('Confirming and sending money');

        await this.confirmButton.click();

        Logger.success('Transfer confirmation completed');
    }
}
