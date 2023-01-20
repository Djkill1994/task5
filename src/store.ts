import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { usersApi } from "./api/users.api";
import { rtkQueryMessenger } from "./middleware/rtkQueryMessenger";
import { generatorConfigSlice } from "./slice/generatorConfig.slice";

export const store = configureStore({
  reducer: {
    generatorConfig: generatorConfigSlice.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(rtkQueryMessenger, usersApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
