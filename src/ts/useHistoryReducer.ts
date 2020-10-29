import { useReducer } from 'react'

const UNDO = 'USE_HISTORY_REDUCER_UNDO'
const REDO = 'USE_HISTORY_REDUCER_REDO'

type Reducer<T> = (state: T, action: Action) => T
type Action = {
  [key: string]: any
  historyCheckpoint?: boolean
  type: string
}
type HistoryState<State> = {
  past: State[]
  present: State
  future: State[]
  isCheckpoint: boolean
}

export type HistoryReducerControl<T> = {
  canUndo: boolean
  canRedo: boolean
  undo: () => void
  redo: () => void
  past: T[]
  future: T[]
}

type UseHistoryReducer = <T>(
  reducer: Reducer<T>,
  initialState: T,
  opts?: Partial<Options>
) => [T, React.Dispatch<Action>, HistoryReducerControl<T>]

type Options = {
  omitUnmodified?: boolean
  useCheckpoints?: boolean
}

const compareStates = (stateA: any, stateB: any) =>
  JSON.stringify(stateA) === JSON.stringify(stateB)

const useHistoryReducer: UseHistoryReducer = (
  reducer,
  initialState,
  opts = {}
) => {
  const { omitUnmodified, useCheckpoints }: Options = {
    omitUnmodified: true,
    useCheckpoints: false,
    ...opts,
  }

  const historyState: HistoryState<any> = {
    past: [],
    present: initialState,
    future: [],
    isCheckpoint: true,
  }

  const historyReducer = (state, action: Action) => {
    const isNewCheckpoint = useCheckpoints ? !!action.historyCheckpoint : true

    if (action.type === UNDO) {
      const [newPresent, ...past] = state.past

      if (!newPresent) {
        return state
      }

      return {
        past,
        present: newPresent,
        future: state.isCheckpoint
          ? [state.present, ...state.future]
          : state.future,
        isCheckpoint: true,
      }
    }

    if (action.type === REDO) {
      const [newPresent, ...future] = state.future

      if (!newPresent) {
        return state
      }

      return {
        past: state.isCheckpoint ? [state.present, ...state.past] : state.past,
        present: newPresent,
        future,
        isCheckpoint: true,
      }
    }

    const newPresent = reducer(state.present, action)

    if (omitUnmodified && compareStates(newPresent, state.present)) {
      return state
    }

    if (useCheckpoints && !state.isCheckpoint) {
      return {
        past: state.past,
        present: newPresent,
        future: state.future,
        isCheckpoint: isNewCheckpoint,
      }
    }

    return {
      past: [state.present, ...state.past],
      present: newPresent,
      future: [],
      isCheckpoint: isNewCheckpoint,
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
