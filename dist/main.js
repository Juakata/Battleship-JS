/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

const Ship = (size, name, first, orientation) => ({
  size,
  name,
  first,
  orientation,
  life: size,
  hit() { this.life -= 1 },
  isSunk() {
    if (this.life == 0) {
      return true;
    } else {
      return false;
    }
  }
});

module.exports = Ship;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

const GameBoard = () => {
  const createBoard = () => {
    const board = Array(10).fill(false).map(x => Array(10).fill(false));
    return board;
  }

  const canMove = (x, y, board) => {
    if (typeof board[x, y] === 'integer') {
      return false;
    }
    return true;
  }

  const getOptions = () => {
    arr = [];
    for (let i = 0; i < 10; i += 1) {
      for (let j = 0; j < 10; j += 1) {
        arr.push([i, j]);
      }
    }
    return arr;
  }

  const checkNull = (x, y, board) => {
    if (typeof board[x] === 'undefined') {
      return true;
    } else if (typeof board[x][y] === 'undefined') {
      return true;
    }
    return false;
  }

  const anyBoatArround = (x, y, board, ship) => {
    if (board[x][y] === 'string' && board[x][y] !== ship.name) {
      return true;
    } else if (!checkNull(x + 1, y, board) && board[x + 1][y] !== false && board[x][y] !== ship.name) {
      return true;
    } else if (!checkNull(x - 1, y, board) && board[x - 1][y] !== false && board[x][y] !== ship.name) {
      return true;
    } else if (!checkNull(x, y + 1, board) && board[x][y + 1] !== false && board[x][y] !== ship.name) {
      return true;
    } else if (!checkNull(x, y - 1, board) && board[x][y - 1] !== false && board[x][y] !== ship.name) {
      return true;
    } else if (!checkNull(x + 1, y + 1, board) && board[x + 1][y + 1] !== false && board[x][y] !== ship.name) {
      return true;
    } else if (!checkNull(x - 1, y - 1, board) && board[x - 1][y - 1] !== false && board[x][y] !== ship.name) {
      return true;
    } else if (!checkNull(x + 1, y - 1, board) && board[x + 1][y - 1] !== false && board[x][y] !== ship.name) {
      return true;
    } else if (!checkNull(x - 1, y + 1, board) && board[x - 1][y + 1] !== false && board[x][y] !== ship.name) {
      return true;
    }
    return false;
  }

  const canPlace = (x, y, board, direction, ship) => {
    if (direction == 'horizontal') {
      for (let i = y; i < ship.size + y; i += 1) {
        if (board[x][i] != false || board[x][i] == null || anyBoatArround(x, i, board, ship)) {
          return false;
        }
      }
    } else if (direction == 'vertical') {
      for (let i = x; i < ship.size + x; i += 1) {
        if (board[i] == null) {
          return false;
        } else if (board[i][y] != false || anyBoatArround(i, y, board, ship)) {
          return false;
        }
      }
    }
    return true;
  }

  const addShip = (x, y, board, direction, ship) => {
    if (direction == 'horizontal' && canPlace(x, y, board, direction, ship)) {
      for (let i = y; i < ship.size + y; i += 1) {
        if (i === y) {
          ship.first = [x, y];
          ship.orientation = 'h';
        }
        board[x][i] = ship.name;
      }
    } else if (direction == 'vertical' && canPlace(x, y, board, direction, ship)) {
      for (let i = x; i < ship.size + x; i += 1) {
        if (i === x) {
          ship.first = [x, y];
          ship.orientation = 'v';
        }
        board[i][y] = ship.name;
      }
    }
  }

  const attack = (shipName, ships) => {
    const ship = ships.find(element => element.name == shipName);
    if (!ship.isSunk()) {
      ship.hit();
    }
  }

  const receiveAttack = (x, y, board, ships) => {
    if (typeof board[x][y] == 'string') {
      attack(board[x][y], ships);
      board[x][y] = 1;
    } else if (typeof board[x][y] == 'boolean') {
      board[x][y] = 0;
    }
  }

  const allShipsSunk = (ships) => {
    return ships.every(ship => ship.isSunk());
  }

  return { createBoard, addShip, canPlace, receiveAttack, allShipsSunk, canMove, getOptions, checkNull };
}

