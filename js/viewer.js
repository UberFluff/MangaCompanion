//mise en place des plugins node js
var request = require('request');
var cheerio = require('cheerio');
var os = require('os');
var gui = require('nw.gui');
var win = gui.Window.get();

//récupere les données en local storage
var arrayChapters = localStorage.getItem('arrayChapters');
arrayChapters = JSON.parse(arrayChapters);
var currentChapter = localStorage.getItem('chapterIndex');
var isComingAhead = localStorage.getItem('isComingFromAhead');

//set up viewer
var currentPage = 0;
var imageArray = [];
var url = arrayChapters[currentChapter];
if (isComingAhead != "1") {
    isComingAhead = 0;
}

request({
    url: url,
    gzip: true
}, function (error, response, html) {
    //check si la réponse est positive
    if (!error && response.statusCode == 200) {
        //Parse le html avec cheerio
        var $ = cheerio.load(html);
        var urlSplitted = url.split('/');
        var indexOfSplit = urlSplitted.length - 1;

        $('#top_bar').children('div').children('div').children('select').children().each(function (i, elem) {
            var val = $(this).val();
            if (val != "0") {
                var insertVal = val + ".html";
                urlSplitted[indexOfSplit] = insertVal;
                imageArray[i] = urlSplitted.join('/');
            }
        });

        if (isComingAhead == 1) {
            currentPage = imageArray.length - 1;
            getImage(currentPage);
        } else {
            getImage(0);
        }
        var progress = document.getElementById('progressBar');
        progress.setAttribute('max', imageArray.length - 1);
        progress.setAttribute('value', currentPage);
        var maxPage = document.getElementById('valMaxPage');
        maxPage.innerHTML = imageArray.length;
        var valCurrentPage = document.getElementById('valCurrentPage');
        valCurrentPage.innerHTML = currentPage + 1;
    }
});


//Fonctions
var getImage = function (id) {

    var urlGiven = imageArray[id];

    request({
        url: urlGiven,
        gzip: true
    }, function (error, response, html) {
        //check si la réponse est positive
        if (!error && response.statusCode == 200) {
            //Parse le html avec cheerio
            var $ = cheerio.load(html);

            var valueReturned = $('#image').attr('src');

            var imageElem = document.getElementById('image');
            imageElem.src = valueReturned;
            //change the image
        }
    });
};

var nextImage = function () {
    if (currentPage != imageArray.length - 1) {
        currentPage++;
        getImage(currentPage);
        var progress = document.getElementById('progressBar');
        progress.setAttribute('value', currentPage);
        var valCurrentPage = document.getElementById('valCurrentPage');
        valCurrentPage.innerHTML = currentPage + 1;
    } else {
        if (currentChapter != 0) {
            currentChapter--;
            isComingAhead = 0;
            localStorage.setItem('isComingFromAhead', isComingAhead);
            localStorage.setItem('chapterIndex', currentChapter);
            window.top.location.href = "viewer.html";
        } else {
            alert('last chapter');
        }
    }
};

var prevImage = function () {
    if (currentPage != 0) {
        currentPage--;
        getImage(currentPage);
        var progress = document.getElementById('progressBar');
        progress.setAttribute('value', currentPage);
        var valCurrentPage = document.getElementById('valCurrentPage');
        valCurrentPage.innerHTML = currentPage + 1;
    } else {
        currentChapter++;
        isComingAhead = 1;
        localStorage.setItem('isComingFromAhead', isComingAhead);
        localStorage.setItem('chapterIndex', currentChapter);
        window.top.location.href = "viewer.html";
    }
};

var toggleVisible = function () {
    var elem = document.getElementById('onBot');
    var elemWindow = window.getComputedStyle(elem);
    var value = elemWindow.getPropertyValue('opacity');
    if (value == "0") {
        elem.setAttribute('class', 'visible');
        document.getElementById('onTop').setAttribute('class', 'visible');
    } else {
        elem.setAttribute('class', 'hidden');
        document.getElementById('onTop').setAttribute('class', 'hidden');
    }
}

//Quand des touches sont pressées, (Echap, Droite, Gauche)
document.onkeydown = function (evt) {
    evt = evt || window.event;
    if (evt.keyCode == 39) {
        nextImage();
    }
    if (evt.keyCode == 37) {
        prevImage();
    }
};