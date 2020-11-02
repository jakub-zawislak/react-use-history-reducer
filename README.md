# useHistoryReducer react hook

It's a hook that adds undo and redo functionality to the `useReducer`.

There is already a few such libraries, but this one is easiest to use.
You don't need to modify your existing reducer to use this lib.

[Demo](https://jakub-zawislak.github.io/react-use-history-reducer/)

## Installation

```
yarn add react-use-history-reducer
```

For example, you want to add the history capability to this component:

```jsx
import React, { useReducer } from 'react'

export const MyComponent = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <div>
      ...
    </div>
  )
}
```

This is all you need to do:

```jsx
import React from 'react'
import useHistoryReducer from 'react-use-history-reducer'

export const MyComponent = () => {
  const [state, dispatch, history] = useHistoryReducer(reducer, initialState)

  return (
    <div>
      <button disabled={!history.canUndo} onClick={history.undo}>
        Undo
      </button>
      <button disabled={!history.canRedo} onClick={history.redo}>
        Redo
      </button>
      ...
    </div>
  )
}
```

## Options

You can pass options in a third argument

```jsx
const [state, dispatch, history] = useHistoryReducer(reducer, initialState, {
  omitUnmodified: true,
  useCheckpoints: false,
})
```

| Option         | Type    | Default   | Description                                                                                                                                 |
|----------------|---------|-----------|---------------------------------------------------------------------------------------------------------------------------------------------|
| omitUnmodified | boolean | true      | If it's true, it doesn't push a new state to the history, if it's the same as a previous one. It compares states using the `JSON.stringify` |
| useCheckpoints | boolean | false     | Enables checkpoints support. With this option you have to pass `historyCheckpoint: true` to the action to add state to history              |
| max            | number  | undefined | Max items length of history                                                                                                                 |

## The `history` object

`history` is a third element in list returned by `useHistoryReducer`.

```jsx
const [state, dispatch, history] = useHistoryReducer(reducer, initialState)
```

It has these properties:

| Property        | Type     | Description                                                                                          |
|-----------------|----------|------------------------------------------------------------------------------------------------------|
| undo            | function | Call it to undo                                                                                      |
| redo            | function | Call it to redo                                                                                      |
| canUndo         | boolean  | Check if you can undo                                                                                |
| canRedo         | boolean  | Check if you can redo                                                                                |
| past            | state[]  | Past states                                                                                          |
| future          | state[]  | Future states                                                                                        |
| undoRedoCounter | number   | Number of undo and redo actions. Can be used if we want to reload some component on undo/redo click  |

## Development

```
yarn run storybook
```
