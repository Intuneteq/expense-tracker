import {
  createSlice,
  createEntityAdapter,
  PayloadAction,
} from "@reduxjs/toolkit";

import { RootState } from "../../";

import {
  storeExpense,
  fetchExpenses,
  fetchExpenseById,
  updateExpense,
  deleteExpense,
} from "./api";

// Create an entity adapter for expenses
const expensesAdapter = createEntityAdapter<Expense>({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
});

type Status = "idle" | "loading" | "succeeded" | "failed" | "done";

interface IExpensesSlice {
  status: Status;
  error: null | string;
}

const initialState: IExpensesSlice = {
  status: "idle",
  error: null,
};

const expensesSlice = createSlice({
  name: "expenses",
  initialState: expensesAdapter.getInitialState(initialState),
  reducers: {
    add: (state, action: PayloadAction<Omit<Expense, "id">>) => {
      const id = new Date().toString() + Math.random().toString();
      expensesAdapter.addOne(state, { ...action.payload, id });
    },
    remove: (state, action: PayloadAction<string>) => {
      expensesAdapter.removeOne(state, action.payload);
    },
    update: (state, action: PayloadAction<Expense>) => {
      expensesAdapter.updateOne(state, {
        id: action.payload.id,
        changes: action.payload,
      });
    },

    setStatus: (state, action: PayloadAction<Status>) => {
      state.status = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(storeExpense.pending, (state) => {
        state.status = "loading";
      })

      .addCase(storeExpense.fulfilled, (state, { payload }) => {
        state.status = "succeeded";

        expensesAdapter.addOne(state, payload);
      })

      .addCase(storeExpense.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to store expense";
      })

      .addCase(fetchExpenses.pending, (state) => {
        state.status = "loading";
      })

      .addCase(fetchExpenses.fulfilled, (state, action) => {
        state.status = "succeeded";
        expensesAdapter.setAll(state, action.payload);
      })

      .addCase(fetchExpenses.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch expenses";
      })

      .addCase(fetchExpenseById.pending, (state) => {
        state.status = "loading";
      })

      .addCase(fetchExpenseById.fulfilled, (state, action) => {
        state.status = "succeeded";
        expensesAdapter.upsertOne(state, action.payload);
      })

      .addCase(fetchExpenseById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch expense by ID";
      })

      .addCase(updateExpense.pending, (state) => {
        state.status = "loading";
      })

      .addCase(updateExpense.fulfilled, (state, action) => {
        state.status = "succeeded";
        expensesAdapter.upsertOne(state, action.payload);
      })

      .addCase(updateExpense.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to update expense";
      })

      .addCase(deleteExpense.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteExpense.fulfilled, (state, action) => {
        state.status = "succeeded";
        expensesAdapter.removeOne(state, action.payload);
      })
      .addCase(deleteExpense.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to delete expense";
      });
  },
});

// Export actions
export const { add, update, remove, setStatus } = expensesSlice.actions;

// Export selectors using the adapter's selectors
export const {
  selectAll: selectExpenses,
  selectById: selectExpenseById,
  selectIds: selectExpenseIds,
} = expensesAdapter.getSelectors((state: RootState) => state.expenses);

export const selectStatus = (state: RootState) => state.expenses.status;
export const selectError = (state: RootState) => state.expenses.error;

export default expensesSlice.reducer;
