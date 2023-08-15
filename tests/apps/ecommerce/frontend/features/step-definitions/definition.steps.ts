import { Given, Then, AfterAll, BeforeAll, setDefaultTimeout } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { chromium } from 'playwright';

import type { Browser, BrowserContext, Page } from 'playwright';

const baseURL = process.env.FRONTEND_URL;

let browser: Browser;
let context: BrowserContext;
let page: Page;

setDefaultTimeout(60 * 1000);

BeforeAll(async () => {
	browser = await chromium.launch({
		executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH
	});
	context = await browser.newContext({ baseURL });
	page = await context.newPage();
});

Given('I am on {string} page', async (route: string) => {
	await page.goto(route);
	await expect(page.getByRole('progressbar')).toBeHidden({ timeout: 60 * 1000 });
});

Then('the page title should be {string}', async (title: string) => {
	await expect(page).toHaveTitle(title);
});

Then('I click the {string} tab', async (name: string) => {
	await page.getByLabel(name).click();
});

Then('I fill the {string} with {string}', async (placeholder: string, value: string) => {
	await page.getByPlaceholder(placeholder, { exact: true }).fill(value);
});

Then('I click the {string} button', async (name: string) => {
	await page.getByRole('button', { name }).click();
});

Then('I see {string} notification', async (message: string) => {
	await expect(page.getByText(message, { exact: true })).toBeVisible({ timeout: 60 * 1000 });
});

Then('I see {string} title', async (name: string) => {
	await expect(page.getByRole('heading', { name })).toBeVisible({ timeout: 60 * 1000 });
});

AfterAll(async () => {
	await context.close();
	await browser.close();
});
