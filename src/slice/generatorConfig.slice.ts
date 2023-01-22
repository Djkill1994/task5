import { createSlice } from "@reduxjs/toolkit";
import { generateItems } from "../hooks/useRegenerateUsersEffect";
import { faker } from "@faker-js/faker";
import { addErrorsToUsers } from "./helpers";

export interface IUser {
  index: number;
  id: string;
  fullName: string;
  address: string;
  phone: string;
}

interface IGeneratorConfigState {
  language: string;
  seed: number;
  errors: number;
  users: IUser[];
}

const initialState: IGeneratorConfigState = {
  seed: 0,
  language: "ru",
  errors: 0,
  users: generateItems(20, 0),
};

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
    generateMoreUsers: (state) => {
      faker.mersenne.seed(state.seed + state.users.length);
      state.users = [
        ...state.users,
        ...addErrorsToUsers(
          generateItems(10, state.users.length),
          state.errors
        ),
      ];
    },
    initUsers: (state) => {
      state.users = addErrorsToUsers(generateItems(20, 0), state.errors);
    },
  },
});

export const { setLanguage, setSeed, setErrors, generateMoreUsers, initUsers } =
  generatorConfigSlice.actions;
