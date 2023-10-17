import { Page } from "puppeteer-core";

export default async function scrapeElement(page: Page, selector: string) {
    const element = await page.$(selector);
    if (element) {
        return page.evaluate((el) => el.textContent, element);
    }
    return null;
}
