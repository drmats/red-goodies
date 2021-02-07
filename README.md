# red-goodies

Statically typed goodies for **[redux](https://redux.js.org/)**.

[![npm version](https://img.shields.io/npm/v/red-goodies.svg)](https://www.npmjs.com/package/red-goodies)
[![GitHub code size](https://img.shields.io/github/languages/code-size/drmats/red-goodies.svg)](https://github.com/drmats/red-goodies)
[![GitHub tag](https://img.shields.io/github/tag/drmats/red-goodies.svg)](https://github.com/drmats/red-goodies)
[![npm license](https://img.shields.io/npm/l/red-goodies.svg)](https://www.npmjs.com/package/red-goodies)

```bash
$ npm i red-goodies
```

`<fancyBuzzwordUsageWarning>` It's **opinionated**. `</fancyBuzzwordUsageWarning>`

<br />




## ok, what's in here and how to use it?

1. actions as non-const enums (example `app/action_type.ts` file):
    ```typescript
    export enum AppActionType {
        RESET = "App/RESET",
        READY = "App/READY",
        NOT_READY = "App/NOT_READY",
        DELAYED = "App/DELAYED",
        CLEAR_ERROR = "App/CLEAR_ERROR",
    }
    ```

2. easy action creators - define only those carrying some payload, empty
    ones are defined automatically (example `app/action.ts` file):
    ```typescript
    import { actionCreators } from "red-goodies";
    import { AppActionType } from "./action_type";

    export default actionCreators(AppActionType, {
        READY: (error?: string) => ({ error }),
        DELAYED: (condition: boolean) => ({ condition }),
    });
    ```

3. slice of state (`app/state.ts`):
    ```typescript
    export default {
        // usual stuff
        ready: false,
        delayed: false,

        // last application error - example use
        // of "type predicate" matcher
        // (matching actions by payload content)
        error: null as string | null,

        // how many actions of this type
        // has been spawned? - somewhat artificial
        // example of "boolean" matcher usage
        // (matching actions using string
        // operations on their type)
        actionCount: 0,
    };
    ```

4. fantastic slice reducers (example `app/reducer.ts` file) with matchers:
    ```typescript
    import type { Action } from "red-goodies";
    import {
        isStringActionType,
        isWithPayload,
        sliceReducer,
    } from "red-goodies";
    import initState from "./state";
    import app from "./action";

    export default sliceReducer(initState) (
        (slice) => slice
            .handle(app.RESET, () => initState)

            // this action can carry `error` payload
            // but we're not interested in it (for now)
            .handle(app.READY, (state) => ({
                ...state, ready: true,
            })

            // this action is not carrying any payload
            // and was automatically defined by
            // call to `actionCreators()`
            .handle(app.NOT_READY, (state) => ({
                ...state, ready: false,
            })

            // this action is carrying simple payload and we can
            // destructure it immediately
            .handle(app.DELAYED, (state, { condition }) => ({
                ...state, delayed: condition,
            })

            // same situation as with `app.NOT_READY`
            // (shown here for completness of the example)
            .handle(app.CLEAR_ERROR, (state) => ({
                ...state, error: null,
            })

            // match all actions that carry payload with
            // `error` key ("type predicate" matcher)
            .match(
                (action): action is Action<{ error: string }> =>
                    isWithPayload(action) && action.payload.error,
                (state, { error }) => ({
                    ...state, error,
                }),
            )

            // match all actions whose `type` field starts with
            // `App/` prefix ("boolean" matcher)
            .match(
                (action) =>
                    isStringActionType(action) &&
                        action.type.startsWith("App/"),
                (state) => ({
                    ...state, actionCount: state.actionCount + 1,
                }),
            ),
    );
    ```

5. now, you can combine all of your slice reducers (and actions and thunks...)
    into nice trees (as you do usually) - example `state_logic.ts` file:
    ```typescript
    import appAction from "./app/action";
    import appReducer from "./app/reducer";

    export const action = {
        app: appAction,
        // ... and others
    };

    export const reducer = {
        app: appReducer,
        // ... and others
    };
    ```

6. slice reducers are compatible with regular redux flow:
    ```typescript
    import {
        createStore,
        combineReducers,
    } from "redux";
    import {
        bindActionCreatorsTree,
    } from "red-goodies";
    import {
        action,
        reducer,
    } from "./state_logic.ts";

    const rootReducer = combineReducers(reducer);

    // redux store creation
    const store = createStore(
        rootReducer,
        // ... and other usual stuff
    );

    // bound actions tree
    const act = bindActionCreatorsTree(
        action, store.dispatch,
    );
    ```


There's more to be happy about if you use
[IntelliSense](https://code.visualstudio.com/docs/editor/intellisense).
Really (examples will appear "next tuesday" 🤣️).

<br />




## inspiration

* amazing [Typesafe Actions](https://github.com/piotrwitek/typesafe-actions)
* briliant [Redux Toolkit](https://redux-toolkit.js.org/)

<br />




## documentation

> [API Reference](https://drmats.github.io/red-goodies/)

<br />




## namespace

### **static** redux

```javascript
redux
```

> ```javascript
> { actionCreators: [Function: actionCreators],
>   bindActionCreator: [Function: bindActionCreator],
>   bindActionCreators: [Function: bindActionCreators],
>   bindActionCreatorsTree: [Function: bindActionCreatorsTree],
>   createReducer: [Function: createReducer],
>   defineActionCreator: [Function: defineActionCreator],
>   emptyActionCreators: [Function: emptyActionCreators],
>   isNumberActionType: [Function: isNumberActionType],
>   isStringActionType: [Function: isStringActionType],
>   isWithPayload: [Function: isWithPayload],
>   payloadActionCreators: [Function: payloadActionCreators],
>   sliceReducer: [Function: sliceReducer] }
> ```

<br />




## notes

Go ahead and [file an issue](https://github.com/drmats/red-goodies/issues/new)
if you found a bug 🐞.

</br>




## support

You can support this project via [stellar][stellar] network:

* Payment address: [xcmats*keybase.io][xcmatspayment]
* Stellar account ID: [`GBYUN4PMACWBJ2CXVX2KID3WQOONPKZX2UL4J6ODMIRFCYOB3Z3C44UZ`][addressproof]

<br />




## license

**red-goodies** is released under the Apache License, Version 2.0. See the
[LICENSE](https://github.com/drmats/red-goodies/blob/master/LICENSE)
for more details.




[stellar]: https://learn.stellar.org
[xcmatspayment]: https://keybase.io/xcmats
[addressproof]: https://keybase.io/xcmats/sigchain#d0999a36b501c4818c15cf813f5a53da5bfe437875d92262be8d285bbb67614e22
