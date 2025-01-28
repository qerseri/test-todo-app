import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "./slices/todo-slice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "root",
    storage,
};

const persistedReducer = persistReducer(persistConfig, todoSlice);

const store = configureStore({
    reducer: {
        todo: persistedReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
            },
        }),
});
const persistor = persistStore(store);

export { store, persistor };

export type rootState = ReturnType<typeof store.getState>;
