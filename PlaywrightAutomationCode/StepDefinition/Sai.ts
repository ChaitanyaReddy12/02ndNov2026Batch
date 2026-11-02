import { Given, setDefaultTimeout, Then, When } from '@cucumber/cucumber'
import { Browser, chromium, expect, firefox, Page, webkit } from 'playwright/test';
import { TestData1, TestData2, TestData3 } from '../Files/TestData.json'
import 'dotenv/config';
import process from 'process';

let browser: Browser, page: Page

let context

let file1 = 'webelementlevel.png'

setDefaultTimeout(60 * 10000)

When('I launch the browser', async function () {

    browser = await chromium.launch({

        headless: false,

        args: ['--start-maximized']
    })

    context = await browser.newContext({

        viewport: null
    })

    page = await context.newPage()
});

When('I launch the firefox browser', async function () {

    browser = await firefox.launch({

        headless: false,

        args: ['--start-maximized']
    })

    context = await browser.newContext({

        viewport: null
    })

    page = await context.newPage()
});

When('I launch the safari browser', async function () {

    browser = await webkit.launch({

        headless: false,

        args: ['--start-maximized']
    })

    context = await browser.newContext({

        viewport: null
    })

    page = await context.newPage()
});

When('I launch the headless browser', async function () {

    browser = await chromium.launch({

        headless: true,

        args: ['--start-maximized']
    })

    context = await browser.newContext({

        viewport: null
    })

    page = await context.newPage()
});

Then('I launch the facebook application', async function () {

    await page.goto('https://www.facebook.com/')
});

Then('I close the browser', async function () {

    await page.close()
}); Then('I verify web calendar in dynamic way', async function () {

    await page.locator("//input[@id='datepicker']").scrollIntoViewIfNeeded();

    let datePicker = await page.locator("//input[@id='datepicker']")

    if (await datePicker.isVisible()) {

        console.log("datePicker is displayed on the webpage");

        await page.locator("//input[@id='datepicker']").click();

        let calendarTable = await page.locator(".ui-datepicker-calendar");

        if (await calendarTable.isVisible()) {

            console.log("calendarTable is displayed on the webpage");

            let rows = await page.locator("//table[@class='ui-datepicker-calendar']/tbody/tr").all();

            console.log(" rows count is :" + rows.length);

            if (rows.length > 0) {

                console.log("calendar have rows");

                for (let i = 1; i <= rows.length; i++) {

                    let columns = await page.locator("//table[@class='ui-datepicker-calendar']/tbody/tr[" + i + "]/td").all();

                    console.log(" columns count is :" + columns.length);

                    if (columns.length > 0) {

                        console.log("calendar have columns");

                        for (let j = 1; j <= columns.length; j++) {

                            let actualDate = await page.locator("//table[@class='ui-datepicker-calendar']/tbody/tr[" + i + "]/td[" + j + "]");

                            let actualDate1 = await page.locator("//table[@class='ui-datepicker-calendar']/tbody/tr[" + i + "]/td[" + j + "]").innerText();

                            let expectedDate = "30";

                            if (actualDate1 == expectedDate) {

                                console.log("date :" + actualDate1
                                    + " is displayed in the calendar row number " + i
                                    + " and column number is: " + j);

                                actualDate.click();
                            }
                        }

                    } else {

                        console.log("calendar doesn't have columns");
                    }
                }

            } else {

                console.log("calendar doesn't have rows");
            }
        }
        else {
            console.log("calendarTable is not displayed on the webpage");
        }
    }
    else {
        console.log("datePicker is not displayed on the webpage");
    }
});

Then('I launch the amazon application', async function () {

    await page.goto('https://www.amazon.in/')
});

Then('I launch the test automation practice application', async function () {

    await page.goto('https://testautomationpractice.blogspot.com/', { timeout: 5000 }) // 5000 means 5 sceonds

    await page.setDefaultNavigationTimeout(10000)
});

Then('I verify Playwright Locators', async function () {

    console.log("======get by place holder============")

    //syntax: Await page.getByPlaceholder(‘attribute value of the placeholder).methods()

    await page.getByPlaceholder('Enter Name').fill('Quality')

    await page.getByPlaceholder('Enter EMail').fill('test@gmail.com')

    console.log("======get by text============")

    //syntax: Await page.getByText(‘text of the web element').methods()

    await page.getByText('START').click()

    await page.getByText('STOP').click()

    console.log("======get by Role============")

    //syntax: Await page.getByRole('type of the web element',{name:text of the web element}).methods()

    await page.getByRole('button', { name: 'START' }).click()

    await page.getByRole('button', { name: 'STOP' }).click()

    await page.getByRole('checkbox', { name: 'Sunday' }).click()

    await page.getByRole('checkbox', { name: 'Tuesday' }).click()

    await page.getByRole('checkbox', { name: 'Friday' }).click()

    await page.getByRole('textbox', { name: 'phone' }).type('9090909090')

    await page.getByRole('radio', { name: 'Female' }).click()

});

Then('I verify Playwright Locators2', async function () {

    await page.goto('https://parabank.parasoft.com/parabank/index.htm')

    console.log("======get by alt text============")

    //syntax: Await page.getByAltText(‘attribute value of the alt).methods()

    await page.getByAltText('ParaBank').click()

    console.log("======get by Title============")

    //syntax: Await page.getByTitle(‘attribute value of the title’).methods()

    await page.getByTitle('ParaBank').click()

    console.log("======get by label============")

    await page.goto('https://login.salesforce.com/')

    //syntax: Await page.getByLabel(‘text of the label tag’).methods()

    await page.getByLabel('Username').fill('Morning')

    console.log("======get by test id============")

    //<button data-testid="submit-button">Submit</button>

    //syntax: Await page.getByTestId(‘attribute value of the test data-testid').methods()

    await page.getByTestId('submit-button').click()
});

