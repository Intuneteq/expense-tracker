import { getFormattedDate } from "../util/date";

export const DUMMY_EXPENSES: Expense[] = [
  {
    id: "e1",
    description: "A pair of shoes",
    amount: 59.99,
    date: getFormattedDate(new Date("2021-12-19")),
  },
  {
    id: "e2",
    description: "A pair of Trousers",
    amount: 89.29,
    date: getFormattedDate(new Date("2022-01-05")),
  },
  {
    id: "e3",
    description: "Some Bananas",
    amount: 5.99,
    date: getFormattedDate(new Date("2021-12-01")),
  },
  {
    id: "e4",
    description: "A book",
    amount: 14.99,
    date: getFormattedDate(new Date("2022-02-19")),
  },
  {
    id: "e5",
    description: "Another book",
    amount: 18.99,
    date: getFormattedDate(new Date("2022-02-18")),
  },
];
