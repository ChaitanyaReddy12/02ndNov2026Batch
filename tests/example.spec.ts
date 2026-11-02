import { test, expect } from '@playwright/test';

// TDD -> test data driven

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test('maheswari', async ({ page }) => {

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

  console.log("scenario frames executed");
});
