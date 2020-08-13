
import { Builder, By, Key, until } from "selenium-webdriver";
import { browserWidth, browserHeight } from "./consts";

function sleep(ms : number) {
    return new Promise(solve => {
        setTimeout(solve, ms);
    });
}

async function getPageBrowserHeight(url : string) {
    console.log("-");
    const driver = await new Builder().forBrowser("chrome").build();
    console.log("-");
    await driver.get(url);
    console.log("-");
    await driver.manage().window().setSize(browserWidth, browserHeight);
    console.log("-");
    await sleep(500);
    return await driver.executeScript("return window.innerHeight");
}

export default getPageBrowserHeight;