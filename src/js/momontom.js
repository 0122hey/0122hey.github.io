'use strict';

import { printTime, loadCoords } from "./import/location.js";
import { loadUser } from "./import/user.js";
import { loadTodos } from "./import/todo.js";
import { paintImg } from "./import/bg.js";

(function init() {
    printTime();
    setInterval(printTime, 1000);
    loadCoords();
    loadUser();
    loadTodos();
    paintImg(Math.floor(Math.random() * 3));
})();