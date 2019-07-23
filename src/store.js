import { createStore, applyMiddleware } from 'redux';
import rootReducer from './RootReducer';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const persistStore = getPersistStore();

const composeEnhancers = composeWithDevTools({});

export const store = createStore(
  rootReducer,
  persistStore,
  composeEnhancers(
    applyMiddleware(thunk)
  )
);

store.subscribe(() => {
  sessionStorage.setItem('reduxState', JSON.stringify(store.getState()))
});

function getPersistStore() {
  try {
    const serializedState = sessionStorage.getItem('reduxState');
    return serializedState ?
      JSON.parse(serializedState) :
      undefined;
  } catch (e) {
    return undefined;
  }
}