Then('I verify Selenium Locators', async function () {

    console.log("======xpath============")

    console.log("======absolute xpath============")

    //await page.locator(‘absolute xpath’).methods()

    // locator.fill: Unexpected token "/" while parsing css selector "/html/body/div[4]/div[2]/div[2]/div[2]/div[2]/div[2]/div[2]/div/div[4]/div[1]/div/div/div[1]/div[1]/div/div/div/div/div[2]/div[1]/input[1]". Did you mean to CSS.escape it?

    //await page.locator('/html/body/div[4]/div[2]/div[2]/div[2]/div[2]/div[2]/div[2]/div/div[4]/div[1]/div/div/div[1]/div[1]/div/div/div/div/div[2]/div[1]/input[1]').fill('sai')

    console.log("======relative xpath============")

    //await page.locator(relative xpath’).methods()

    /*1st way:
//tagname[@attributename=’attributevalue’]
2nd way:
//*[@attributename=’attributevalue’]
*/
    await page.locator("//input[@placeholder='Enter Name']").fill('wednesday')

    await page.locator('//*[@id="email"]').fill('test@gmail.com')

    console.log("======css selector============")

    /*
    tagname[attributename='attribute value']

     *[attributename='attribute value']*/

    await page.locator('input[id="phone"]').fill('890909090')

    // id in css selector

    //await page.locator('# attribute value of the id').methods()

    await page.locator('#textarea').fill('hyderabda')

    // class in css selector

    //await page.locator('. attribute value of the class').methods()

    await page.locator('.wikipedia-search-input').fill('playwight')
})

Then('I verify selenium Xpath Methods', async function () {

    console.log("===========contains=========")

    await page.locator("//input[contains(@placeholder,'Enter Name')]").fill('Thursday')

    await page.locator("//*[contains(@placeholder,'EMail')]").fill('quality@gmail.com')

    console.log("===========starts-with=========")

    await page.locator("//*[starts-with(@id,'pho')]").fill('8908908900')

    await page.locator("//*[starts-with(@class,'wikipedia-search-input')]").fill('testing')

    console.log("===========text=========")

    var text = await page.locator("//*[text()='Alerts & Popups']").innerText()

    console.log("1st way of text is:", text) //Alerts & Popups

    text = await page.locator("//h2[text()='Alerts & Popups']").innerText()

    console.log("2nd way of text is:", text) //Alerts & Popups

    text = await page.locator("//h2[contains(text(),'Alerts & Popups')]").innerHTML()

    console.log("3rd way of text is:", text) //Alerts &amp; Popups

    text = await page.locator("//h2[starts-with(text(),'Alerts & Popups')]").innerHTML()

    console.log("4th way of text is:", text) //Alerts &amp; Popups

    console.log("===========and=========")

    await page.locator('//*[@type="text" and @id="field2"]').fill('hi everyone good morning')

    console.log("===========or=========")

    var orCount = await page.locator('//*[@type="text" or @id="email" or @placeholder="Enter EMail" ]').all()

    console.log("orCount is:", orCount.length) //orCount is : 13
})

Then('I verify selenium Xpath Axes', async function () {

    console.log("===========parent=========")

    var parentCount = await page.locator('//input[@id="female"]//parent::div').all()

    console.log("parentCount is:", parentCount.length) //parentCount is : 1

    console.log("===========ancestor=========")

    var ancestorCount = await page.locator('//input[@id="female"]//ancestor::div').all()

    console.log("ancestorCount is:", ancestorCount.length) //ancestorCount is : 21

    console.log("===========preceding=========")

    var precedingCount = await page.locator('//input[@id="female"]//preceding::div').all()

    console.log("precedingCount is:", precedingCount.length) //precedingCount is : 97

    precedingCount = await page.locator('//input[@id="female"]//preceding::label').all()

    console.log("precedingCount is:", precedingCount.length) //precedingCount is : 6

    precedingCount = await page.locator('//input[@id="female"]//preceding::input').all()

    console.log("precedingCount is:", precedingCount.length) //precedingCount is : 4

    console.log("===========child=========")

    var childCount = await page.locator('//*[@class="form-group"]//child::input[@type="text"]').all()

    console.log("childCount is:", childCount.length) //childCount is : 3

    await page.locator('//*[@class="form-group"]//child::input[@type="text"]').first().fill('first')

    await page.locator('//*[@class="form-group"]//child::input[@type="text"]').last().fill('last')

    await page.locator('//*[@class="form-group"]//child::input[@type="text"]').nth(1).fill('second')

    console.log("===========descendant=========")

    var descendantCount = await page.locator('//*[@class="form-group"]//descendant::input[@type="checkbox"]').all()

    console.log("descendantCount is:", descendantCount.length) //descendantCount is : 7

    await page.locator('//*[@class="form-group"]//descendant::input[@type="checkbox"]').first().click() // sunday

    await page.locator('//*[@class="form-group"]//descendant::input[@type="checkbox"]').last().click() // saturday

    await page.locator('//*[@class="form-group"]//descendant::input[@type="checkbox"]').nth(1).click() // monday

    await page.locator('//*[@class="form-group"]//descendant::input[@type="checkbox"]').nth(4).click() // Thursday

    console.log("===========following=========")

    var followingCount = await page.locator('//*[@class="form-group"]//following::input[@type="checkbox"]').all()

    console.log("followingCount is:", followingCount.length) //followingCount is : 7

    console.log("===========following sibling=========")

    var followingSiblingCount = await page.locator('//*[@id="field1"]//following-sibling::input').all()

    console.log("followingSiblingCount is:", followingSiblingCount.length) //followingSiblingCount is : 1

    followingSiblingCount = await page.locator('//*[@id="field1"]//following-sibling::br').all()

    console.log("followingSiblingCount is:", followingSiblingCount.length) //followingSiblingCount is : 3

    await page.locator('//*[@id="field1"]//following-sibling::input').fill('folowing sibling')
})

