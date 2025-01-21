import { useState, useEffect } from "react";

let globalState = {};
let listeners = [];
let actions = {};

export function useStore(shouldListen = true) {
  const setState = useState(globalState)[1];

  function dispatch(actionsIdentifier, payload) {
    const newState = actions[actionsIdentifier](globalState, payload);
    globalState = { ...globalState, ...newState };

    for (const listener of listeners) {
      listener(globalState);
    }
  }

  useEffect(() => {
    if (shouldListen) {
      listeners.push(setState);
    }

    return () => {
      listeners = listeners.filter((li) => li !== setState);
    };
  }, [setState, shouldListen]);

  return [globalState, dispatch];
}

export function initStore(userActions, initialState) {
  if (initialState) {
    globalState = { ...globalState, ...initialState };
  }
  actions = { ...actions, ...userActions };
}
