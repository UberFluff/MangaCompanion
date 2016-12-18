var request = require('request');
var cheerio = require('cheerio');
var divContainer = document.getElementById('container-names');
var loader = document.getElementById('spinner-load');


var whatsHotScraper = function (directory) {

    var baseUrl = "http://mangafox.me/directory/" + directory + ".htm";

    request(baseUrl, function (error, response, html) {
        //check si la réponse est positive
        if (!error && response.statusCode == 200) {
            //Parse le html avec cheerio
            var $ = cheerio.load(html);
            //retire le spinner
            if (directory == 1) {
                divContainer.removeChild(loader);
            }
            //boucle pour chaque manga
            $('.manga_img').each(function (i, element) {

                //Element pour titre du manga
                var a = $(this).parent().children('.manga_text').children('.title');

                //Création de la "card" et de l'image de couverture
                var card = document.createElement('paper-card');
                card.className = "mangas-card";
                var content = document.createElement('div');
                content.style.backgroundImage = "url(" + $(this).children('div').children('img').attr('src') + ")";
                content.className = "mangas-cover";
                var title = document.createElement('span');
                title.innerHTML = a.text();
                title.className = "mangas-title";
                var url = document.createElement('input');
                url.value = $(this).attr('href');
                url.type = "hidden";

                //Ajout de la "card"
                content.appendChild(url);
                content.appendChild(title);
                card.appendChild(content);
                divContainer.appendChild(card);
            });
        }
    });

}