module.exports = GameBoard;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

const Player = (ships, gameBoard) => ({
  ships,
  board: gameBoard.createBoard(),
  options: gameBoard.getOptions(),
  getRandomPositions() {
    const r1 = Math.floor(Math.random() * 10);
    const r2 = Math.floor(Math.random() * 10);
    let r3 = Math.floor(Math.random() * 2);
    if (r3 === 0) {
      r3 = "horizontal";
    } else {
      r3 = "vertical";
    }

    return [r1, r2, r3]
  },
  placeShips() {
    let randoms;
    let result;
    let i = 0;
    while (i < 5) {
      randoms = this.getRandomPositions();
      result = gameBoard.canPlace(randoms[0], randoms[1], this.board, randoms[2], ships[i]);
      if (result) {
        gameBoard.addShip(randoms[0], randoms[1], this.board, randoms[2], ships[i])
        i += 1;
      }
    }
    this.options = gameBoard.getOptions();
  },
  removeFromOption(arr) {
    let i = 0;
    while (i < this.options.length) {
      if (arr[0] === this.options[i][0] && arr[1] === this.options[i][1]) {
        this.options.splice(i, 1);
        i = 100;
      }
      i += 1;
    }
  },
  makeMove(x, y, board, ships) {
    if (this.options.length > 0) {
      this.removeFromOption([x, y]);
      gameBoard.receiveAttack(x, y, board, ships);
    }
  },
  makeAttacks(ship, computer) {
    const board = computer.board;
    const ships = computer.ships;
    const elements = [];
    if(ship.orientation === 'v'){
      for (let i = ship.first[0]; i < ship.size + ship.first[0]; i += 1) {
        elements.push([i, ship.first[1]]);
      }
    } else {
      for (let i = ship.first[1]; i < ship.size + ship.first[1]; i += 1) {
        elements.push([ship.first[0], i]);
      }
    }
    elements.forEach(e => {
      if (!gameBoard.checkNull(e[0] + 1, e[1], board) && typeof board[e[0] + 1][e[1]] !== 'number') {
        this.makeMove(e[0] + 1, e[1], board, ships);
        document.getElementById(`C-${e[0] + 1}-${e[1]}`).className = 'water';
      }
      if (!gameBoard.checkNull(e[0] - 1, e[1], board) && typeof board[e[0] - 1][e[1]] !== 'number') {
        this.makeMove(e[0] - 1, e[1], board, ships);
        document.getElementById(`C-${e[0] - 1}-${e[1]}`).className = 'water';
      }
      if (!gameBoard.checkNull(e[0], e[1] + 1, board) && typeof board[e[0]][e[1] + 1] !== 'number') {
        this.makeMove(e[0], e[1] + 1, board, ships);
        document.getElementById(`C-${e[0]}-${e[1] + 1}`).className = 'water';
      }
      if (!gameBoard.checkNull(e[0], e[1] - 1, board) && typeof board[e[0]][e[1] - 1] !== 'number') {
        this.makeMove(e[0], e[1] - 1, board, ships);
        document.getElementById(`C-${e[0]}-${e[1] - 1}`).className = 'water';
      }
      if (!gameBoard.checkNull(e[0] + 1, e[1] + 1, board) && typeof board[e[0] + 1][e[1] + 1] !== 'number') {
        this.makeMove(e[0] + 1, e[1] + 1, board, ships);
        document.getElementById(`C-${e[0] + 1}-${e[1] + 1}`).className = 'water';
      }
      if (!gameBoard.checkNull(e[0] - 1, e[1] - 1, board) && typeof board[e[0] - 1][e[1] - 1] !== 'number') {
        this.makeMove(e[0] - 1, e[1] - 1, board, ships);
        document.getElementById(`C-${e[0] - 1}-${e[1] - 1}`).className = 'water';
      }
      if (!gameBoard.checkNull(e[0] + 1, e[1] - 1, board) && typeof board[e[0] + 1][e[1] - 1] !== 'number') {
        this.makeMove(e[0] + 1, e[1] - 1, board, ships);
        document.getElementById(`C-${e[0] + 1}-${e[1] - 1}`).className = 'water';
      }
      if (!gameBoard.checkNull(e[0] - 1 , e[1] + 1, board) && typeof board[e[0] - 1][e[1] + 1] !== 'number') {
        this.makeMove(e[0] - 1, e[1] + 1, board, ships);
        document.getElementById(`C-${e[0] - 1}-${e[1] + 1}`).className = 'water';
      }
    });
  },
  gameOver() {
    return gameBoard.allShipsSunk(ships);
  }
});

