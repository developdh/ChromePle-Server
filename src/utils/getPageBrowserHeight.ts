
import { Builder } from "selenium-webdriver";
import { browserWidth, browserHeight } from "../consts/consts";
import { Options } from "selenium-webdriver/chrome";
import { Preferences, Level, Type } from "selenium-webdriver/lib/logging";

function sleep(ms : number) {
    return new Promise(solve => {
        setTimeout(solve, ms);
    });
}

async function getPageBrowserHeight(url : string) : Promise<number> {
    console.log("[selenium] 시작");

    const driverBuilder = await new Builder().forBrowser("chrome");

    const loggingPrefs = new Preferences();
    loggingPrefs.setLevel(Type.BROWSER, Level.OFF);
    loggingPrefs.setLevel(Type.CLIENT, Level.OFF);
    loggingPrefs.setLevel(Type.DRIVER, Level.OFF);
    loggingPrefs.setLevel(Type.PERFORMANCE, Level.OFF);
    loggingPrefs.setLevel(Type.SERVER, Level.OFF);

    const options = new Options();
    options.addArguments("no-sandbox", "disable-dev-shm-usage", "disable-gpu", "disable-extensions", "disable-setuid-sandbox");
    options.headless();
    options.windowSize({
        width: browserWidth,
        height:browserHeight
    });

    driverBuilder.setLoggingPrefs(loggingPrefs);
    driverBuilder.setChromeOptions(options);
    
    const driver = await driverBuilder.build();
    await driver.get(`http://${url}`);
    await sleep(1000);
    const offsetHeight : number = await driver.executeScript("return document.body.offsetHeight");

    await driver.close();
    console.log("[selenium] 종료");

    return offsetHeight;
}

export default getPageBrowserHeight;