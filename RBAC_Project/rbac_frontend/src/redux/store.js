import { persistReducer, persistStore } from "redux-persist";
import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import AuthReducer from "./slice/AuthSlice";

const persistConfig = {
  key: "root",
  storage,
  //   whitelist: ["Auth"],
};

const PersistReducer = persistReducer(persistConfig, AuthReducer);

const store = configureStore({
  reducer: {
    auth: PersistReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export default store;
