
const cheerio= require("cheerio");
const request= require("request-promise");
const fs_extra = require("fs-extra");
const fs = require('fs');


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

 
  // console.log(subcontenedores.length)
  // console.log(subcontenedores[[1]])


  // let sentimiento = await subcontenedores[0].$eval('div.response-data-container div.record-sentiment-container div.sentiment-diamond', element => element.innerText)
  // console.log(sentimiento)



  let reviews = []

  let paginas = await page.$eval( 'div.pager-container input', x => x.getAttribute("max") )
  
  for( let i=1 ; i < 6; i++){

    var contenedor  = await page.$('#recordGrid')
    var subcontenedores = await contenedor.$$('div[ng-repeat="r in records track by $index"]')
    var next_button = await page.$( 'div.pager-container button[aria-label="Next Page"]' )

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

    if ( (i + 1) < 6 ) {
      await next_button.click()
      // await page.waitForSelector('#recordGrid')
      await page.waitForTimeout(2500)
    }

  }


  console.log(reviews)
  console.log('Cantidad de paginas totales: ' + paginas)
  console.log('Cantidad de comentarios totales: ' + reviews.length)

  const file = fs.createWriteStream('data.csv');
  file.on('error', err => { console.log(err) });
  allLinks.forEach( link => { file.write( `${link}\n` ) });
  file.end();

  fs.createReadStream('data.csv')
  .pipe(csv())
  .on('data', (row) => {
    console.log(row);
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
  });

}
  
playTest("https://ciudaddebuenosaires.co1.qualtrics.com");



/* 

1. identificar contenedor de comentarios
2. identificar comentario
3. extraer: fecha, sentimiento y comentario
4. navegar por paginas

*/
