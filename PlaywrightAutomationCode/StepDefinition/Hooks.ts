import { BeforeAll, AfterAll, After, Before, Status, BeforeStep, AfterStep } from '@cucumber/cucumber';
import { chromium, Browser, BrowserContext, Page, expect } from '@playwright/test';
import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";

import { pageFixture } from "../hooks/pageFixture";
import path from 'path';
import process from 'process';

let page: Page;
let browser: Browser;
let context: BrowserContext;

setDefaultTimeout(60000) // 60 seconds, if any step takes more than 60 seconds, it will be failed due to timeout error

BeforeAll(async function () {

    browser = await chromium.launch({
        headless: false,
        args: ["--start-maximized"],
    });

    console.log("BeforeAll")
});

Before(async function () {

    context = await browser.newContext({
        recordVideo: { dir: 'test-result/videos' },
        viewport: null
    });

    // 3. Start tracing before navigating or creating a page
    await context.tracing.start({
        screenshots: true,
        snapshots: true,
        sources: true
    });

    page = await context.newPage();

    pageFixture.page = page

    console.log("Before")
});

After(async function (scenario) {
    // Sanitize scenario name to use as a filename
    const traceName = scenario.pickle.name.replace(/[^a-zA-Z0-9]/g, '_');
    const tracePath = path.join(process.cwd(), `reports/traces/${traceName}.zip`);

    // 5. Close the page
    await pageFixture.page.close();

    // 6. Stop tracing and save the file
    // Tip: You can wrap this in an if condition to save only on failure
    await context.tracing.stop({ path: tracePath });

    // 7. Clean up the context and browser
    // await context.close();
    // await browser.close();

      console.log("after")
});

AfterAll(async function () {

    //close the page
    //await pageFixture.page.close();

    //browser.close/context.close 

    //await context.close()

    console.log("afterAll")

    console.log("==============================")
});

BeforeStep(async function (scenario) {

    console.log("BeforeStep")
})

AfterStep(async function (scenario) {

    console.log("AfterStep")
})


Then('I verify playwright frames in hooks', async function () {

    await page.goto('https://the-internet.herokuapp.com/nested_frames')

    var allFramesCount = await page.frames()

    console.log("allFramesCount is :", allFramesCount.length) //allFramesCount is : 6

    //await page.framelocator/frame(xpath/url).locator().methods()

    //1st way

    var bottomText1stWay = await page.frameLocator('//*[@src="/frame_bottom"]').locator("//*[contains(text(),'BOTTOM')]").innerText()

    console.log("bottomText1stWay is :", bottomText1stWay) //BOTTOM

    //2nd way

    var bottomText = await page.frame({ url: 'https://the-internet.herokuapp.com/frame_bottom' })

    var bottomText2ndWay = await bottomText?.locator("//*[contains(text(),'BOTTOM')]").innerText()

   console.log("bottomText2ndWay is :", bottomText2ndWay) //BOTTOM

    /*allFramesCount is : 6
bottomText1stWay is : BOTTOM
bottomText2ndWay is : BOTTOM*/

    await page.goto('https://demo.automationtesting.in/Frames.html')

    allFramesCount = await page.frames()

    //console.log("allFramesCount is :", allFramesCount.length) //allFramesCount is : 11

    var singleFrame = await page.frame({ url: 'https://demo.automationtesting.in/SingleFrame.html' })

    await singleFrame?.locator('//*[@type="text"]').first().fill('Quality')

    //await page.waitForTimeout(3000)

    await page.getByText('Iframe with in an Iframe').click()

    //await page.waitForTimeout(3000)

    var multiFrame = await page.frame({ url: 'https://demo.automationtesting.in/MultipleFrames.html' })

    var allChildFramesCount = await multiFrame?.childFrames()

    //console.log("allChildFramesCount is :", allChildFramesCount?.length) //allChildFramesCount is : 1

    if (allChildFramesCount && allChildFramesCount.length > 0) {

        await allChildFramesCount[0].locator('//*[@type="text"]').last().fill('hi everyone good morning')
    }

    console.log("scenario frames executed")

})

Then('I launch the test automation practice application in hooks', async function () {

    await page.goto('https://testautomationpractice.blogspot.com/', { timeout: 10000 });

    console.log("  test automation practice")
});

Then('I launch the facebook application in hooks', async function () {

    await page.goto('https://www.facebook.com/', { timeout: 10000 });

    console.log("  facebook backgound keyword")
});