Then('I verify playwright methods', async function () {

    await page.goto("https://testautomationpractice.blogspot.com/")

    console.log("=====to refresh the web page====")

    await page.reload()

    console.log("=====to scroll to the web element====")

    await page.getByText('New Tab').scrollIntoViewIfNeeded()

    console.log("=====to click  the web element====")

    await page.getByText('New Tab').click()

    console.log("=====to go to the previous page/tab====")

    await page.bringToFront()

    console.log("=====to enter text to the text box====")

    await page.getByPlaceholder('Enter Name').fill('Quality')

    await page.getByPlaceholder('Enter EMail').type('test@gmail.com')

    console.log("===========to get more than one web element=========")

    var followingCount = await page.locator('//*[@class="form-group"]//following::input[@type="checkbox"]').all()

    console.log("followingCount is:", followingCount.length) //followingCount is : 7

    console.log("=====to get the title of the web page====")

    var title = await page.title()

    console.log("title is:", title)//Automation Testing Practice

    console.log("=====to get the url of the web page====")

    var url = await page.url()

    console.log("url is:", url)//https://testautomationpractice.blogspot.com/

    console.log("=====to clear text in the text box====")

    await page.locator('#field1').clear()

    await page.locator('#field1').fill('Quality')

    console.log("===========to get text of a web element=========")

    var text = await page.locator("//*[text()='Alerts & Popups']").innerText()

    console.log("1st way of text is:", text) //Alerts & Popups

    text = await page.locator("//h2[text()='Alerts & Popups']").innerText()

    console.log("2nd way of text is:", text) //Alerts & Popups

    text = await page.locator("//h2[contains(text(),'Alerts & Popups')]").innerHTML()

    console.log("3rd way of text is:", text) //Alerts &amp; Popups

    text = await page.locator("//h2[starts-with(text(),'Alerts & Popups')]").innerHTML()

    console.log("4th way of text is:", text) //Alerts &amp; Popups

    console.log("===========to right click on the web element=========")

    await page.locator(".wikipedia-search-input").scrollIntoViewIfNeeded()

    await page.locator(".wikipedia-search-input").click({ button: 'right' })

    console.log("===========to get text from one web element=========")

    console.log("===========1st way=========")

    var textOfAllWebElement = await page.locator('//*[@class="title"]').allInnerTexts()

    console.log("1st way of text is:", textOfAllWebElement.length)  //17

    for (let text of textOfAllWebElement) {

        console.log(text)
    }
    /*
3 =
'Dynamic Web Table'
4 =
'Pagination Web Table'
5 =
'Tabs'
6 =
'Dynamic Button'
7 =
'Alerts & Popups'
8 =
'Mouse Hover'
9 =
'Double Click'
10 =
'Drag and Drop'
11 =
'Slider'
12 =
'SVG Elements'
13 =
'Scrolling DropDown'
14 =
'Labels And Links'
15 =
'Form'
16 =
'ShadowDOM'*/

    console.log("===========2nd way=========")

    var textOfAllWebElement = await page.locator('//*[@class="title"]').allTextContents()

    console.log("2nd way of text is:", textOfAllWebElement.length)  //17

    for (let text of textOfAllWebElement) {

        console.log(text)
    }

    /*
3 =
'Dynamic Web Table'
4 =
'Pagination Web Table'
5 =
'Tabs'
6 =
'Dynamic Button'
7 =
'Alerts & Popups'
8 =
'Mouse Hover'
9 =
'Double Click'
10 =
'Drag and Drop'
11 =
'Slider'
12 =
'SVG Elements'
13 =
'Scrolling DropDown'
14 =
'Labels And Links'
15 =
'Form'
16 =
'ShadowDOM'*/

    console.log("===========drag and drop=========")

    let first = await page.locator('#draggable')

    let second = await page.locator('#droppable')

    await first.dragTo(second)

    console.log("===========selenium xpath and method=========")

    await page.locator('//*[@type="text" and @id="field2"]').fill('hi everyone good morning')

    console.log("===========playwright and method=========")

    await page.getByRole('textbox', { name: 'phone' }).and(page.getByPlaceholder('Enter Phone')).type('9090909090')

    await page.locator('.wikipedia-search-input').and(page.locator('#Wikipedia1_wikipedia-search-input')).type('playwright')

    await page.getByRole('checkbox', { name: 'Sunday' }).and(page.locator('#sunday')).click()

    console.log("===========to double click on the web element=========")

    await page.getByText('START').scrollIntoViewIfNeeded()

    await page.getByText('START').dblclick()

    console.log("===========to highlight the web element=========")

    await page.locator('#textarea').highlight()

    await page.locator('#textarea').fill('bangalore')

    console.log("===========get attribute=========")

    var attributevalue = await page.locator('#textarea').getAttribute('id')

    console.log('attributevalue of id is :', attributevalue) //textarea

    attributevalue = await page.locator('#textarea').getAttribute('class')

    console.log('attributevalue of class is :', attributevalue) //form-control

    console.log("=======hover to the web elemnt=======")

    await page.goto('https://www.myntra.com/')

    await page.locator("//*[text()='Women']").first().hover()

})

Then('I verify playwright methods2', async function () {

    await page.goto("https://testautomationpractice.blogspot.com/")

    console.log("=====visible====")

    var visible = await page.locator('#female').isVisible()

    if (visible == true) {

        await page.locator('#female').click()
    }

    console.log("=====hidden====")

    var hidden = await page.locator('#sunday').isHidden()

    if (hidden == false) {

        await page.locator('#sunday').click()
    }

    console.log("=====disabled====")

    var disabled = await page.locator('#monday').isDisabled()

    if (disabled == false) {

        await page.locator('#monday').click()
    }

    console.log("=====enabled====")

    var enabled = await page.locator('#tuesday').isEnabled()

    if (enabled == true) {

        await page.locator('#tuesday').click()
    }

    console.log("=====editable====")

    var editable = await page.locator('#textarea').isEditable()

    if (editable == true) {

        await page.locator('#textarea').fill('Quality Thought')
    }

    console.log("=====checked====")

    var checked = await page.locator('#saturday').isChecked()

    if (checked == false) {

        //1st way

        // await page.locator('#saturday').click()

        //2nd way

        await page.locator('#saturday').setChecked(true)
    }

    checked = await page.locator('#saturday').isChecked()

    if (checked == true) {

        //1st way

        // await page.locator('#saturday').click()

        //2nd way

        // await page.locator('#saturday').setChecked(false)

        //3rd way

        await page.locator('#saturday').uncheck()
    }

})

