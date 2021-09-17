
/*
const puppeteer = require('puppeteer');

(async () =>{
    const browser = await puppeteer.launch({headless: false}); 
    const page = await browser.newPage(); 
    await page.goto("https://ciudaddebuenosaires.co1.qualtrics.com");
    
    await page.query("UserName","lola");
    await page.click();
    await page.waitForSelector();
    await page.type()
    await page.type()
    await page.click();
 

})();

*/

const puppeteer = require('puppeteer');
const ACC = require('./acceso');
const USERNAME_SELECTOR = "#UserName";
const PASSWORD_SELECTOR = "#UserPassword";
const CTA_SELECTOR = '#loginButton';
const SPAN= '#5e25c44957c9620010690f30'

async function startBrowser() {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  return {browser, page};
}

async function closeBrowser(browser) {
  return browser.close();
}

async function playTest(url) {
  const {browser, page} = await startBrowser();
  page.setViewport({width: 1366, height: 768});
  await page.goto(url);
  await page.click(USERNAME_SELECTOR);
  await page.keyboard.type(ACC.username);
  await page.click(PASSWORD_SELECTOR);
  await page.keyboard.type(ACC.password);
  await page.click(CTA_SELECTOR);
  await page.waitForNavigation();
  await page.click(SPAN)
  //await page.screenshot({path: 'linkedin.png'});
}

(async () => {
  await playTest("https://ciudaddebuenosaires.co1.qualtrics.com");
  //process.exit(1);
})();


//document.querySelector('span[text="foo"]')