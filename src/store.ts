import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { generatorConfigSlice } from "./slice/generatorConfig.slice";

export const store = configureStore({
  reducer: {
    generatorConfig: generatorConfigSlice.reducer,
  },
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
