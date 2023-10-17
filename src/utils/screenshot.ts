import { Page } from "puppeteer-core";

export default async function takeScreenshot(page: Page, fileName: string) {
    await page.screenshot({ path: fileName });
}