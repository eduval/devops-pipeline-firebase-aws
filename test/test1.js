const { By, Key, Builder, until } = require("selenium-webdriver");
// Import essential Selenium WebDriver components:
// - By: to locate elements
// - Key: for keyboard interactions
// - Builder: to configure and build the WebDriver instance
// - until: for explicit waits (like waiting for elements to appear)

const chrome = require("selenium-webdriver/chrome");
// Import Chrome-specific options and tools for Selenium

async function test_case() {
    // Define an asynchronous function to run the test (because WebDriver uses promises)

    let options = new chrome.Options();
    // Create Chrome options to customize browser behavior (like headless mode)

    options.addArguments('headless');
    // Run Chrome in headless mode (no GUI, useful for CI/CD and remote testing)

    options.addArguments('disable-gpu');
    // Disable GPU hardware acceleration (recommended for stability in headless mode)

    options.setChromeBinaryPath('/usr/bin/google-chrome');
    // Explicitly set the path to the Chrome binary (helpful in custom or Linux environments)

    let driver = await new Builder().forBrowser("chrome").setChromeOptions(options).build();
    // Build and launch a new Chrome WebDriver instance using the defined options

    try {
        await driver.get("https://devops-assignmet-8-production.web.app/");
        // Navigate to the specified web app URL
        await driver.findElement(By.id("lastname")).click();
        // Click the input field with ID 'lastname' (to focus or activate it)

        await driver.findElement(By.id("lastname")).sendKeys("valencia");
        // Type 'valencia' into the 'lastname' input field

        await driver.findElement(By.id("firstname")).click();
        // Click the input field with ID 'firstname'

        await driver.findElement(By.id("firstname")).sendKeys("washington");
        // Type 'washington' into the 'firstname' field
        await driver.findElement(By.css("td > p:nth-child(4)")).click();
        // Click a specific paragraph element inside a table cell (potentially a UI button or trigger)

        await driver.findElement(By.id("GroupSize")).sendKeys("10");
        // Enter '10' into the 'GroupSize' field (possibly how many members to generate)

        await driver.findElement(By.id("addMemberBtn")).click();
        // Click the button that adds members based on the entered data

        await driver.wait(until.elementsLocated(By.xpath("//select[@id='members']//option")), 20000);
        // Wait up to 20 seconds until <option> elements inside the <select id="members"> are available

        let optionsList = await driver.findElements(By.xpath("//select[@id='members']//option"));
        // Retrieve all <option> elements inside the dropdown (to check if members were added)

        if (optionsList.length == 0) {
            console.log('Test Success');
        } else {
            console.log('Test Failed');
        }
        // This logic looks reversed:
        // If no options were added, it says "Success", but it should probably be the opposite:
        // **optionsList.length > 0** would mean members were successfully added


    } catch (error) {
        console.log('An error occurred:', error);
        // Log any errors that occur during the test execution
    } finally {
        await driver.quit();
        // Close the browser and clean up resources, no matter what
    }
}

test_case();
// Call the test function to execute the automation
