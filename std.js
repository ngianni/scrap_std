// npm init -y
// instalamos: npm i cheerio request request-promise
// npm i fs-extra
// para ejecutar: node index.js

const cheerio= require("cheerio");
const request= require("request-promise");
const fs= require("fs-extra");

// const writeStream= fs.createWriteStream('quotes.csv');

// arranca el script

async function init(){
    const $= await request({
        url: 'https://ciudaddebuenosaires.co1.qualtrics.com/text-analytics/#/fieldsets/6f53b1c4-05ec-2fa3-8cad-f3cc7bea6de5?dashboardId=5e25c44957c9620010690f30&dashboardName=Tr%C3%A1mites%20Digitales&productType=reporting-dashboard',
        transform: body => cheerio.load(body)
    });


    
   // writeStream.write('Quotes|\n')

    // T0dos los comentarios: 34:29

    $('.!hasSentimentData() || !showingSentimentHighlight || !hasSentimentHighlights.loaded').each((index,element) => {
        const review= $(element).find('span.text').text()
        //console.log(index,review)

        const reviews= []
        $(element).find('span.text').each((index,element) => reviews.push($(element).text()));
        console.log(index,reviews.join(','))

       // writeStream.write(`${reviews}|\n`)
    })


}

init()
