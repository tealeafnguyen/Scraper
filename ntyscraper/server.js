var axios = require("axios");
var cheerio = require("cheerio");

function scrape() {
    axios.get("https://www.nytimes.com/section/science").then(function (response) {
        var $ = cheerio.load(response.data);


        $(".css-4jyr1y").each(function (i, element) {

            var obj = {}
            obj.title = $(this).children('a').children('h2.css-1dq8tca.e1xfvim30').text();
            obj.link = 'https://www.nytimes.com/'+ $(this).children('a').attr('href');
            obj.summary = $(this).children('a').children('p.css-1echdzn.e1xfvim31').text();

            //Headline
            console.log($(this).children('a').children('h2.css-1dq8tca.e1xfvim30').text());

            //Summary
            console.log($(this).children('a').children('p.css-1echdzn.e1xfvim31').text());

            //URL
            console.log('https://www.nytimes.com/'+$(this).children('a').attr('href'));

            console.log('\n')

        })
    })
}

scrape();