Then('I verify playwright methods3', async function () {

    await page.goto("https://testautomationpractice.blogspot.com/")

    console.log("=====1st way to enter the text into the text box ====")

    await page.locator('//*[@id="field1"]').scrollIntoViewIfNeeded()

    await page.locator('//*[@id="field1"]').clear()

    await page.locator('//*[@id="field1"]').fill('quality')

    console.log("=====2nd way to enter the text into the text box ====")

    await page.locator('//*[@id="field1"]').fill("")

    await page.locator('//*[@id="field1"]').type('playwright')

    console.log("=====3rd way to enter the text into the text box ====")

    await page.locator('//*[@id="field1"]').press('Control+A')

    await page.keyboard.press('Delete')

    await page.keyboard.up('Control')

    await page.keyboard.insertText('Wednedsay')

    console.log("=====4th way to enter the text into the text box ====")

    await page.locator('//*[@id="field1"]').clear()

    await page.locator('//*[@id="field1"]').pressSequentially('Quality')

    await page.locator('//*[@id="field1"]').pressSequentially('Thought')

    console.log("=====dropdown====")

    var colorsDropdown = await page.locator('#colors')

    await colorsDropdown.scrollIntoViewIfNeeded()

    await colorsDropdown.selectOption('Red')

    await colorsDropdown.selectOption('Green')

    await colorsDropdown.selectOption('Yellow')

    await colorsDropdown.selectOption(['Red', 'Blue', 'Green'])

    await colorsDropdown.selectOption({ index: 3 }) // yellow

    await colorsDropdown.selectOption({ index: 0 }) // Red

    await colorsDropdown.selectOption([{ index: 0 }, { index: 1 }, { index: 3 }]) // Red, blue, yellow

    var countryDropdown = await page.locator('#country')

    await countryDropdown.scrollIntoViewIfNeeded()

    await countryDropdown.selectOption('India') // India

    console.log("=====screenshots====")

    console.log("======1st way to take web element level screenshot============")

    await page.getByPlaceholder('Enter Name').fill('Quality')

    await page.getByPlaceholder('Enter Name').screenshot({ path: 'webelementlevel.png' })

    console.log("======2nd way to take upto screen length screenshot============")

    await page.screenshot({ path: './PlaywrightAutomationCode/Screenshots/uptoscreenlength.jpg' })

    console.log("======3rd way to take complete web page e2e screenshot============")

    await page.screenshot({ path: './PlaywrightAutomationCode/Screenshots/fullpage.png', fullPage: true })

    console.log("=====upload file====")

    console.log("======single file upload============")

    await page.locator('#singleFileInput').scrollIntoViewIfNeeded()

    await page.locator('#singleFileInput').setInputFiles('webelementlevel.png')

    await page.locator("//*[text()='Upload Single File']").click()

    console.log("======Multi file upload============")

    await page.locator('#multipleFilesInput').setInputFiles([file1, './PlaywrightAutomationCode/Screenshots/uptoscreenlength.jpg',
        "C:\\Users\\Punna\\OneDrive\\Desktop\\Automation_Playwright\\2026\\Quality Thought\\7am batch\\Typescript_Javascript\\Playwright\\6th Class_Playwright methods_Dates_ShadowDom_CrossBrowserTesting_Part2\\6th Class.docx"
    ])

    await page.locator("//*[text()='Upload Multiple Files']").click()
})

Then('I verify playwright shadow DOM', async function () {

    await page.goto('https://selectorshub.com/xpath-practice-page/')

    //handling shandow DOM means parent shadow DOM

    await page.locator('#userName').locator('#kils').scrollIntoViewIfNeeded()

    await page.locator('#userName').locator('#kils').fill('Quality')

    await page.locator('#userName').locator('#kils').screenshot({ path: 'shadowdom.png' })

    //handling shandow DOM contains child shadow dom

    await page.locator('#userName').locator('#app2').locator('#pizza').fill('Testing')
})

Then('Generate Dates', async function () {

    const todaysDate = new Date()

    console.log('todaysDate is :', todaysDate) //Wed Oct 21 2026 07:42:55 GMT+0530 (India Standard Time)

    const todaysDateInIst = todaysDate.toLocaleDateString()

    console.log('todaysDateInIst is :', todaysDateInIst)  //21/10/2026

    const pastDate = new Date(todaysDate)

    pastDate.setDate(pastDate.getDate() - 12)

    const pastDateInIst = pastDate.toLocaleDateString()

    console.log('pastDateInIst is :', pastDateInIst)  //9/10/2026

    const futureDate = new Date(todaysDate)

    futureDate.setDate(futureDate.getDate() + 123)

    const futureDateInIst = futureDate.toLocaleDateString()

    console.log('futureDateInIst is :', futureDateInIst)  //21/2/2027

    const year = todaysDate.getFullYear()

    const month = todaysDate.getMonth() + 1

    const date = todaysDate.getDate()

    var da = year + '-' + date + '-' + month

    console.log('da is :', da)  //2026-21-10

    da = month + '/' + year + '/' + date

    console.log('da is :', da)  //10/2026/21

    const completeMonth = todaysDate.toLocaleDateString('en-us', { month: 'long' })

    console.log('completeMonth is: ', completeMonth)  //October

    const shortMonth = todaysDate.toLocaleDateString('en-us', { month: 'short' })

    console.log('shortMonth is: ', shortMonth)  //Oct
})

Then('I verify web table in static way', async function () {

    let webTable = await page.locator('//*[@name="BookTable"]').isVisible()

    if (webTable == true) {

        await page.locator('//*[@name="BookTable"]').scrollIntoViewIfNeeded()

        console.log("webTable is displayed in the web page") //webTable is displayed in the web page

        let expectedText = 'Animesh'

        let actualText = await page.locator('//*[@name="BookTable"]//tr[4]/td[2]').innerText()

        if (expectedText == actualText) {

            console.log(expectedText, 'is displayed in the web table') // Animesh is displayed in the web table
        }
        else {

            console.log(expectedText, 'is not displayed in the web table')
        }
    }
    else {

        console.log("webTable is not displayed in the web page")
    }
})

