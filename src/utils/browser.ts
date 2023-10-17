import puppeteer, { Browser } from "puppeteer-core";
import { getChromePath } from "./helpers";

export async function open() {
    try {
        const browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
            args: ['--start-maximized', '--no-sandbox'],
            executablePath: getChromePath()
        });
        return browser;
    } catch (err) {
        console.error(err);
    }
    return null;
}

export async function close(browser: Browser) {
    await browser.close();
}