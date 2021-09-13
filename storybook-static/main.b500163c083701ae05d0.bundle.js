(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{296:function(module,exports,__webpack_require__){__webpack_require__(297),__webpack_require__(449),__webpack_require__(450),module.exports=__webpack_require__(638)},363:function(module,exports){},450:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__(240)},638:function(module,exports,__webpack_require__){"use strict";(function(module){(0,__webpack_require__(240).configure)([__webpack_require__(639)],module,!1)}).call(this,__webpack_require__(106)(module))},639:function(module,exports,__webpack_require__){var map={"./stories/0-Home.stories.tsx":640};function webpackContext(req){var id=webpackContextResolve(req);return __webpack_require__(id)}function webpackContextResolve(req){if(!__webpack_require__.o(map,req)){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}return map[req]}webpackContext.keys=function webpackContextKeys(){return Object.keys(map)},webpackContext.resolve=webpackContextResolve,module.exports=webpackContext,webpackContext.id=639},640:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,"Basic",(function(){return _0_Home_stories_Basic})),__webpack_require__.d(__webpack_exports__,"InitialHistoryStory",(function(){return _0_Home_stories_InitialHistoryStory})),__webpack_require__.d(__webpack_exports__,"MaxLength",(function(){return _0_Home_stories_MaxLength})),__webpack_require__.d(__webpack_exports__,"Breakpoints",(function(){return _0_Home_stories_Breakpoints})),__webpack_require__.d(__webpack_exports__,"Counter",(function(){return _0_Home_stories_Counter}));var slicedToArray=__webpack_require__(57),react=__webpack_require__(0),react_default=__webpack_require__.n(react),toConsumableArray=__webpack_require__(130),toArray=__webpack_require__(193),objectSpread2=__webpack_require__(34),UNDO="USE_HISTORY_REDUCER_UNDO",REDO="USE_HISTORY_REDUCER_REDO",compareStates=function compareStates(stateA,stateB){return JSON.stringify(stateA)===JSON.stringify(stateB)},firstElementsOfArray=function firstElementsOfArray(array,n){return void 0===n?array:array.slice(0,n)},ts=function useHistoryReducer(reducer,initialState){var opts=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},_omitUnmodified$useCh=Object(objectSpread2.a)({omitUnmodified:!0,useCheckpoints:!1,max:void 0,initialHistoryState:{past:[],present:initialState,future:[],isCheckpoint:!0,undoRedoCounter:0,updateCounter:0}},opts),omitUnmodified=_omitUnmodified$useCh.omitUnmodified,useCheckpoints=_omitUnmodified$useCh.useCheckpoints,max=_omitUnmodified$useCh.max,initialHistoryState=_omitUnmodified$useCh.initialHistoryState,historyReducer=function historyReducer(state,action){var isNewCheckpoint=!useCheckpoints||!!action.historyCheckpoint;if(action.type===UNDO){var _state$past=Object(toArray.a)(state.past),_newPresent=_state$past[0],_past=_state$past.slice(1);return _newPresent?Object(objectSpread2.a)(Object(objectSpread2.a)({},state),{},{past:_past,present:_newPresent,future:state.isCheckpoint?[state.present].concat(Object(toConsumableArray.a)(state.future)):state.future,isCheckpoint:!0,undoRedoCounter:state.undoRedoCounter+1}):state}if(action.type===REDO){var _state$future=Object(toArray.a)(state.future),_newPresent2=_state$future[0],_future=_state$future.slice(1);return _newPresent2?Object(objectSpread2.a)(Object(objectSpread2.a)({},state),{},{past:state.isCheckpoint?[state.present].concat(Object(toConsumableArray.a)(state.past)):state.past,present:_newPresent2,future:_future,isCheckpoint:!0,undoRedoCounter:state.undoRedoCounter+1}):state}var newPresent=reducer(state.present,action);return omitUnmodified&&compareStates(newPresent,state.present)?state:useCheckpoints&&!state.isCheckpoint?Object(objectSpread2.a)(Object(objectSpread2.a)({},state),{},{past:state.past,present:newPresent,future:state.future,isCheckpoint:isNewCheckpoint,updateCounter:state.updateCounter+1}):Object(objectSpread2.a)(Object(objectSpread2.a)({},state),{},{past:firstElementsOfArray([state.present].concat(Object(toConsumableArray.a)(state.past)),max),present:newPresent,future:[],isCheckpoint:isNewCheckpoint,updateCounter:state.updateCounter+1})},_useReducer=Object(react.useReducer)(historyReducer,initialHistoryState),_useReducer2=Object(slicedToArray.a)(_useReducer,2),state=_useReducer2[0],dispatch=_useReducer2[1],_ref=state,past=_ref.past,future=_ref.future,present=_ref.present,undoRedoCounter=_ref.undoRedoCounter,updateCounter=_ref.updateCounter,history={canUndo:past.length>0,canRedo:future.length>0,undo:function undo(){return dispatch({type:UNDO})},redo:function redo(){return dispatch({type:REDO})},past:past,future:future,undoRedoCounter:undoRedoCounter,updateCounter:updateCounter};return[present,dispatch,history,state]},_0_Home_stories_reducer=(__webpack_exports__.default={parameters:{storySource:{source:"import React from 'react'\nimport useHistoryReducer from '../ts'\n\nexport default {\n  title: 'Home',\n}\n\ntype State = {\n  count: number\n}\n\ntype Action = ActionIncremenet | ActionDecrement\n\ntype ActionBase = {\n  type: string\n  historyCheckpoint?: boolean\n}\n\ntype ActionIncremenet = ActionBase & {\n  type: 'increment'\n}\n\ntype ActionDecrement = ActionBase & {\n  type: 'decrement'\n}\n\nconst reducer = (state: State, action: Action) => {\n  switch (action.type) {\n    case 'increment':\n      return { count: state.count + 1 }\n    case 'decrement':\n      return { count: state.count - 1 }\n  }\n}\n\nconst initialState = { count: 0 }\n\nexport const Basic = () => {\n  const [state, dispatch, history] = useHistoryReducer(reducer, initialState, {\n    omitUnmodified: true,\n  })\n\n  return (\n    <div>\n      <div>Count: {state.count}</div>\n      <br />\n      <div>\n        <button onClick={() => dispatch({ type: 'decrement' })}>--</button>{' '}\n        <button onClick={() => dispatch({ type: 'increment' })}>++</button>\n      </div>\n      <br />\n      <div>\n        <button disabled={!history.canUndo} onClick={history.undo}>\n          undo\n        </button>{' '}\n        <button disabled={!history.canRedo} onClick={history.redo}>\n          redo\n        </button>\n      </div>\n    </div>\n  )\n}\n\nexport const InitialHistoryStory = () => {\n  const initialHistoryState = {\n    past: [{ count: 1 }, { count: 0 }],\n    present: { count: 2 },\n    future: [],\n    isCheckpoint: true,\n    undoRedoCounter: 0,\n    updateCounter: 2,\n  }\n\n  const [state, dispatch, history] = useHistoryReducer(reducer, initialState, {\n    omitUnmodified: true,\n    initialHistoryState,\n  })\n\n  return (\n    <div>\n      <div>Count: {state.count}</div>\n      <br />\n      <div>\n        <button onClick={() => dispatch({ type: 'decrement' })}>--</button>{' '}\n        <button onClick={() => dispatch({ type: 'increment' })}>++</button>\n      </div>\n      <br />\n      <div>\n        <button disabled={!history.canUndo} onClick={history.undo}>\n          undo\n        </button>{' '}\n        <button disabled={!history.canRedo} onClick={history.redo}>\n          redo\n        </button>\n      </div>\n    </div>\n  )\n}\n\nexport const MaxLength = () => {\n  const [state, dispatch, history] = useHistoryReducer(reducer, initialState, {\n    omitUnmodified: true,\n    max: 3,\n  })\n\n  return (\n    <div>\n      <div>The max length is 3</div>\n      <div>Count: {state.count}</div>\n      <br />\n      <div>\n        <button onClick={() => dispatch({ type: 'decrement' })}>--</button>{' '}\n        <button onClick={() => dispatch({ type: 'increment' })}>++</button>\n      </div>\n      <br />\n      <div>\n        <button disabled={!history.canUndo} onClick={history.undo}>\n          undo\n        </button>{' '}\n        <button disabled={!history.canRedo} onClick={history.redo}>\n          redo\n        </button>\n      </div>\n    </div>\n  )\n}\n\nexport const Breakpoints = () => {\n  const [state, dispatch, history] = useHistoryReducer(reducer, initialState, {\n    omitUnmodified: true,\n    useCheckpoints: true,\n  })\n\n  console.log(state.count, state.count % 3 == 0)\n\n  return (\n    <div>\n      <div>Breakpoints are on every third number ()</div>\n      <div>Count: {state.count}</div>\n      <br />\n      <div>\n        <button\n          onClick={() =>\n            dispatch({\n              type: 'decrement',\n              historyCheckpoint: state.count % 3 == 2,\n            })\n          }\n        >\n          --\n        </button>{' '}\n        <button\n          onClick={() =>\n            dispatch({\n              type: 'increment',\n              historyCheckpoint: state.count % 3 == 2,\n            })\n          }\n        >\n          ++\n        </button>\n      </div>\n      <br />\n      <div>\n        <button disabled={!history.canUndo} onClick={history.undo}>\n          undo\n        </button>{' '}\n        <button disabled={!history.canRedo} onClick={history.redo}>\n          redo\n        </button>\n      </div>\n    </div>\n  )\n}\n\nexport const Counter = () => {\n  const [state, dispatch, history] = useHistoryReducer(reducer, initialState, {\n    omitUnmodified: true,\n  })\n\n  return (\n    <div>\n      <div>Count: {state.count}</div>\n      <div>Undo / Redo counter: {history.undoRedoCounter}</div>\n      <div>Update counter: {history.updateCounter}</div>\n      <br />\n      <div>\n        <button onClick={() => dispatch({ type: 'decrement' })}>--</button>{' '}\n        <button onClick={() => dispatch({ type: 'increment' })}>++</button>\n      </div>\n      <br />\n      <div>\n        <button disabled={!history.canUndo} onClick={history.undo}>\n          undo\n        </button>{' '}\n        <button disabled={!history.canRedo} onClick={history.redo}>\n          redo\n        </button>\n      </div>\n    </div>\n  )\n}\n",locationsMap:{basic:{startLoc:{col:21,line:38},endLoc:{col:1,line:62},startBody:{col:21,line:38},endBody:{col:1,line:62}},"initial-history-story":{startLoc:{col:35,line:64},endLoc:{col:1,line:98},startBody:{col:35,line:64},endBody:{col:1,line:98}},"max-length":{startLoc:{col:25,line:100},endLoc:{col:1,line:126},startBody:{col:25,line:100},endBody:{col:1,line:126}},breakpoints:{startLoc:{col:27,line:128},endLoc:{col:1,line:174},startBody:{col:27,line:128},endBody:{col:1,line:174}},counter:{startLoc:{col:23,line:176},endLoc:{col:1,line:202},startBody:{col:23,line:176},endBody:{col:1,line:202}}}}},title:"Home"},function reducer(state,action){switch(action.type){case"increment":return{count:state.count+1};case"decrement":return{count:state.count-1}}}),_0_Home_stories_initialState={count:0},_0_Home_stories_Basic=function Basic(){var _useHistoryReducer=ts(_0_Home_stories_reducer,_0_Home_stories_initialState,{omitUnmodified:!0}),_useHistoryReducer2=Object(slicedToArray.a)(_useHistoryReducer,3),state=_useHistoryReducer2[0],dispatch=_useHistoryReducer2[1],history=_useHistoryReducer2[2];return react_default.a.createElement("div",null,react_default.a.createElement("div",null,"Count: ",state.count),react_default.a.createElement("br",null),react_default.a.createElement("div",null,react_default.a.createElement("button",{onClick:function onClick(){return dispatch({type:"decrement"})}},"--")," ",react_default.a.createElement("button",{onClick:function onClick(){return dispatch({type:"increment"})}},"++")),react_default.a.createElement("br",null),react_default.a.createElement("div",null,react_default.a.createElement("button",{disabled:!history.canUndo,onClick:history.undo},"undo")," ",react_default.a.createElement("button",{disabled:!history.canRedo,onClick:history.redo},"redo")))},_0_Home_stories_InitialHistoryStory=function InitialHistoryStory(){var _useHistoryReducer3=ts(_0_Home_stories_reducer,_0_Home_stories_initialState,{omitUnmodified:!0,initialHistoryState:{past:[{count:1},{count:0}],present:{count:2},future:[],isCheckpoint:!0,undoRedoCounter:0,updateCounter:2}}),_useHistoryReducer4=Object(slicedToArray.a)(_useHistoryReducer3,3),state=_useHistoryReducer4[0],dispatch=_useHistoryReducer4[1],history=_useHistoryReducer4[2];return react_default.a.createElement("div",null,react_default.a.createElement("div",null,"Count: ",state.count),react_default.a.createElement("br",null),react_default.a.createElement("div",null,react_default.a.createElement("button",{onClick:function onClick(){return dispatch({type:"decrement"})}},"--")," ",react_default.a.createElement("button",{onClick:function onClick(){return dispatch({type:"increment"})}},"++")),react_default.a.createElement("br",null),react_default.a.createElement("div",null,react_default.a.createElement("button",{disabled:!history.canUndo,onClick:history.undo},"undo")," ",react_default.a.createElement("button",{disabled:!history.canRedo,onClick:history.redo},"redo")))},_0_Home_stories_MaxLength=function MaxLength(){var _useHistoryReducer5=ts(_0_Home_stories_reducer,_0_Home_stories_initialState,{omitUnmodified:!0,max:3}),_useHistoryReducer6=Object(slicedToArray.a)(_useHistoryReducer5,3),state=_useHistoryReducer6[0],dispatch=_useHistoryReducer6[1],history=_useHistoryReducer6[2];return react_default.a.createElement("div",null,react_default.a.createElement("div",null,"The max length is 3"),react_default.a.createElement("div",null,"Count: ",state.count),react_default.a.createElement("br",null),react_default.a.createElement("div",null,react_default.a.createElement("button",{onClick:function onClick(){return dispatch({type:"decrement"})}},"--")," ",react_default.a.createElement("button",{onClick:function onClick(){return dispatch({type:"increment"})}},"++")),react_default.a.createElement("br",null),react_default.a.createElement("div",null,react_default.a.createElement("button",{disabled:!history.canUndo,onClick:history.undo},"undo")," ",react_default.a.createElement("button",{disabled:!history.canRedo,onClick:history.redo},"redo")))},_0_Home_stories_Breakpoints=function Breakpoints(){var _useHistoryReducer7=ts(_0_Home_stories_reducer,_0_Home_stories_initialState,{omitUnmodified:!0,useCheckpoints:!0}),_useHistoryReducer8=Object(slicedToArray.a)(_useHistoryReducer7,3),state=_useHistoryReducer8[0],dispatch=_useHistoryReducer8[1],history=_useHistoryReducer8[2];return console.log(state.count,state.count%3==0),react_default.a.createElement("div",null,react_default.a.createElement("div",null,"Breakpoints are on every third number ()"),react_default.a.createElement("div",null,"Count: ",state.count),react_default.a.createElement("br",null),react_default.a.createElement("div",null,react_default.a.createElement("button",{onClick:function onClick(){return dispatch({type:"decrement",historyCheckpoint:state.count%3==2})}},"--")," ",react_default.a.createElement("button",{onClick:function onClick(){return dispatch({type:"increment",historyCheckpoint:state.count%3==2})}},"++")),react_default.a.createElement("br",null),react_default.a.createElement("div",null,react_default.a.createElement("button",{disabled:!history.canUndo,onClick:history.undo},"undo")," ",react_default.a.createElement("button",{disabled:!history.canRedo,onClick:history.redo},"redo")))},_0_Home_stories_Counter=function Counter(){var _useHistoryReducer9=ts(_0_Home_stories_reducer,_0_Home_stories_initialState,{omitUnmodified:!0}),_useHistoryReducer10=Object(slicedToArray.a)(_useHistoryReducer9,3),state=_useHistoryReducer10[0],dispatch=_useHistoryReducer10[1],history=_useHistoryReducer10[2];return react_default.a.createElement("div",null,react_default.a.createElement("div",null,"Count: ",state.count),react_default.a.createElement("div",null,"Undo / Redo counter: ",history.undoRedoCounter),react_default.a.createElement("div",null,"Update counter: ",history.updateCounter),react_default.a.createElement("br",null),react_default.a.createElement("div",null,react_default.a.createElement("button",{onClick:function onClick(){return dispatch({type:"decrement"})}},"--")," ",react_default.a.createElement("button",{onClick:function onClick(){return dispatch({type:"increment"})}},"++")),react_default.a.createElement("br",null),react_default.a.createElement("div",null,react_default.a.createElement("button",{disabled:!history.canUndo,onClick:history.undo},"undo")," ",react_default.a.createElement("button",{disabled:!history.canRedo,onClick:history.redo},"redo")))}}},[[296,1,2]]]);
//# sourceMappingURL=main.b500163c083701ae05d0.bundle.js.map