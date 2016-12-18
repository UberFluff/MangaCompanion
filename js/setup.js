//toutes les dépendances
var os = require('os');
var menu = new nw.Menu();
var gui = require('nw.gui');
var win = gui.Window.get();

//creation du menu au click droit
//menu.append(new nw.MenuItem({
//    label: 'Quit app'
//    , click: function () {
//        gui.App.quit();
//    }
//}));
//menu.append(new nw.MenuItem({
//    label: "fullscreen"
//    , click: function () {
//        win.toggleFullscreen();
//    }
//}));

//ajout du listener pour le click droit
//document.addEventListener('contextmenu', function (ev) {
//    ev.preventDefault();
//
//    menu.popup(ev.x, ev.y);
//
//    return false;
//}, false);

//redimentionnement de la fenetre (Oui bon bah redimentionnement c'est dégueu mais zut hein !)
win.resizeTo(1000, 800);
win.x = 140;
win.y = 100;
//win.setResizable(false);

//reset var
localStorage.setItem('isComingFromAhead', 0);