import { faker } from "@faker-js/faker";
import { IUser } from "./generatorConfig.slice";

const USER_FIELDS = ["id", "fullName", "address", "phone"];
const SYMBOLS_RU = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя";
const SYMBOLS_EN = "abcdefghijklmnopqrstuvwxyz";
const SYMBOLS_PL = "aąbcćdeęfghijklłmnńoópqrsśtuvwxyzźż";
const SYMBOL_FIELDS = [USER_FIELDS[1], USER_FIELDS[2]];

const LOCALES = { ru: SYMBOLS_RU, en: SYMBOLS_EN, pl: SYMBOLS_PL };

const getRandomPosition = (value: string): number =>
  value ? faker.datatype.number({ min: 0, max: value.length - 1 }) : 0;

const deleteSymbol = (value: string): string => {
  const randomPosition = getRandomPosition(value);
  return (
    value.substring(0, randomPosition) + value.substring(randomPosition + 1)
  );
};

const addSymbol = (value: string, field: string): string => {
  const randomPosition = getRandomPosition(value);
  const randomSymbol =
    LOCALES[faker.locale][
      faker.datatype.number({ min: 0, max: LOCALES[faker.locale].length - 1 })
    ];
  const randomNumber = faker.datatype.number({ min: 0, max: 9 });
  return (
    value.substring(0, randomPosition) +
    (SYMBOL_FIELDS.includes(field) ? randomSymbol : randomNumber) +
    value.substring(randomPosition + 1)
  );
};

const reverseSymbol = (value: string): string => {
  const randomPositionOne = getRandomPosition(value);
  const randomPositionTwo = getRandomPosition(value);
  const symbolOne = value[randomPositionOne];
  const symbolTwo = value[randomPositionTwo];
  const arr = value.split("");
  arr[randomPositionOne] = symbolTwo;
  arr[randomPositionTwo] = symbolOne;
  return arr.join("");
};

const ERRORS_METHODS = [deleteSymbol, addSymbol, reverseSymbol];

export const addErrorsToUsers = (users: IUser[], errors: number): IUser[] => {
  if (errors) {
    return users.map((user) => {
      const decimals = errors - Math.floor(errors);
      const errorsCount =
        faker.datatype.number({
          max: 1,
          min: 0,
          precision: 0.01,
        }) < decimals
          ? errors
          : Math.floor(errors);
      for (let i = 0; i < errorsCount; i++) {
        const randomMethod =
          ERRORS_METHODS[
            faker.datatype.number({ min: 0, max: ERRORS_METHODS.length - 1 })
          ];
        const randomField =
          USER_FIELDS[
            faker.datatype.number({ min: 0, max: USER_FIELDS.length - 1 })
          ];
        user[randomField] = randomMethod(user[randomField], randomField);
      }

      return user;
    });
  }
  return users;
};
