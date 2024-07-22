import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = "https://expense-tracker-ab47e-default-rtdb.europe-west1.firebasedatabase.app/expenses";

interface FirebaseResponse {
   name: string;
 }

// Store expense
export const storeExpense = createAsyncThunk<Expense, Omit<Expense, "id">>(
  "expenses/store",
  async (data, api) => {
    const res = await axios.post<FirebaseResponse>(`${url}.json`, data);

    if (res.status >= 300) {
      return api.rejectWithValue(res.data);
    }

    const id = res.data.name; // Firebase returns the generated id in the 'name' field

    return { ...data, id };
  }
);

// Fetch all expenses
export const fetchExpenses = createAsyncThunk<Expense[]>(
  "expenses/fetchAll",
  async (_, api) => {
    const res = await axios.get<{ [key: string]: Omit<Expense, "id"> }>(`${url}.json`);

    if (res.status >= 300) {
      return api.rejectWithValue(res.data);
    }

    const expenses = Object.entries(res.data).map(([id, expense]) => ({ ...expense, id }));
    

    return expenses;
  }
);

// Fetch expense by ID
export const fetchExpenseById = createAsyncThunk<Expense, string>(
  "expenses/fetchById",
  async (id, api) => {
    const res = await axios.get<Omit<Expense, "id">>(`${url}/${id}.json`);

    if (res.status >= 300) {
      return api.rejectWithValue(res.data);
    }

    return { ...res.data, id };
  }
);

// Update expense
export const updateExpense = createAsyncThunk<Expense, Expense>(
  "expenses/update",
  async (data, api) => {
    const { id, ...rest } = data;

    const res = await axios.put<Omit<Expense, "id">>(`${url}/${id}.json`, rest);

    if (res.status >= 300) {
      return api.rejectWithValue(res.data);
    }

    return data;
  }
);

// Delete expense
export const deleteExpense = createAsyncThunk<string, string>(
  "expenses/delete",
  async (id, api) => {
    const res = await axios.delete(`${url}/${id}.json`);

    if (res.status >= 300) {
      return api.rejectWithValue(res.data);
    }

    return id;
  }
);
