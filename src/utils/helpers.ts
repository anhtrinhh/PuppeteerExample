import fs = require('fs');

export function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export function getChromePath() {
    const envChromePath = process.env.CHROME_PATH;
    if (envChromePath) {
        if (fs.existsSync(envChromePath)) return envChromePath;
    }
    const windowsChromePaths = ["C:/Program Files/Google/Chrome/Application/chrome.exe"];
    for(let i = 0; i < windowsChromePaths.length; i++) {
        const p = windowsChromePaths[i];
        if (fs.existsSync(p)) return p;
    }
    const linuxChromePaths = ["/usr/bin/google-chrome", "/usr/bin/google-chrome-stable"];
    for(let i = 0; i < linuxChromePaths.length; i++) {
        const p = linuxChromePaths[i];
        if (fs.existsSync(p)) return p;
    }
    return null;
}