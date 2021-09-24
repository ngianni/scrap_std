
const cheerio= require("cheerio");
const request= require("request-promise");
const fs= require("fs-extra");

const puppeteer = require('puppeteer');
const ACC = require('./acceso');
const USERNAME_SELECTOR = "#UserName";
const PASSWORD_SELECTOR = "#UserPassword";
const CTA_SELECTOR = '#loginButton';
const DIV = "div.project-description"



async function startBrowser() {

  // carga navegador
  let browser = await puppeteer.launch({      
    headless: false,
    defaultViewport: null,
    args: ['--start-maximized'] 
  }); 
  // navegador incognito
  let context = await browser.createIncognitoBrowserContext();
  // abre pagina
  let page = await context.newPage(); 

  return {browser, page};
}

// async function closeBrowser(browser) {
//   return browser.close();
// }

const playTest = async (url) => {

  const {browser, page} = await startBrowser();
  page.setViewport({width: 1366, height: 768});
  await page.goto(url);
  console.log("Llegamos bien a la url")

  await page.click(USERNAME_SELECTOR);
  await page.keyboard.type(ACC.username);
  await page.click(PASSWORD_SELECTOR);
  await page.keyboard.type(ACC.password);
  await page.click(CTA_SELECTOR);

  
  await page.waitForNavigation();
  await page.waitForSelector('div.project-description')

  await page.click(DIV)

  await page.waitForNavigation();
  await page.waitForSelector('a[title="STD GCBA"]')

  await page.click('a[title="STD GCBA"]')

  await page.waitForSelector('span[content="Analyze in Text iQ"] a.consumption-module-link i')
  
  await page.click('span[content="Analyze in Text iQ"] a.consumption-module-link i')
  


  // Reviews
  await page.waitForSelector('#recordGrid')
  let contenedor  = await page.$('#recordGrid')

  let subcontenedores = await contenedor.$$('div[ng-repeat="r in records track by $index"]')

  // console.log(subcontenedores.length)
  // console.log(subcontenedores[[1]])


  // let sentimiento = await subcontenedores[0].$eval('div.response-data-container div.record-sentiment-container div.sentiment-diamond', element => element.innerText)
  // console.log(sentimiento)

  let reviews = []
// 
  for (subcontenedor of subcontenedores){

    let comentario = await subcontenedor.$eval('div.response-data-container div.record-container div.response-container span', element => element.innerText)
    let fecha = await subcontenedor.$eval('div.response-data-container div.response-fields span', element => element.innerText)
  
    review = {
      comentario: comentario,
      fecha: fecha
      // sentimiento: ,
    }

    reviews.push(review)

  } 

  console.log(reviews)
}
  
playTest("https://ciudaddebuenosaires.co1.qualtrics.com");



/* 

1. identificar contenedor de comentarios
2. identificar comentario
3. extraer: fecha, sentimiento y comentario
4. navegar por paginas

*/
