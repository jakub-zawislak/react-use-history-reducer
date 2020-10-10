/// <reference types="react" />
declare type State = any;
declare type Reducer = (state: State, action: Action) => State;
declare type Action = {
    [key: string]: any;
    type: string;
};
declare type UseHistoryReducer = (reducer: Reducer, initialState: State, opts: Partial<Options>) => [State, React.Dispatch<Action>, {
    canUndo: boolean;
    canRedo: boolean;
    undo: () => void;
    redo: () => void;
}];
declare type Options = {
    omitUnmodified?: boolean;
};
export declare const useHistoryReducer: UseHistoryReducer;
export {};
