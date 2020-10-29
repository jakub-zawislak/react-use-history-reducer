import { useReducer } from 'react'

const UNDO = 'USE_HISTORY_REDUCER_UNDO'
const REDO = 'USE_HISTORY_REDUCER_REDO'

type Reducer<T> = (state: T, action: Action) => T
type Action = {
  [key: string]: any
  type: string
}
type HistoryState<State> = {
  past: State[]
  present: State
  future: State[]
}

type UseHistoryReducer = <T>(
  reducer: Reducer<T>,
  initialState: T,
  opts?: Partial<Options>
) => [
  T,
  React.Dispatch<Action>,
  {
    canUndo: boolean
    canRedo: boolean
    undo: () => void
    redo: () => void
    past: T[]
    future: T[]
  }
]

type Options = {
  omitUnmodified?: boolean
}

const compareStates = (stateA: any, stateB: any) =>
  JSON.stringify(stateA) === JSON.stringify(stateB)

const useHistoryReducer: UseHistoryReducer = (
  reducer,
  initialState,
  opts = {}
) => {
  const { omitUnmodified }: Options = {
    omitUnmodified: true,
    ...opts,
  }

  const historyState: HistoryState<any> = {
    past: [],
    present: initialState,
    future: [],
  }

  const historyReducer = (state, action: Action) => {
    if (action.type === UNDO) {
      const [newPresent, ...past] = state.past

      if (!newPresent) {
        return state
      }

      return {
        past,
        present: newPresent,
        future: [state.present, ...state.future],
      }
    }

    if (action.type === REDO) {
      const [newPresent, ...future] = state.future

      if (!newPresent) {
        return state
      }

      return {
        past: [state.present, ...state.past],
        present: newPresent,
        future,
      }
    }

    const newPresent = reducer(state.present, action)

    if (omitUnmodified && compareStates(newPresent, state.present)) {
      return state
    }

    return {
      past: [state.present, ...state.past],
      present: newPresent,
      future: [],
    }
  }

  const [state, dispatch] = useReducer(historyReducer, historyState)

  const { past, future, present } = state as HistoryState<any>

  const history = {
    canUndo: past.length > 0,
    canRedo: future.length > 0,
    undo: () => dispatch({ type: UNDO }),
    redo: () => dispatch({ type: REDO }),
    past,
    future,
  }

  return [present, dispatch, history]
}

export default useHistoryReducer
