// npm init -y
// instalamos: npm i cheerio request request-promise
// npm i fs-extra
// para ejecutar: node index.js

const cheerio= require("cheerio");
const request= require("request-promise");
const fs= require("fs-extra");

const writeStream= fs.createWriteStream('quotes.csv');

// arranca el script

async function init(){
    const $= await request({
        url: 'https://quotes.toscrape.com/',
        transform: body => cheerio.load(body)
    });

    /*

    // Título:

    const websiteTitle= $('Title');
    console.log(websiteTitle.html())

    // Cabecera:

    const websiteHeading= $('H1')
    console.log(websiteHeading.text().trim())

    // Comentario:

    const quote= $('.quote').find('a') // .quote es lo mismo que: .div.quote .  Dentro de quote. busco "a" con .find('a')
    console.log(quote.html())

    /* Todos los comentarios: 21.48

    const quotes= $('.quote span.text').each((index, element) => {
        console.log(index,$(element).text())
    })
    
    */

    
    writeStream.write('Quotes|\n')

    // T0dos los comentarios: 34:29

    $('.quote').each((index,element) => {
        const review= $(element).find('span.text').text()
        //console.log(index,review)

        const reviews= []
        $(element).find('span.text').each((index,element) => reviews.push($(element).text()));
        //console.log(index,reviews.join(','))

        writeStream.write(`${reviews}|\n`)
    })


}

init()
