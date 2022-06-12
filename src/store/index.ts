import { configureStore, getDefaultMiddleware,combineReducers } from '@reduxjs/toolkit';
import giphyReducer from "./giphy";


import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const middleware = [...getDefaultMiddleware({
    serializableCheck: false
}
)];


const rootReducer = combineReducers({
    giphy: giphyReducer,

})

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: [ ],
  };
  
  // Middleware: Redux Persist Persisted Reducer
  const persistedReducer = persistReducer(persistConfig, rootReducer);


const store =  configureStore({
    reducer: persistedReducer,
    middleware
});

let persistor = persistStore(store);

export type RootState = ReturnType<typeof persistedReducer>
export type AppDispatch = typeof store.dispatch

export default store;
export {
    persistor,
};
