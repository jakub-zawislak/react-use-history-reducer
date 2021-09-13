(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["useHistoryReducer"] = factory(require("react"));
	else
		root["useHistoryReducer"] = factory(root["react"]);
})(window, function(__WEBPACK_EXTERNAL_MODULE__0__) {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__0__;

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(0);

// CONCATENATED MODULE: ./src/ts/useHistoryReducer.ts

const UNDO = 'USE_HISTORY_REDUCER_UNDO';
const REDO = 'USE_HISTORY_REDUCER_REDO';
const compareStates = (stateA, stateB) => JSON.stringify(stateA) === JSON.stringify(stateB);
const firstElementsOfArray = (array, n) => {
    return typeof n === 'undefined' ? array : array.slice(0, n);
};
const useHistoryReducer = (reducer, initialState, opts = {}) => {
    const { omitUnmodified, useCheckpoints, max, initialHistoryState, } = Object.assign({ omitUnmodified: true, useCheckpoints: false, max: undefined, initialHistoryState: {
            past: [],
            present: initialState,
            future: [],
            isCheckpoint: true,
            undoRedoCounter: 0,
            updateCounter: 0,
        } }, opts);
    const historyReducer = (state, action) => {
        const isNewCheckpoint = useCheckpoints ? !!action.historyCheckpoint : true;
        if (action.type === UNDO) {
            const [newPresent, ...past] = state.past;
            if (!newPresent) {
                return state;
            }
            return Object.assign(Object.assign({}, state), { past, present: newPresent, future: state.isCheckpoint
                    ? [state.present, ...state.future]
                    : state.future, isCheckpoint: true, undoRedoCounter: state.undoRedoCounter + 1 });
        }
        if (action.type === REDO) {
            const [newPresent, ...future] = state.future;
            if (!newPresent) {
                return state;
            }
            return Object.assign(Object.assign({}, state), { past: state.isCheckpoint ? [state.present, ...state.past] : state.past, present: newPresent, future, isCheckpoint: true, undoRedoCounter: state.undoRedoCounter + 1 });
        }
        const newPresent = reducer(state.present, action);
        if (omitUnmodified && compareStates(newPresent, state.present)) {
            return state;
        }
        if (useCheckpoints && !state.isCheckpoint) {
            return Object.assign(Object.assign({}, state), { past: state.past, present: newPresent, future: state.future, isCheckpoint: isNewCheckpoint, updateCounter: state.updateCounter + 1 });
        }
        return Object.assign(Object.assign({}, state), { past: firstElementsOfArray([state.present, ...state.past], max), present: newPresent, future: [], isCheckpoint: isNewCheckpoint, updateCounter: state.updateCounter + 1 });
    };
    const [state, dispatch] = Object(external_react_["useReducer"])(historyReducer, initialHistoryState);
    const { past, future, present, undoRedoCounter, updateCounter, } = state;
    const history = {
        canUndo: past.length > 0,
        canRedo: future.length > 0,
        undo: () => dispatch({ type: UNDO }),
        redo: () => dispatch({ type: REDO }),
        past,
        future,
        undoRedoCounter,
        updateCounter,
    };
    return [present, dispatch, history, state];
};
/* harmony default export */ var ts_useHistoryReducer = (useHistoryReducer);

// CONCATENATED MODULE: ./src/ts/index.ts

/* harmony default export */ var ts = __webpack_exports__["default"] = (ts_useHistoryReducer);


/***/ })
/******/ ]);
});