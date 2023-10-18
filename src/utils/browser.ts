import { existsSync } from 'fs';
import puppeteer, { Browser } from "puppeteer-core";

function getBrowserPath() {
    const envBrowserPath = process.env.BROWSER_PATH;
    if (envBrowserPath) {
        if (existsSync(envBrowserPath)) return envBrowserPath;
    }
    const windowsChromePaths = ["C:/Program Files/Google/Chrome/Application/chrome.exe",
        "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe"];
    for (let i = 0; i < windowsChromePaths.length; i++) {
        const p = windowsChromePaths[i];
        if (existsSync(p)) return p;
    }
    const linuxChromePaths = ["/usr/bin/google-chrome",
        "/usr/bin/google-chrome-stable"];
    for (let i = 0; i < linuxChromePaths.length; i++) {
        const p = linuxChromePaths[i];
        if (existsSync(p)) return p;
    }
    return null;
}

export async function open(headless = false) {
    try {
        const browser = await puppeteer.launch({
            headless,
            defaultViewport: null,
            args: ['--start-maximized', '--no-sandbox'],
            executablePath: getBrowserPath()
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