module.exports = Player;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

const Computer = (ships, gameBoard) => ({
  ships,
  board: gameBoard.createBoard(),
  options: gameBoard.getOptions(),
  smart: false,
  getRandomPositions() {
    const r1 = Math.floor(Math.random() * this.options.length);
    let r2 = Math.floor(Math.random() * 2);
    if (r2 === 0) {
      r2 = "horizontal";
    } else {
      r2 = "vertical";
    }

    return [r1, r2]
  },
  removeFromOption(arr) {
    let i = 0;
    while (i < this.options.length) {
      if (arr[0] === this.options[i][0] && arr[1] === this.options[i][1]) {
        this.options.splice(i, 1);
        i = 100;
      }
      i += 1;
    }
  },
  makeAttacks(ship, player) {
    const board = player.board;
    const ships = player.ships;
    const elements = [];
    const first = [0, 0, 'A'];
    if(ship.orientation === 'v'){
      for (let i = ship.first[0]; i < ship.size + ship.first[0]; i += 1) {
        elements.push([i, ship.first[1]]);
      }
    } else {
      for (let i = ship.first[1]; i < ship.size + ship.first[1]; i += 1) {
        elements.push([ship.first[0], i]);
      }
    }
    elements.forEach(e => {
      if (!gameBoard.checkNull(e[0] + 1, e[1], board) && typeof board[e[0] + 1][e[1]] !== 'number') {
        this.makeSmartMove(e[0] + 1, e[1], board, ships, first);
        document.getElementById(`P-${e[0] + 1}-${e[1]}`).className = 'water';
      }
      if (!gameBoard.checkNull(e[0] - 1, e[1], board) && typeof board[e[0] - 1][e[1]] !== 'number') {
        this.makeSmartMove(e[0] - 1, e[1], board, ships, first);
        document.getElementById(`P-${e[0] - 1}-${e[1]}`).className = 'water';
      }
      if (!gameBoard.checkNull(e[0], e[1] + 1, board) && typeof board[e[0]][e[1] + 1] !== 'number') {
        this.makeSmartMove(e[0], e[1] + 1, board, ships, first);
        document.getElementById(`P-${e[0]}-${e[1] + 1}`).className = 'water';
      }
      if (!gameBoard.checkNull(e[0], e[1] - 1, board) && typeof board[e[0]][e[1] - 1] !== 'number') {
        this.makeSmartMove(e[0], e[1] - 1, board, ships, first);
        document.getElementById(`P-${e[0]}-${e[1] - 1}`).className = 'water';
      }
      if (!gameBoard.checkNull(e[0] + 1, e[1] + 1, board) && typeof board[e[0] + 1][e[1] + 1] !== 'number') {
        this.makeSmartMove(e[0] + 1, e[1] + 1, board, ships, first);
        document.getElementById(`P-${e[0] + 1}-${e[1] + 1}`).className = 'water';
      }
      if (!gameBoard.checkNull(e[0] - 1, e[1] - 1, board) && typeof board[e[0] - 1][e[1] - 1] !== 'number') {
        this.makeSmartMove(e[0] - 1, e[1] - 1, board, ships, first);
        document.getElementById(`P-${e[0] - 1}-${e[1] - 1}`).className = 'water';
      }
      if (!gameBoard.checkNull(e[0] + 1, e[1] - 1, board) && typeof board[e[0] + 1][e[1] - 1] !== 'number') {
        this.makeSmartMove(e[0] + 1, e[1] - 1, board, ships, first);
        document.getElementById(`P-${e[0] + 1}-${e[1] - 1}`).className = 'water';
      }
      if (!gameBoard.checkNull(e[0] - 1 , e[1] + 1, board) && typeof board[e[0] - 1][e[1] + 1] !== 'number') {
        this.makeSmartMove(e[0] - 1, e[1] + 1, board, ships, first);
        document.getElementById(`P-${e[0] - 1}-${e[1] + 1}`).className = 'water';
      }
    });
  },
  placeShips() {
    let randoms;
    let result;
    let i = 0;
    let hitOn;
    while (i < 5) {
      randoms = this.getRandomPositions();
      hitOn = this.options[randoms[0]];
      this.options.splice(randoms[0], 1)
      result = gameBoard.canPlace(hitOn[0], hitOn[1], this.board, randoms[1], ships[i]);
      if (result) {
        gameBoard.addShip(hitOn[0], hitOn[1], this.board, randoms[1], ships[i])
        i += 1;
      }
    }
    this.options = gameBoard.getOptions();
  },
  makeMove(board, ships) {
    if (this.options.length > 0) {
      let randoms = this.getRandomPositions();
      let hitOn = this.options[randoms[0]];
      this.options.splice(randoms[0], 1);
      const name = board[hitOn[0]][hitOn[1]];
      gameBoard.receiveAttack(hitOn[0], hitOn[1], board, ships);
      if (board[hitOn[0]][hitOn[1]] == 1) {
        this.smart = true;
        return [hitOn[0], hitOn[1], name];
      } else {
        return [hitOn[0], hitOn[1]];
      }
    }
  },
  whereToGo(x, y, board, first, not) {
    let send;
    if (!gameBoard.checkNull(x + 1, y, board) && typeof board[x + 1][y] !== 'number' && !not.includes(0)) {
      send = [x + 1, y];
    } else if (!gameBoard.checkNull(x - 1, y, board) && typeof board[x - 1][y] !== 'number' && !not.includes(1)) {
      if (!not.includes(0)) {
        not.push(0);
      }
      send = [x - 1, y];
    } else if (!gameBoard.checkNull(x, y + 1, board) && typeof board[x][y + 1] !== 'number' && !not.includes(2)) {
      for (let i = 0; i < 2; i += 1) {
        if (!not.includes(i)) {
          not.push(i);
        }
      }
      send = [x, y + 1];
    } else if (!gameBoard.checkNull(x, y - 1, board) && typeof board[x][y - 1] !== 'number') {
      for (let i = 0; i < 3; i += 1) {
        if (!not.includes(i)) {
          not.push(i);
        }
      }
      send = [x, y - 1];
    } else {
      not = [];
      x = first[0];
      y = first[1];
      if (!gameBoard.checkNull(x - 1, y, board) && typeof board[x - 1][y] !== 'integer') {
        send = [x - 1, y];
        not.push(0);
      } else {
        send = [x, y - 1];
        for (let i = 0; i < 3; i += 1) {
          not.push(i);
        }
      }
    }
    return [send, not];
  },
  makeSmartMove(x, y, board, ships, first) {
    if (this.options.length > 0) {
      let send;
      if (typeof board[x][y] === 'string') {
        send = [x, y];
      } else {
        send = [first[0], first[1]];
      }
      this.removeFromOption([x, y]);
      gameBoard.receiveAttack(x, y, board, ships);
      const ship = ships.find(ship => ship.name == first[2]);
      if (ship.isSunk()) {
        this.smart = false;
      }
      return send;
    }
  },
  gameOver() {
    return gameBoard.allShipsSunk(ships);
  }
});

