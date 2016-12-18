var request = require('request');
var cheerio = require('cheerio');

var mangaUrl = localStorage.getItem('mangaUrl');
var mangaName = "";
var author = "";
var release = "";
var artist = "";
var status = "";
var genres = "";
var chapterUrls = [];
var count = 0;

request(mangaUrl, function (error, response, html) {

    if (!error && response.statusCode == 200) {
        var $ = cheerio.load(html);
        $('#title').children('table').find('tr').each(function (i, element) {
            if (i != 0) {
                $(this).find('td').each(function (i, element) {
                    if (i == 0) {
                        release = $(this).children('a').text();
                    }
                    if (i == 1) {
                        author = $(this).children('a').text();
                    }
                    if (i == 2) {
                        artist = $(this).children('a').text();
                    }
                    if (i == 3) {
                        genres = $(this).text();
                    }
                });
            }
        });
        $('#series_info').find('.data').each(function (i, element) {
            if (i == 0) {
                var preStatus = $(this).children('span').contents().get(0).nodeValue;
                status = preStatus.replace(',', '');
            }
        });
        var urlImage = $('.cover').children().attr('src');
        var Names = $('meta[name="keywords"]').attr('content');
        var ArrayNames = Names.split(',');
        mangaName = ArrayNames[0];
        document.getElementById('paper-card-background').style.backgroundImage = "url(" + urlImage + ")";
        document.getElementById('blur-background').style.backgroundImage = "url(" + urlImage + ")";
        document.getElementById('name').innerHTML = author;
        document.getElementById('artist').innerHTML = artist;
        document.getElementById('release').innerHTML = release;
        document.getElementById('status').innerHTML = status;
        document.getElementById('genres').innerHTML = genres;
        document.getElementById('body').removeChild(document.getElementById('spinner-load'));
        document.getElementById('text-summary').innerHTML = $('.summary');

        setTitle();
        
        $('#chapters').children('ul').each(function (i, element) {
            $(this).children('li').each(function (i, element) {
                var span = document.createElement('p');
                var ripple = document.createElement('paper-ripple');

                var atext = $(this).children('div').find('.tips').attr('href');


                span.innerHTML = $(this).children('div').find('.tips').text();
                span.className = "chapters-span";
                var url = document.createElement('input');
                url.type = "hidden";
                url.value = i;

                chapterUrls[count] = atext;
                count++;

                span.appendChild(url);
                span.appendChild(ripple);
                document.getElementById('chapters').appendChild(span);
            });
        });
    }
    launchChapter();

});

var launchChapter = function () {
    $('.chapters-span').click(function () {
        var indexChapter = $(this).find('input').val();
        JSONchapterUrls = JSON.stringify(chapterUrls);
        localStorage.setItem('arrayChapters', JSONchapterUrls);
        localStorage.setItem('chapterIndex', indexChapter);
        window.top.location.href = "viewer.html";
    });
};

var setTitle = function() {
    $('.title', parent.document).text(mangaName);
}