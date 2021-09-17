

const puppeteer = require('puppeteer');
const ACC = require('./acceso');
const USERNAME_SELECTOR = "#UserName";
const PASSWORD_SELECTOR = "#UserPassword";
const CTA_SELECTOR = '#loginButton';
const SPAN= ".project-description ng-isolate-scope"



async function startBrowser() {
        // carga navegador

        let browser = await puppeteer.launch({headless: false}); 

        // navegador incognito

        let context = await browser.createIncognitoBrowserContext();

        // abre pagina

        let page = await context.newPage(); 

  return {browser, page};
}

async function closeBrowser(browser) {
  return browser.close();
}

async function playTest(url) {
  const {browser, page} = await startBrowser();
  page.setViewport({width: 1366, height: 768});
  await page.goto(url);
  console.log("Llegamos bien a la url")

  await page.click(USERNAME_SELECTOR);
  await page.keyboard.type(ACC.username);
  await page.click(PASSWORD_SELECTOR);
  await page.keyboard.type(ACC.password);
  await page.click(CTA_SELECTOR);

  
  //await page.waitForNavigation();
  //await page.waitForSelector();

  //await page.waitForSelector('div.project-description')

  //await page.click(SPAN)
  //await page.$eval('[class="project-description ng-isolate-scope"]', as => console.log(as) )

  //await page.click(SPAN)
  //await page.screenshot({path: 'linkedin.png'});
}
  
(async () => {
  await playTest("https://ciudaddebuenosaires.co1.qualtrics.com");
  //process.exit(1);
})();


//document.querySelector('span[text="foo"]')