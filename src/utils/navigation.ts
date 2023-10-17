import { Page } from "puppeteer-core";

export default async function navigateToPage(page: Page, url: string) {
    await page.goto(url);
    await page.waitForSelector('body'); 
}