import { test,expect } from '@playwright/test';
import * as fs from 'fs';

test.describe.only('Intercept requests with Playwright.', async () => {

    // Useful to test UI(How it handles the mocked API responses.)

    // 1. Mock a successful API response.
    test('GET user - mock with local file.', async({ page }) => {

        const mockData = JSON.parse(fs.readFileSync('test-data/user_data_mocked.json', 'utf-8'));

        await page.route('**/api/users/2', async route => {

            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                // convert back to json string.
                body: JSON.stringify(mockData)
            })

        });

        // normal application url.
        await page.goto("");
        await page.getByText("Single User").click();
    });

    // 2. Simulate user not found.
    test('GEt user - simulate 404 not found.', async({ page }) => {

        // Intercept the request and response with 404.
        await page.route('**/api/users/2', async route => {

            await route.fulfill({
                status: 404,
                contentType: 'application/json',
                body: JSON.stringify({error: 'User not found.'})
            }
            );
        });

        await page.goto("");
        await page.getByText("Single user.").click();
    
    });

    //3. Block images to speed up page load.
    test('Block all images, styles ans fonts.', async({ page }) => {
        
        // Intercept request and block images.
        await page.route('**api/users/2', async route => {

            const resourceType = route.request().resourceType();

            if(['image', 'stylesheet', 'font'].includes(resourceType)){
                console.log(`Blocking resource: ${route.request().url()}`);
                route.abort();
            }
            else{
                route.continue();
            }
        })

        // application url.
        await page.goto("");

    });

});