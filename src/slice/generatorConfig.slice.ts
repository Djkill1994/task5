import { createSlice } from "@reduxjs/toolkit";

interface IGeneratorConfigState {
  language: string;
  seed?: number;
  errors: number;
}

const initialState: IGeneratorConfigState = { language: "ru", errors: 0 };

export const generatorConfigSlice = createSlice({
  name: "generatorConfig",
  initialState,
  reducers: {
    setLanguage: (state, { payload }) => {
      state.language = payload;
    },
    setSeed: (state, { payload }) => {
      state.seed = payload;
    },
    setErrors: (state, { payload }) => {
      state.errors = payload;
    },
  },
});

export const { setLanguage, setSeed, setErrors } = generatorConfigSlice.actions;
