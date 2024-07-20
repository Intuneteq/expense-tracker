import { RootState } from "../";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { DUMMY_EXPENSES } from "../../constant/dummy-data";

interface IExpensesSlice {
  expenses: Expense[];
}

const initialState: IExpensesSlice = {
  expenses: DUMMY_EXPENSES,
};

const expensesSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Omit<Expense, "id">>) => {
      const id = new Date().toString() + Math.random().toString();
      state.expenses.push({ ...action.payload, id });
    },
    remove: (state, action: PayloadAction<string>) => {
      state.expenses = state.expenses.filter((expense) => {
        if (expense.id !== action.payload) {
          return expense;
        }
      });
    },
    update: (state, action: PayloadAction<Expense>) => {
      state.expenses = state.expenses.map((expense) => {
        if (expense.id === action.payload.id) {
          return action.payload;
        }
        return expense;
      });
    },
  },
});

// Export actions
export const { add, update, remove } = expensesSlice.actions;

export const selectExpenses = (state: RootState) => state.expenses.expenses;

// Export reducer to be used in the store
export default expensesSlice.reducer;
