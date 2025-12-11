import { test, expect } from '@playwright/test';

test('Example of Playwright locators.', async({page}) => {

    await page.goto("https://the-internet.herokuapp.com/login");

    // Examples of built-in locators.

    // 1. getByRole()
    const loginButton = page.getByRole('button', {name: 'Login'});
    await expect(loginButton).toBeVisible();

    //2. GetByText()
    const headerText = page.getByText('Login Page');
    await expect(headerText).toBeVisible();

    // 3. getByLabel()
    await page.getByLabel('Username').fill('tomsmith');
    await page.getByLabel('Password').fill('SuperSecretPassword!');

    // Css selectors examples.
    //1. Id selector
    await page.locator('#username').fill('selected_by_css');

    //2. tag attribute and attribute value.
    await page.locator("input[name='password']").fill('selected_by_css');

    //3. class name
    await page.locator('.radius').click();

    // Xpath selectors examples.
    //1. Xpath id.
    await page.locator(`xpath=.//input[@id='username']`).fill('selected_by_xpath');

    //2. Get by Xpath matching text using contains.'.' goes deeper. Unable to find the element if we use 'i'. Text is inside the i element.
    await page.locator(`xpath=.//button[contains(.,'Login')]`).click();

    // 3. store element by test and assert.
    const errorMessage = page.locator(`xpath=.//div[@id='flash']`);
    await expect(errorMessage).toContainText('Your username is invalid!');

});