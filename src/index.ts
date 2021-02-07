/**
 * Red-goodies.
 *
 * @license Apache-2.0
 * @author drmats
 */




/**
 * @see {@link module:redux}
 */
export type {
    Action,
    ActionCreator,
    EmptyAction,
    EmptyActionCreator,
    EmptyActionCreators,
    PayloadAction,
    PayloadActionCreator,
    PayloadActionCreators,
    ReduxCompatAction,
    ReduxCompatAnyAction,
} from "./redux/action";
export type {
    Reducer,
    ReduxCompatReducer,
} from "./redux/reducer";
export {
    actionCreators,
    bindActionCreator,
    bindActionCreators,
    bindActionCreatorsTree,
    createReducer,
    defineActionCreator,
    emptyActionCreators,
    isNumberActionType,
    isStringActionType,
    isWithPayload,
    payloadActionCreators,
    sliceReducer,
} from "./redux";
export * as redux from "./redux";
