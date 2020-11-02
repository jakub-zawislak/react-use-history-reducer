/// <reference types="react" />
declare type Reducer<T> = (state: T, action: Action) => T;
declare type Action = {
    [key: string]: any;
    historyCheckpoint?: boolean;
    type: string;
};
export declare type HistoryReducerControl<T> = {
    canUndo: boolean;
    canRedo: boolean;
    undo: () => void;
    redo: () => void;
    past: T[];
    future: T[];
    undoRedoCounter: number;
    updateCounter: number;
};
declare type UseHistoryReducer = <T>(reducer: Reducer<T>, initialState: T, opts?: Partial<Options>) => [T, React.Dispatch<Action>, HistoryReducerControl<T>];
declare type Options = {
    omitUnmodified?: boolean;
    useCheckpoints?: boolean;
    max?: number | undefined;
};
declare const useHistoryReducer: UseHistoryReducer;
export default useHistoryReducer;
