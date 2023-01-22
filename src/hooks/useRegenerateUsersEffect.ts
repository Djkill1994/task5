import { useEffect } from "react";
import { faker } from "@faker-js/faker";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { initUsers, IUser } from "../slice/generatorConfig.slice";

export const generateItems = (amount: number, prevLength: number): IUser[] => {
  const arr = Array.from(Array(amount));
  return arr.map((_, i) => ({
    index: i + prevLength,
    id: faker.random.numeric(5),
    fullName: faker.name.fullName(),
    address: faker.address.streetAddress(true),
    phone: faker.phone.number("(###) ### ## ##"),
  }));
};

export const useRegenerateUsersEffect = () => {
  const dispatch = useDispatch();
  const { language, seed, errors } = useSelector(
    (state: RootState) => state.generatorConfig
  );

  useEffect(() => {
    if (seed) {
      faker.mersenne.seed(seed);
    }
    faker.locale = language;
    dispatch(initUsers());
  }, [language, seed, errors]);
};
