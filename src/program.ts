import * as browser from "./utils/browser";

export default class Program {
    public async main(): Promise<void> {
        const browserWindow = await browser.open();
        if (browserWindow) {
            const page1 = (await browserWindow.pages())[0];
            await page1.goto("https://youtube.com");
            const page2 = await browserWindow.newPage();
            await page2.goto("https://facebook.com");
        }
    }
}