Then('I verify web table in static way2', async function () {

    let webTable = await page.locator('//*[@name="BookTable"]').isVisible()

    if (webTable == true) {

        await page.locator('//*[@name="BookTable"]').scrollIntoViewIfNeeded()

        console.log("webTable is displayed in the web page") //webTable is displayed in the web page

        let expectedText = 'JAVA'

        let actualText = await page.locator('//*[@name="BookTable"]//tr[4]/td[2]').innerText()

        if (expectedText == actualText) {

            console.log(expectedText, 'is displayed in the web table')
        }
        else {

            console.log(expectedText, 'is not displayed in the web table') //Java is not displayed in the web table
        }
    }
    else {

        console.log("webTable is not displayed in the web page")
    }
})

Then('I verify web table in dynamic way', async function () {

    let webTable = await page.locator('//*[@name="BookTable"]').isVisible()

    if (webTable == true) {

        await page.locator('//*[@name="BookTable"]').scrollIntoViewIfNeeded()

        console.log("webTable is displayed in the web page") //webTable is displayed in the web page

        let rows = await page.locator('//*[@name="BookTable"]//tr').all()

        for (let i = 2; i <= rows.length; i++) {

            let columns = await page.locator("//*[@name='BookTable']//tr[" + i + "]//td").all()

            for (let j = 1; j <= columns.length; j++) {

                // let expectedText = 'JAVA'

                // let actualText = await page.locator("//*[@name='BookTable']//tr[" + i + "]//td[" + j + "]").innerText()

                // if (expectedText == actualText) {

                //     console.log(expectedText, 'is displayed in the web table on row no: ', i, " and column number is: ", j)

                //     // JAVA is displayed in the web table on row no: 6 and column number is: 3
                // }

                let expectedText = 'Mukesh'

                let actualText = await page.locator("//*[@name='BookTable']//tr[" + i + "]//td[" + j + "]").innerText()

                if (expectedText == actualText) {

                    console.log(expectedText, 'is displayed in the web table on row no: ', i, " and column number is: ", j)

                    // Mukesh is displayed in the web table on row no: 3 and column number is: 2

                    // Mukesh is displayed in the web table on row no: 5 and column number is: 2
                }
            }

        }
    }
    else {

        console.log("webTable is not displayed in the web page")
    }
})

Then('I verify web table headers in dynamic way', async function () {

    let webTable = await page.locator('//*[@name="BookTable"]').isVisible()

    if (webTable == true) {

        await page.locator('//*[@name="BookTable"]').scrollIntoViewIfNeeded()

        console.log("webTable is displayed in the web page") //webTable is displayed in the web page

        let rows = await page.locator('//*[@name="BookTable"]//tr').all()

        for (let i = 1; i <= rows.length; i++) {

            if (i == 1) {

                let columns = await page.locator("//*[@name='BookTable']//tr[" + i + "]//th").all()

                for (let j = 1; j <= columns.length; j++) {

                    let headerText = await page.locator("//*[@name='BookTable']//tr[" + i + "]//th[" + j + "]").innerText()

                    console.log("headerText  in column no:", j, " is :", headerText)

                    //BookName	Author	Subject	Price
                }
            }
        }
    }
    else {

        console.log("webTable is not displayed in the web page")
    }
})

Then('I verify web calendar in static way', async function () {

    await page.locator('#datepicker').scrollIntoViewIfNeeded()

    await page.locator('#datepicker').click()

    let webCalendar = await page.locator('//*[@class="ui-datepicker-calendar"]').isVisible()

    if (webCalendar == true) {

        console.log("web Calendar is displayed in the web page") //web Calendar is displayed in the web page

        let expectedDate = '14'

        let actualDate = await page.locator('//*[@class="ui-datepicker-calendar"]//tr[3]//td[4]').innerText()

        if (expectedDate == actualDate) {

            console.log(expectedDate, 'is displayed in the web Calendar') // 14 is displayed in the web Calendar

            await page.locator('//*[@class="ui-datepicker-calendar"]//tr[3]//td[4]').click()
        }
        else {

            console.log(expectedDate, 'is not displayed in the web Calendar')
        }
    }
    else {

        console.log("web Calendar is not displayed in the web page")
    }
})

Then('I verify web calendar in static way2', async function () {

    await page.locator('#datepicker').scrollIntoViewIfNeeded()

    await page.locator('#datepicker').click()

    let webCalendar = await page.locator('//*[@class="ui-datepicker-calendar"]').isVisible()

    if (webCalendar == true) {

        console.log("web Calendar is displayed in the web page") //web Calendar is displayed in the web page

        let expectedDate = '16'

        let actualDate = await page.locator('//*[@class="ui-datepicker-calendar"]//tr[3]//td[4]').innerText()

        if (expectedDate == actualDate) {

            console.log(expectedDate, 'is displayed in the web Calendar')

            await page.locator('//*[@class="ui-datepicker-calendar"]//tr[3]//td[4]').click()
        }
        else {

            console.log(expectedDate, 'is not displayed in the web Calendar') //16 is displayed in the web Calendar
        }
    }
    else {

        console.log("web Calendar is not displayed in the web page")
    }
})

/*Date Picker 1 , Date Picker 2 is the classwork*/

