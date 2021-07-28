import { createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import testReducer from './reducers/TestReducer';
import { userReducer } from './reducers/UserReducer';

const middlewares = [thunk];
if (process.env.NODE_ENV === 'development') {
	middlewares.push(logger);
}

const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);

const rootReducer = combineReducers({
  testReducer,
  userReducer
});

const store = createStoreWithMiddleware(rootReducer);

export {
  store
};

export type RootState = ReturnType<typeof store.getState>

export const appDispatch = store.dispatch;