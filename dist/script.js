/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!*******************!*\
  !*** ./script.ts ***!
  \*******************/


// Definicja klasy przechowującej stan aplikacji
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var AppState = /*#__PURE__*/function () {
  function AppState() {
    _classCallCheck(this, AppState);
    this.currentStyleName = '';
    this.currentStyleFile = '';
    this.availableStyles = {};
    // Inicjalizacja stanu aplikacji
    this.availableStyles = {
      'style1': 'styles/style.css',
      'style2': 'styles/style2.css'
      // Dodaj więcej dostępnych stylów w razie potrzeby
    };
  }
  // Metoda do ustawiania aktualnego stylu
  _createClass(AppState, [{
    key: "setStyle",
    value: function setStyle(styleName) {
      if (this.availableStyles.hasOwnProperty(styleName)) {
        this.removeOldStyle(); // Usuń poprzedni styl
        this.currentStyleName = styleName;
        this.currentStyleFile = this.availableStyles[styleName];
        this.applyNewStyle(); // Dodaj nowy styl
      } else {
        console.error('Wybrany styl nie istnieje.');
      }
    }
    // Metoda usuwająca poprzedni styl z DOM
  }, {
    key: "removeOldStyle",
    value: function removeOldStyle() {
      var _a;
      var oldStyleElement = document.getElementById('app-style');
      if (oldStyleElement) {
        (_a = oldStyleElement.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(oldStyleElement);
      }
    }
    // Metoda dodająca nowy styl do DOM
  }, {
    key: "applyNewStyle",
    value: function applyNewStyle() {
      var linkElement = document.createElement('link');
      linkElement.id = 'app-style';
      linkElement.rel = 'stylesheet';
      linkElement.href = this.currentStyleFile;
      document.head.appendChild(linkElement);
    }
  }]);
  return AppState;
}(); // Przykład użycia
var appState = new AppState();
// Wywołanie aplikacji z linka (np. po kliknięciu przycisku)
var selectedStyle = 'style1';
appState.setStyle(selectedStyle);
/******/ })()
;