Then('I verify playwright hard assertions', async function () {

    await page.goto('https://www.amazon.in/')

    //await expect(page.playwright/selenium locator()).methods()

    await expect(page.getByPlaceholder('Search Amazon.in')).toBeTruthy()

    await page.getByPlaceholder('Search Amazon.in').fill('mobiles')

    await expect(page.locator('#nav-search-submit-button')).toBeVisible()

    await page.locator('#nav-search-submit-button').click()

    //await expect(page.locator("//*[text()='Coupons']")).toBeDisabled()

    /* Expected: disabled
           Received: enabled
           Timeout:  5000ms*/

    //await expect(page.locator("//*[text()='Bestsellers']").last()).toBeHidden()

    /*Expected: hidden
           Received: visible*/

    await expect(page.locator("//*[text()='Bestsellers']")).toBeAttached()

    await expect(page.locator("//*[text()='Bestsellers']")).toHaveCount(1)

    await page.locator("//*[text()='Bestsellers']").click()

    await page.goto('https://testautomationpractice.blogspot.com/')

    await expect(page.locator('//*[@class="title"]')).toHaveCount(17)

    await expect(page.locator('//*[@class="title"]')).toContainText(['Dynamic Button'])

    await expect(page.locator('//*[@class="title"]')).toContainText(['Upload Files'])

    await expect(page.locator('//*[@class="title"]')).toContainText(['Upload Files', 'Static Web Table'])

    await expect(page.getByPlaceholder('Enter Name')).toHaveAttribute('class')

    await expect(page.getByPlaceholder('Enter Name')).toHaveAttribute('placeholder')

    await expect(page.getByPlaceholder('Enter Name')).toHaveAttribute('id', 'name')

    await expect(page.getByPlaceholder('Enter Name')).toHaveClass('form-control')

    await expect(page.getByPlaceholder('Enter Name')).toHaveId('name')

    await expect(page.getByPlaceholder('Enter Name')).toBeVisible()

    await expect(page.getByPlaceholder('Enter Name')).toBeEmpty()

    await page.getByPlaceholder('Enter Name').fill('hard assertion')

    await expect(page.getByPlaceholder('Enter EMail')).toBeEnabled()

    await page.getByPlaceholder('Enter EMail').fill('hardassertion@gmail.com')

    await page.waitForTimeout(5000)

})

Then('I verify playwright soft assertions', async function () {

    await page.goto('https://www.amazon.in/')

    //await expect.soft(page.playwright/selenium locator()).methods()

    await expect.soft(page.getByPlaceholder('Search Amazon.in')).toBeTruthy()

    await page.getByPlaceholder('Search Amazon.in').fill('mobiles')

    await expect.soft(page.locator('#nav-search-submit-button')).toBeVisible()

    await page.locator('#nav-search-submit-button').click()

    //await expect.soft(page.locator("//*[text()='Coupons']")).toBeDisabled()

    /* Expected: disabled
           Received: enabled
           Timeout:  5000ms*/

    //await expect.soft(page.locator("//*[text()='Bestsellers']").last()).toBeHidden()

    /*Expected: hidden
           Received: visible*/

    await expect.soft(page.locator("//*[text()='Bestsellers']")).toBeAttached()

    await expect.soft(page.locator("//*[text()='Bestsellers']")).toHaveCount(1)

    await page.locator("//*[text()='Bestsellers']").click()

    await page.goto('https://testautomationpractice.blogspot.com/')

    await expect.soft(page.locator('//*[@class="title"]')).toHaveCount(17)

    await expect.soft(page.locator('//*[@class="title"]')).toContainText(['Dynamic Button'])

    await expect.soft(page.locator('//*[@class="title"]')).toContainText(['Upload Files'])

    await expect.soft(page.locator('//*[@class="title"]')).toContainText(['Upload Files', 'Static Web Table'])

    await expect.soft(page.getByPlaceholder('Enter Name')).toHaveAttribute('class')

    await expect.soft(page.getByPlaceholder('Enter Name')).toHaveAttribute('placeholder')

    await expect.soft(page.getByPlaceholder('Enter Name')).toHaveAttribute('id', 'name')

    await expect.soft(page.getByPlaceholder('Enter Name')).toHaveClass('form-control')

    await expect.soft(page.getByPlaceholder('Enter Name')).toHaveId('name')

    await expect.soft(page.getByPlaceholder('Enter Name')).toBeVisible()

    await expect.soft(page.getByPlaceholder('Enter Name')).toBeEmpty()

    await page.getByPlaceholder('Enter Name').fill('soft assertion')

    await expect.soft(page.getByPlaceholder('Enter EMail')).toBeEnabled()

    await page.getByPlaceholder('Enter EMail').fill('softassertion@gmail.com')

    await page.waitForTimeout(5000)
})

Then('I verify reading testdata1 from the json file', async function () {

    await page.getByPlaceholder('Enter Name').fill(TestData1.Name)

    await page.getByPlaceholder('Enter EMail').fill(TestData1.Email)

    await page.getByRole('textbox', { name: 'phone' }).pressSequentially(TestData1.Phone)

    await page.locator('#textarea').fill(TestData1.Address)

    await page.locator('.wikipedia-search-input').fill(TestData1.Wikipedia)
})

Then('I verify reading testdata2 from the json file', async function () {

    await page.getByPlaceholder('Enter Name').fill(TestData2.Name)

    await page.getByPlaceholder('Enter EMail').fill(TestData2.Email)

    await page.getByRole('textbox', { name: 'phone' }).pressSequentially(TestData2.Phone)

    await page.locator('#textarea').fill(TestData2.Address)

    await page.locator('.wikipedia-search-input').fill(TestData2.Wikipedia)
})

Then('I verify reading testdata3 from the json file', async function () {

    await page.getByPlaceholder('Enter Name').fill(TestData3.Name)

    await page.getByPlaceholder('Enter EMail').fill(TestData3.Email)

    await page.getByRole('textbox', { name: 'phone' }).pressSequentially(TestData3.Phone)

    await page.locator('#textarea').fill(TestData3.Address)

    await page.locator('.wikipedia-search-input').fill(TestData3.Wikipedia)
})

Then('I verify playwright filters', async function () {

    await page.goto('https://www.saucedemo.com/')

    await page.getByPlaceholder('Username').fill('standard_user')

    await page.getByPlaceholder('Password').fill('secret_sauce')

    await page.locator('#login-button').click()

    await page.locator('.inventory_item').filter({ hasText: 'Sauce Labs Backpack' })
        .getByRole('button', { name: 'Add to cart' }).click()

    await page.locator('.inventory_item').filter({ hasText: 'Sauce Labs Fleece Jacket' })
        .getByRole('button', { name: 'Add to cart' }).click()

    await page.locator('.inventory_item').filter({ hasText: 'Sauce Labs Onesie' })
        .getByRole('button', { name: 'Add to cart' }).click()

    await page.locator('.inventory_item').filter({ hasText: 'Sauce Labs Backpack' })
        .getByRole('button', { name: 'remove' }).click()

    await page.locator('.inventory_item').filter({ hasText: 'Sauce Labs Fleece Jacket' })
        .getByRole('button', { name: 'remove' }).click()

    await page.locator('.inventory_item').filter({ hasText: 'Sauce Labs Onesie' })
        .getByRole('button', { name: 'remove' }).click()

    await page.goto('https://testautomationpractice.blogspot.com/')

    await page.locator('.form-check.form-check-inline').filter({ hasText: 'Sunday' }).click()

    await page.locator('.form-check.form-check-inline').filter({ hasText: 'Monday' }).click()

    await page.locator('.form-check.form-check-inline').filter({ hasText: 'Fri' }).click()

    await page.locator('.form-check.form-check-inline').filter({ hasText: 'male' }).last().click()

})

