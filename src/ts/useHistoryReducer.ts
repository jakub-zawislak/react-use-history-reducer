import { useReducer } from 'react'

const UNDO = 'USE_HISTORY_REDUCER_UNDO'
const REDO = 'USE_HISTORY_REDUCER_REDO'

type Reducer<T> = (state: T, action: Action) => T

type Action = {
  [key: string]: any
  historyCheckpoint?: boolean
  type: string
}

export type HistoryState<State> = {
  past: State[]
  present: State
  future: State[]
  isCheckpoint: boolean
  undoRedoCounter: number
  updateCounter: number
}

export type HistoryReducerControl<T> = {
  canUndo: boolean
  canRedo: boolean
  undo: () => void
  redo: () => void
  past: T[]
  future: T[]
  undoRedoCounter: number
  updateCounter: number
}

type UseHistoryReducer = <T>(
  reducer: Reducer<T>,
  initialState: T,
  opts?: Partial<Options<T>>
) => [T, React.Dispatch<Action>, HistoryReducerControl<T>, HistoryState<T>]

type Options<T> = {
  omitUnmodified?: boolean
  useCheckpoints?: boolean
  max?: number | undefined
  initialHistoryState?: HistoryState<T>
}

const compareStates = (stateA: any, stateB: any) =>
  JSON.stringify(stateA) === JSON.stringify(stateB)

const firstElementsOfArray = <T>(array: T[], n: number | undefined): T[] => {
  return typeof n === 'undefined' ? array : array.slice(0, n)
}

const useHistoryReducer: UseHistoryReducer = (
  reducer,
  initialState,
  opts = {}
) => {
  const {
    omitUnmodified,
    useCheckpoints,
    max,
    initialHistoryState,
  }: Options<any> = {
    omitUnmodified: true,
    useCheckpoints: false,
    max: undefined,
    initialHistoryState: {
      past: [],
      present: initialState,
      future: [],
      isCheckpoint: true,
      undoRedoCounter: 0,
      updateCounter: 0,
    },
    ...opts,
  }

  const historyReducer = (state, action: Action) => {
    const isNewCheckpoint = useCheckpoints ? !!action.historyCheckpoint : true

    if (action.type === UNDO) {
      const [newPresent, ...past] = state.past

      if (!newPresent) {
        return state
      }

      return {
        ...state,
        past,
        present: newPresent,
        future: state.isCheckpoint
          ? [state.present, ...state.future]
          : state.future,
        isCheckpoint: true,
        undoRedoCounter: state.undoRedoCounter + 1,
      }
    }

    if (action.type === REDO) {
      const [newPresent, ...future] = state.future

      if (!newPresent) {
        return state
      }

      return {
        ...state,
        past: state.isCheckpoint ? [state.present, ...state.past] : state.past,
        present: newPresent,
        future,
        isCheckpoint: true,
        undoRedoCounter: state.undoRedoCounter + 1,
      }
    }

    const newPresent = reducer(state.present, action)

    if (omitUnmodified && compareStates(newPresent, state.present)) {
      return state
    }

    if (useCheckpoints && !state.isCheckpoint) {
      return {
        ...state,
        past: state.past,
        present: newPresent,
        future: state.future,
        isCheckpoint: isNewCheckpoint,
        updateCounter: state.updateCounter + 1,
      }
    }

    return {
      ...state,
      past: firstElementsOfArray([state.present, ...state.past], max),
      present: newPresent,
      future: [],
      isCheckpoint: isNewCheckpoint,
      updateCounter: state.updateCounter + 1,
    }
  }

  const [state, dispatch] = useReducer(historyReducer, initialHistoryState)

  const {
    past,
    future,
    present,
    undoRedoCounter,
    updateCounter,
  } = state as HistoryState<any>

  const history = {
    canUndo: past.length > 0,
    canRedo: future.length > 0,
    undo: () => dispatch({ type: UNDO }),
    redo: () => dispatch({ type: REDO }),
    past,
    future,
    undoRedoCounter,
    updateCounter,
  }

  return [present, dispatch, history, state]
}

export default useHistoryReducer