module.exports = Computer;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(5);
            var content = __webpack_require__(6);

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(module.i, content, options);

var exported = content.locals ? content.locals : {};



module.exports = exported;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = {};

function modulesToDom(moduleId, list, options) {
  for (var i = 0; i < list.length; i++) {
    var part = {
      css: list[i][1],
      media: list[i][2],
      sourceMap: list[i][3]
    };

    if (stylesInDom[moduleId][i]) {
      stylesInDom[moduleId][i](part);
    } else {
      stylesInDom[moduleId].push(addStyle(part, options));
    }
  }
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : undefined;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && btoa) {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (moduleId, list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  moduleId = options.base ? moduleId + options.base : moduleId;
  list = list || [];

  if (!stylesInDom[moduleId]) {
    stylesInDom[moduleId] = [];
  }

  modulesToDom(moduleId, list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    if (!stylesInDom[moduleId]) {
      stylesInDom[moduleId] = [];
    }

    modulesToDom(moduleId, newList, options);

    for (var j = newList.length; j < stylesInDom[moduleId].length; j++) {
      stylesInDom[moduleId][j]();
    }

    stylesInDom[moduleId].length = newList.length;

    if (stylesInDom[moduleId].length === 0) {
      delete stylesInDom[moduleId];
    }
  };
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(7);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "body {\n  background-color: black;\n}\ntable {\n  border: 1px solid green;\n  width: 500px;\n  height: auto;\n  display: inline-block;\n  color: green;\n}\n\ntr {\n  border: 1px solid green;\n}\n\ntd {\n  border: 1px solid green;\n  width: 50px;\n  height: 50px;\n}\n\ntd:hover {\n  background-color: rgb(0, 54, 0);\n}\n\n.ship {\n  background: green;\n}\n\n.hit {\n  background: red;\n\n}\n.disable-event {\n  pointer-events: none;\n}\n\n.water {\n  background: aqua;\n  pointer-events: none;\n}\n\nbody {\n  background-color: black;\n  font-family: \"Lucida Console\", Monaco, monospace;\n  color: green;\n}\n\nheader {\n  text-align: center;\n  height: 20%;\n}\n\n.scoreboard__score {\n  justify-content: space-between;\n  display: flex;\n  width: 5%;\n  margin: 0 auto;\n}\n\n.scoreboard__header {\n  margin-top: -15px;\n}\n\n.scoreboard__score {\n  font-size: 30px;\n  margin-top: -40px;\n}\n\n.container {\n  display: flex;\n  justify-content: space-evenly;\n  margin: 0 auto;\n  position: relative;\n}\n.player-ship-list h {\n}\n\n.computer-ship-list {\n}\n\n.radar {\n  top: 6%;\n  border: 1px solid green;\n  height: 500px;\n  width: 500px;\n  border-radius: 50%;\n  justify-content: center;\n  align-items: center;\n  display: flex;\n  position: absolute;\n  z-index: -50;\n}\n\n.first-circle {\n  border: 1px solid green;\n  height: 400px;\n  width: 400px;\n  border-radius: 50%;\n  justify-content: center;\n  align-items: center;\n  display: flex;\n}\n\n.second-circle {\n  border: 1px solid green;\n  height: 250px;\n  width: 250px;\n  border-radius: 50%;\n  justify-content: center;\n  align-items: center;\n  display: flex;\n}\n\n.line {\n  z-index: -45;\n  position: absolute;\n  bottom: 50%;\n  width: 500px;\n  height: 250px;\n  will-change: transform;\n  transform-origin: 50% 100%;\n  border-radius: 50% 50% 0 0 / 100% 100% 0 0;\n  background-image: linear-gradient(135deg, rgba(0, 128, 0, 0.8) 0%, rgba(0, 0, 0, 0.02) 70%,rgba(0, 0, 0, 0) 100%);\n  clip-path: polygon(100% 0, 100% 10%,50% 100%, 0 100%, 0 0);\n  animation: rotate360 4s infinite linear;\n}\n\n.line:after {\n  content: \"\";\n  position: absolute;\n  width: 50%;\n  bottom: -1px;\n  border-top: 3px solid rgba(0, 128, 0, 0.8);\n  box-shadow: 0 0 3px rgba(0, 128, 0, 0.6);\n  border-radius: 9px;\n}\n\n\n@keyframes rotate360 {\n  0% {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(-360deg);\n  }\n}\n\n.reset {\n  display: block;\n  margin: 30px auto;\n  padding: 20px 30px;\n  font-size: 18px;\n  background-color: green;\n  border: none;\n}\n\n.reset:focus {\n  outline: none;\n}\n\n.reset:hover {\n  background-color: rgb(0, 54, 0);\n  color: darkgrey;\n}", ""]);
// Exports
module.exports = exports;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring

  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || '').concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
  return "/*# ".concat(data, " */");
}

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./src/style.css
var style = __webpack_require__(4);

