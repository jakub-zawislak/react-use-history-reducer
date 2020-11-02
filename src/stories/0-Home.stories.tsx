import React from 'react'
import useHistoryReducer from '../ts'

export default {
  title: 'Home',
}

type State = {
  count: number
}

type Action = ActionIncremenet | ActionDecrement

type ActionBase = {
  type: string
  historyCheckpoint?: boolean
}

type ActionIncremenet = ActionBase & {
  type: 'increment'
}

type ActionDecrement = ActionBase & {
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
  const [state, dispatch, history] = useHistoryReducer(reducer, initialState, {
    omitUnmodified: true,
  })

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

export const MaxLength = () => {
  const [state, dispatch, history] = useHistoryReducer(reducer, initialState, {
    omitUnmodified: true,
    max: 3,
  })

  return (
    <div>
      <div>The max length is 3</div>
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

export const Breakpoints = () => {
  const [state, dispatch, history] = useHistoryReducer(reducer, initialState, {
    omitUnmodified: true,
    useCheckpoints: true,
  })

  console.log(state.count, state.count % 3 == 0)

  return (
    <div>
      <div>Breakpoints are on every third number ()</div>
      <div>Count: {state.count}</div>
      <br />
      <div>
        <button
          onClick={() =>
            dispatch({
              type: 'decrement',
              historyCheckpoint: state.count % 3 == 2,
            })
          }
        >
          --
        </button>{' '}
        <button
          onClick={() =>
            dispatch({
              type: 'increment',
              historyCheckpoint: state.count % 3 == 2,
            })
          }
        >
          ++
        </button>
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

export const Counter = () => {
  const [state, dispatch, history] = useHistoryReducer(reducer, initialState, {
    omitUnmodified: true,
  })

  return (
    <div>
      <div>Count: {state.count}</div>
      <div>Undo / Redo counter: {history.undoRedoCounter}</div>
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
