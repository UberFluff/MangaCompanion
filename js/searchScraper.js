var request = require('request');
var cheerio = require('cheerio');
var divContainer = document.getElementById('container-names');
var loader = document.getElementById('spinner-load');


var searchFunction = function (title, page) {
    var currentPage = 0;
    var count = 0;
    var title = title.replace(" ", "+");
    var baseUrl = "http://mangafox.me/search.php?name_method=cw&name=" + title + "&type=&author_method=cw&author=&artist_method=cw&artist=&genres%5BAction%5D=0&genres%5BAdult%5D=0&genres%5BAdventure%5D=0&genres%5BComedy%5D=0&genres%5BDoujinshi%5D=0&genres%5BDrama%5D=0&genres%5BEcchi%5D=0&genres%5BFantasy%5D=0&genres%5BGender+Bender%5D=0&genres%5BHarem%5D=0&genres%5BHistorical%5D=0&genres%5BHorror%5D=0&genres%5BJosei%5D=0&genres%5BMartial+Arts%5D=0&genres%5BMature%5D=0&genres%5BMecha%5D=0&genres%5BMystery%5D=0&genres%5BOne+Shot%5D=0&genres%5BPsychological%5D=0&genres%5BRomance%5D=0&genres%5BSchool+Life%5D=0&genres%5BSci-fi%5D=0&genres%5BSeinen%5D=0&genres%5BShoujo%5D=0&genres%5BShoujo+Ai%5D=0&genres%5BShounen%5D=0&genres%5BShounen+Ai%5D=0&genres%5BSlice+of+Life%5D=0&genres%5BSmut%5D=0&genres%5BSports%5D=0&genres%5BSupernatural%5D=0&genres%5BTragedy%5D=0&genres%5BWebtoons%5D=0&genres%5BYaoi%5D=0&genres%5BYuri%5D=0&released_method=eq&released=&rating_method=eq&rating=&is_completed=&advopts=1";
    if(page != 1) {
        baseUrl = baseUrl + "&page=" + page;
    }
    
    request(baseUrl, function (error, response, html) {
        if (!error && response.statusCode == 200) {
            var $ = cheerio.load(html);
            if(page == 1){divContainer.removeChild(loader);}
            $('.series_preview').each(function (i, element) {
                var card = document.createElement('paper-card');
                card.className = "mangas-card";

                var bg = document.createElement('div');
                bg.style.backgroundImage = "url('http://h.mfcdn.net/store/manga/" + $(this).attr('rel') + "/cover.jpg')";
                bg.className = "mangas-cover";

                var span = document.createElement('span');
                span.innerHTML = $(this).text();
                span.className = "mangas-title";

                var url = document.createElement('input');
                url.value = $(this).attr('href');
                url.type = "hidden";

                bg.appendChild(url);
                bg.appendChild(span);
                card.appendChild(bg);
                divContainer.appendChild(card);
            });
            
            $('#nav').find('li').each(function(i, element){
                count ++;
            });
            count -= 2;
            if(count != page) {
                var nextpage = page + 1;
                searchFunction(title, nextpage);
            }
            
        }
    });

};