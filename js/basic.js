var os = require('os');
var gui = require('nw.gui');
var win = gui.Window.get();

document.onkeydown = function (evt) {
    evt = evt || window.event;
    if (evt.keyCode == 27) {
        win.leaveFullscreen();
    }
};