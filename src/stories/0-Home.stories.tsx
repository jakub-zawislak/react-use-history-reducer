import React from 'react'
import useHistoryReducer from '../ts'

export default {
  title: 'Home',
}

type State = {
  count: number
}

type Action = ActionIncremenet | ActionDecrement

type ActionIncremenet = {
  type: 'increment'
}

type ActionDecrement = {
  type: 'decrement'
}

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 }
    case 'decrement':
      return { count: state.count - 1 }
  }
}

const initialState = { count: 0 }

export const Basic = () => {
  const [state, dispatch, history] = useHistoryReducer<State>(
    reducer,
    initialState,
    {
      omitUnmodified: true,
    }
  )

  return (
    <div>
      <div>Count: {state.count}</div>
      <br />
      <div>
        <button onClick={() => dispatch({ type: 'decrement' })}>--</button>{' '}
        <button onClick={() => dispatch({ type: 'increment' })}>++</button>
      </div>
      <br />
      <div>
        <button disabled={!history.canUndo} onClick={history.undo}>
          undo
        </button>{' '}
        <button disabled={!history.canRedo} onClick={history.redo}>
          redo
        </button>
      </div>
    </div>
  )
}
