import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { apiSlice } from "./api/apiSlice";
import authReducer from "../features/auth/authSlice";

const persistConfig = {
  key: "root",
  storage,
};

// Combine multiple reducers if needed
const rootReducer = combineReducers({
  auth: authReducer,
  // Add other reducers as needed
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    persisted: persistedReducer, // You can use any key you prefer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);
// Define the AppDispatch type
export type AppDispatch = typeof store.dispatch;
// Define RootState type
export type RootState = ReturnType<typeof store.getState>;
