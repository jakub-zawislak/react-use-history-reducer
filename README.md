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
  omitUnmodified: false,
})
```

| Option         | Type    | Default | Description                                                                                                                                 |
|----------------|---------|---------|---------------------------------------------------------------------------------------------------------------------------------------------|
| omitUnmodified | boolean | true    | If it's true, it doesn't push a new state to the history, if it's the same as a previous one. It compares states using the `JSON.stringify` |

## Development

```
yarn run storybook
```
