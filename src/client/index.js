import {
  ensureIntlSupport, ensureReactIntlSupport, ensureMessages,
  createReduxStore, createRootReducer,
  createApolloClient,
  renderApp
} from "edgestack"

import Root from "Root"
import State from "State"



/*
==================================================================
  CLIENT :: APPLICATION ENTRY POINT
==================================================================
*/

let apolloClient
let reduxStore
let messages

function getMessagesUrl(language) {
  return require("!file-loader!../messages/" + language + ".json")
}

Promise
  .all([
    ensureIntlSupport(window.APP_STATE.ssr.locale),
    ensureReactIntlSupport(window.APP_STATE.ssr.language),
    ensureMessages(getMessagesUrl(window.APP_STATE.ssr.language))
  ])
  .then((results) => {
    // Store messages in global variable
    messages = results[2]

    apolloClient = createApolloClient({ initialState: window.APP_STATE })

    reduxStore = createReduxStore({
      reducers: State.getReducers(),
      enhancers: State.getEnhancers(),
      middlewares: State.getMiddlewares(),
      initialState: window.APP_STATE,
      apolloClient
    })

    renderApp(Root, { apolloClient, reduxStore, messages })
  })



/*
==================================================================
  CLIENT :: APPLICATION HOT LOADING
==================================================================
*/

// The following is needed so that we can hot reload our App.
if (process.env.NODE_ENV === "development" && module.hot)
{
  // Accept changes to this file for hot reloading.
  module.hot.accept("./index")

  // Any changes to our App will cause a hotload re-render.
  module.hot.accept("../Root", () =>
  {
    const nextRoot = require("../Root").default
    renderApp(nextRoot, { apolloClient, reduxStore, messages })
  })

  module.hot.accept("../State", () =>
  {
    const nextState = require("../State").default
    const nextRootReducer = createRootReducer(nextState.getReducers())

    reduxStore.replaceReducer(nextRootReducer)
  })
}