Then('I verify simple alert', async function () {

    await page.goto('https://the-internet.herokuapp.com/javascript_alerts')

    await page.on('dialog', (dialog) => {

        var dialogText = dialog.message()

        console.log(dialogText) //I am a JS Alert

        var dialogType = dialog.type()

        console.log(dialogType) // alert

        dialog.accept()
    })

    await page.getByText('Click for JS Alert').click()
})

Then('I verify confirmation alert ok', async function () {

    await page.goto('https://the-internet.herokuapp.com/javascript_alerts')

    await page.on('dialog', (dialog) => {

        var dialogText = dialog.message()

        console.log(dialogText) //I am a JS Confirm

        var dialogType = dialog.type()

        console.log(dialogType) // confirm

        dialog.accept()
    })

    await page.getByText('Click for JS Confirm').click()
})

Then('I verify confirmation alert cancel', async function () {

    await page.goto('https://the-internet.herokuapp.com/javascript_alerts')

    await page.on('dialog', (dialog) => {

        var dialogText = dialog.message()

        console.log(dialogText) //I am a JS Confirm

        var dialogType = dialog.type()

        console.log(dialogType) // confirm

        dialog.dismiss()
    })

    await page.getByText('Click for JS Confirm').click()
})

Then('I verify prompt alert ok without text', async function () {

    await page.goto('https://the-internet.herokuapp.com/javascript_alerts')

    await page.on('dialog', (dialog) => {

        var dialogText = dialog.message()

        console.log(dialogText) //I am a JS prompt

        var dialogType = dialog.type()

        console.log(dialogType) //prompt

        dialog.accept()
    })

    await page.getByText('Click for JS Prompt').click()
})

Then('I verify prompt alert ok with text', async function () {

    await page.goto('https://the-internet.herokuapp.com/javascript_alerts')

    await page.on('dialog', (dialog) => {

        var dialogText = dialog.message()

        console.log(dialogText) //I am a JS prompt

        var dialogType = dialog.type()

        console.log(dialogType) //prompt

        dialog.accept("hi qt team")
    })

    await page.getByText('Click for JS Prompt').click()
})

Then('I verify prompt alert cancel', async function () {

    await page.goto('https://the-internet.herokuapp.com/javascript_alerts')

    await page.on('dialog', (dialog) => {

        var dialogText = dialog.message()

        console.log(dialogText) //I am a JS prompt

        var dialogType = dialog.type()

        console.log(dialogType) //prompt

        dialog.dismiss()
    })

    await page.getByText('Click for JS Prompt').click()
})

Then('I verify playwright tooltip', async function () {

    await page.goto('https://practice.expandtesting.com/tooltips')

    var toolTipText = await page.locator('#btn1').getAttribute('title')

    console.log('toolTip Text of top is:', toolTipText) //Tooltip on top

    toolTipText = await page.locator('#btn2').getAttribute('title')

    console.log('toolTip Text of end is:', toolTipText) //Tooltip on end

    toolTipText = await page.locator('#btn3').getAttribute('title')

    console.log('toolTip Text of bottom is:', toolTipText) //Tooltip on bottom

    toolTipText = await page.locator('#btn4').getAttribute('title')

    console.log('toolTip Text of start is:', toolTipText) //Tooltip on start

    toolTipText = await page.locator('#btn5').getAttribute('title')

    console.log('toolTip Text of HTML is:', toolTipText) //Tooltip with HTML
})

Then('I verify playwright frames', async function () {

    await page.goto('https://the-internet.herokuapp.com/nested_frames')

    let allFramesCount = await page.frames()

    console.log('allFramesCount is:', allFramesCount.length) //allFramesCount is: 6

    //await page.frame/framelocator().playwright/sleeniumlocator().methods()

    //1st way

    var bottomFrame1stway = await page.frameLocator('//*[@src="/frame_bottom"]').locator("//*[contains(text(),'BOTTOM')]").innerText()

    console.log('bottomFrame1stway is:', bottomFrame1stway) //bottomFrame1stway is: BOTTOM

    //2nd way

    var bottomFrame2ndway = await page.frame({ url: 'https://the-internet.herokuapp.com/frame_bottom' })

    var bottomFrame2ndwayText = await bottomFrame2ndway?.locator("//*[contains(text(),'BOTTOM')]").innerText()

    console.log('bottomFrame2ndwayText is:', bottomFrame2ndwayText) //bottomFrame2ndwayText is: BOTTOM

    await page.goto('https://demo.automationtesting.in/Frames.html')

    allFramesCount = await page.frames()

    console.log('allFramesCount is:', allFramesCount.length) //allFramesCount is: 20

    await page.frameLocator('#singleframe').locator('//*[@type="text"]').first().fill('Quality')

    await page.waitForTimeout(10000)

    await page.getByText('Iframe with in an Iframe').click()

    let multiFrame = await page.frame({ url: 'https://demo.automationtesting.in/MultipleFrames.html' })

    var allChildFramesCount = await multiFrame?.childFrames()

    console.log('allChildFramesCount is:', allChildFramesCount?.length) //allChildFramesCount is: 1

    if (allChildFramesCount && allChildFramesCount.length > 0) {

        await allChildFramesCount[0].locator('//*[@type="text"]').last().fill('hi everyone good morning')
    }

    await page.waitForTimeout(20000)

})

