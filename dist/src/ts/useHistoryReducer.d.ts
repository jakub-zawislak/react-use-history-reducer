/// <reference types="react" />
declare type Reducer<T> = (state: T, action: Action) => T;
declare type Action = {
    [key: string]: any;
    type: string;
};
declare type UseHistoryReducer = <T>(reducer: Reducer<T>, initialState: T, opts?: Partial<Options>) => [T, React.Dispatch<Action>, {
    canUndo: boolean;
    canRedo: boolean;
    undo: () => void;
    redo: () => void;
    past: T[];
    future: T[];
}];
declare type Options = {
    omitUnmodified?: boolean;
};
declare const useHistoryReducer: UseHistoryReducer;
export default useHistoryReducer;