// EXTERNAL MODULE: ./src/gameBoard.js
var src_gameBoard = __webpack_require__(1);
var gameBoard_default = /*#__PURE__*/__webpack_require__.n(src_gameBoard);

// EXTERNAL MODULE: ./src/player.js
var player = __webpack_require__(2);
var player_default = /*#__PURE__*/__webpack_require__.n(player);

// EXTERNAL MODULE: ./src/computer.js
var computer = __webpack_require__(3);
var computer_default = /*#__PURE__*/__webpack_require__.n(computer);

// EXTERNAL MODULE: ./src/ship.js
var ship = __webpack_require__(0);
var ship_default = /*#__PURE__*/__webpack_require__.n(ship);

// CONCATENATED MODULE: ./src/gameLoop.js





let gameLoop_player, gameLoop_computer;

const domManager = (() => {
  let smart = [];

  const computerAction = (player, compMove, move, go) => {
    let first = [compMove[0], compMove[1], compMove[2]];
    let shot;
    if (go.length === 0) {
      go = gameLoop_computer.whereToGo(compMove[0], compMove[1], player.board, first, []);
    } else {
      go = gameLoop_computer.whereToGo(move[0], move[1], player.board, first, go[1]);
    }
    shot = document.getElementById(`P-${go[0][0]}-${go[0][1]}`);
    if (typeof player.board[go[0][0]][go[0][1]] === 'string') {
      shot.className = 'hit disable-event';
    } else {
      shot.className = 'water';
    }
    const name = player.board[go[0][0]][go[0][1]];
    move = gameLoop_computer.makeSmartMove(go[0][0], go[0][1], player.board, player.ships, first);
    smart = [compMove, move, go];
    if (!gameLoop_computer.smart) {
      const ship = player.ships.find(ship => ship.name == name);
      gameLoop_computer.makeAttacks(ship, player);
      compMove = gameLoop_computer.makeMove(player.board, player.ships);
      shot = document.getElementById(`P-${compMove[0]}-${compMove[1]}`);
      if (typeof player.board[compMove[0]][compMove[1]] === 'string' || player.board[compMove[0]][compMove[1]] === 1) {
        shot.className = 'hit disable-event';
      } else {
        shot.className = 'water disable-event';
      }
      move = [];
      go = [];
    }

    if (shot.className === 'hit disable-event' && gameLoop_computer.smart) {
      computerAction(player, compMove, move, go);
    }
  }

  const renderBoard = (player, computer) => {
    const tableP = document.createElement('table');
    const tableC = document.createElement('table');
    const radar = `  <div class="radar">
      <div class="first-circle">
        <div class="second-circle">
          <div class="line"></div>
        </div>
    </div>
  </div>`;
    tableP.classList.add('disable-event');
    let rowP, rowC;
    let tdP, tdC;
    const playerBoardContainer = document.querySelector('.player-board');
    const computerBoardContainer = document.querySelector('.computer-board');
    const container = document.querySelector('.container');
    const score = document.querySelector('.scoreboard');
    const h2 = document.createElement('h2');
    score.innerHTML = '';
    container.classList.remove('disable-event');
    playerBoardContainer.innerHTML = '';
    computerBoardContainer.innerHTML = '';
    playerBoardContainer.insertAdjacentElement('afterbegin', tableP);
    playerBoardContainer.insertAdjacentHTML('beforeend', radar);
    computerBoardContainer.insertAdjacentElement('afterbegin', tableC);
    computerBoardContainer.insertAdjacentHTML('beforeend', radar);
    for (let i = 0; i < 10; i += 1) {
      rowP = document.createElement('tr');
      rowC = document.createElement('tr');
      tableP.appendChild(rowP);
      tableC.appendChild(rowC);
      for (let j = 0; j < 10; j += 1) {
        tdP = document.createElement('td');
        tdC = document.createElement('td');
        tdP.id = `P-${i}-${j}`;
        tdC.id = `C-${i}-${j}`;
        if (typeof player.board[i][j] === 'string') {
          tdP.classList.add('ship');
        }
        rowP.appendChild(tdP);
        rowC.appendChild(tdC);
        tdC.addEventListener('click', () => {

          const coord = event.target.id.split('-');
          if (typeof computer.board[coord[1]][coord[2]] === 'string') {
            event.target.className = 'hit disable-event';
          } else {
            event.target.className = 'water disable-event';
          }
          const name = computer.board[coord[1]][coord[2]];
          player.makeMove(coord[1], coord[2], computer.board, computer.ships);
          if (computer.gameOver() === true) {
            h2.innerText = 'Player 1 won!';
            score.appendChild(h2);
            container.classList.add('disable-event');
          }
          if (computer.board[coord[1]][coord[2]] !== 1) {
            if (!computer.smart) {
              const compMove = computer.makeMove(player.board, player.ships);
              const shot = document.getElementById(`P-${compMove[0]}-${compMove[1]}`);
              if (typeof player.board[compMove[0]][compMove[1]] === 'string' || player.board[compMove[0]][compMove[1]] === 1) {
                shot.className = 'hit disable-event';
              } else {
                shot.className = 'water disable-event';
              }
              if (computer.smart) {
                computerAction(player, compMove, [], []);
              }
            } else {
              computerAction(player, smart[0], smart[1], smart[2]);
            }
          } else {
            const ship = computer.ships.find(ship => ship.name == name);
            if (ship.isSunk()) {
              player.makeAttacks(ship, computer);
            }
          }
          if (player.gameOver() === true) {
            h2.innerText = 'Computer won!';
            score.appendChild(h2);
            container.classList.add('disable-event');
          }
        }, false);
      }
    }
  }

  return { renderBoard };

})();

const gameLoop = () => {
  const gameBoard = gameBoard_default()();
  const shipsPlayer = [ship_default()(5, 'A'), ship_default()(4, 'B'), ship_default()(3, 'C'), ship_default()(3, 'S'), ship_default()(2, 'D')];
  const shipsComputer = [ship_default()(5, 'A'), ship_default()(4, 'B'), ship_default()(3, 'C'), ship_default()(3, 'S'), ship_default()(2, 'D')];
  const container = document.querySelector('.container');

  gameLoop_player = player_default()(shipsPlayer, gameBoard);
  gameLoop_computer = computer_default()(shipsComputer, gameBoard);
  gameLoop_player.placeShips();
  gameLoop_computer.placeShips();
  domManager.renderBoard(gameLoop_player, gameLoop_computer);
};

/* harmony default export */ var src_gameLoop = (gameLoop);

// CONCATENATED MODULE: ./src/index.js



src_gameLoop();

const src_reset = document.querySelector('.reset');

src_reset.addEventListener('click', () => {
  src_gameLoop();
}, false);


/***/ })
/******/ ]);