Then('I verify reading testdata for test automation practice application {string},{string},{string},{string},{string}',
    async function (name, email, phone, address, wikipedia) {

        await page.getByPlaceholder('Enter Name').fill(name)

        await page.getByPlaceholder('Enter EMail').fill(email)

        await page.getByRole('textbox', { name: 'phone' }).pressSequentially(phone)

        await page.locator('#textarea').fill(address)

        await page.locator('.wikipedia-search-input').fill(wikipedia)

    })

Then('I verify reading testdata for orangeHRM {string},{string},{string}', async function (url, username, password) {

    await page.goto(url)

    await page.getByPlaceholder('Username').fill(username)

    await page.getByPlaceholder('Password').fill(password)

    await page.locator('//*[@type="submit"]').click()
})

Then('I verify reading testdata for orangeHRM', async function () {

    await page.goto(process.env.url as string)

    await page.getByPlaceholder('Username').fill(process.env.username_OrangeHRM as string)

    await page.getByPlaceholder('Password').fill(process.env.password_OrangeHRM as string)

    await page.locator('//*[@type="submit"]').click()
})

Then('I verify playwright Waits', async function () {

    console.log("==========wait for url=======")

    await page.goto('https://www.facebook.com/')

    //syntax: await page.waitForURL(‘url’)

    await page.waitForURL('https://www.facebook.com/')

    console.log("==========wait for timeout=======")

    //await page.waitForTimeout(8000) // 8000 means 8000 milliseconds means 8 seconds

    await page.waitForTimeout(1000)

    await page.locator('//*[@name="email"]').fill('Quality')

    await page.waitForTimeout(800)

    await page.locator('//*[@name="pass"]').fill('test@gmail.com')

    console.log("==========wait for selector=======")

    /*syntax:
1st way:
Await page.waitForSelector(webelement)
2nd way
Await page.waitForSelector(webelement,{timeout:8000}) // 8000 means 8000 milliseconds mean 8 seconds
*/

    await page.goto(process.env.url as string)

    //1st way:

    await page.waitForSelector('//*[@name="username"]')

    await page.getByPlaceholder('Username').fill(process.env.username_OrangeHRM as string)

    //2nd way:

    await page.waitForSelector('//*[@name="password"]', { timeout: 20000 }) //20 seconds

    await page.getByPlaceholder('Password').fill(process.env.password_OrangeHRM as string)

    console.log("==========wait for load state=======")

    //Await page.waitForLoadState()

    //1st way

    await page.waitForLoadState()

    await page.locator('//*[@type="submit"]').click()

    //2nd way

    await page.waitForLoadState('domcontentloaded') // html,css is loading

    await page.getByText('Admin').click()

    //3rd way

    await page.waitForLoadState('domcontentloaded', { timeout: 10000 }) // html,css is loading and wait for 10 seconds

    await page.getByText('PIM').click()

    //4th way

    await page.waitForLoadState('load') // html,css and images is loading 

    await page.getByText('Leave').click()

    //5th way

    await page.waitForLoadState('load', { timeout: 10000 }) // html,css and images is loading and wait for 10 seconds

    await page.getByText('Time').click()

    //6th way

    await page.waitForLoadState('networkidle') // html,css is loading and network issues like 404, 500 issues like that

    await page.getByText('Recruitment').click()

    //6th way

    await page.waitForLoadState('networkidle', { timeout: 10000 }) // html,css is loading and network issues like 404, 500 issues like that and wait for 10 seconds

    await page.getByText('My Info').click()

})

Then('verify playwright windows handling', async function () {

    browser = await chromium.launch({

        headless: false,

        args: ['--start-maximized']
    })

    context = await browser.newContext({

        viewport: null
    })

    let page1 = await context.newPage()

    let page2 = await context.newPage()

    let page3 = await context.newPage()

    var allPagesCount = await context.pages()

    console.log("allPagesCount is:", allPagesCount.length) //allPagesCount is: 3

    await page1.goto('https://testautomationpractice.blogspot.com/')

    await expect(page1).toHaveTitle('Automation Testing Practice')

    await page2.goto('https://login.salesforce.com/')

    await expect(page2).toHaveTitle('Login | Salesforce')

    await page3.goto(process.env.url as string)

    await expect(page3).toHaveTitle('OrangeHRM')

    await page3.getByPlaceholder('Username').fill(process.env.username_OrangeHRM as string)

    await page3.getByPlaceholder('Password').fill(process.env.password_OrangeHRM as string)

    await page3.locator('//*[@type="submit"]').click()

    console.log("======switch to the first tab=====")

    await allPagesCount[0].bringToFront()

    await page1.getByText('New Tab').scrollIntoViewIfNeeded()

    await page1.getByText('New Tab').click()

    await page1.waitForTimeout(5000)

    allPagesCount = await context.pages()

    console.log("allPagesCount is:", allPagesCount.length) //allPagesCount is: 4

    console.log("======close the 4th tab=====")

    await allPagesCount[3].close()

    await page1.waitForTimeout(5000)

    allPagesCount = await context.pages()

    console.log("allPagesCount is:", allPagesCount.length) //allPagesCount is: 3

    console.log("======switch to the second tab=====")

    await allPagesCount[1].bringToFront()

    await page2.getByLabel('Username').fill('Morning')

    await page2.waitForTimeout(5000)

    console.log("======switch to the first tab=====")

    await allPagesCount[0].bringToFront()

    var pagePopup = page1.waitForEvent('popup')

    await page1.getByText('Popup Windows').scrollIntoViewIfNeeded()

    await page1.waitForTimeout(5000)

    await page1.getByText('Popup Windows').click()

    await page1.waitForTimeout(5000)

    var popupPage = await pagePopup

    console.log(popupPage.title())

    console.log(popupPage.url())

    allPagesCount = await context.pages()

    console.log("allPagesCount is:", allPagesCount.length) //allPagesCount is: 5

    console.log("======close the 5th tab=====")

    await allPagesCount[4].close()

    await page1.waitForTimeout(5000)

    allPagesCount = await context.pages()

    console.log("allPagesCount is:", allPagesCount.length) //allPagesCount is: 4

    console.log("======close the complete browser====")

    await context.close()
})