import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createBook, getAllBooks } from "../apis";

// Async thunk for fetching books
export const fetchBooks = createAsyncThunk(
  "books/fetchBooks",
  async ({ page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      const response = await getAllBooks(page, limit);

      if (!response.success) {
        throw new Error("Failed to fetch books");
      }
      return response;
    } catch (error) {
      return rejectWithValue([]);
    }
  }
);

// Async thunk for adding a book
export const addBook = createAsyncThunk(
  "books/addBook",
  async (newBook, { rejectWithValue }) => {
    try {
      // Simulate API call - replace with actual API endpoint
      const response = await createBook(newBook)

      if (!response.ok) {
        throw new Error("Failed to add book");
      }

      const addedBook = await response.json();
      return addedBook;
    } catch (error) {
      // Optimistic update if API fails
      return rejectWithValue(newBook);
    }
  }
);

// Book Slice
const bookSlice = createSlice({
  name: "books",
  initialState: {
    items: [],
    status: "idle",
    error: null,
    pagination: {
      currentPage: 1,
      totalPages: 0,
      totalBooks: 0,
      limit: 10,
    },
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.pagination.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Fetch Books Reducers
    builder.addCase(fetchBooks.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchBooks.rejected, (state, action) => {
      state.status = "failed";
      state.items = action.payload || [];
      state.error = action.error.message;
    });
    builder.addCase(fetchBooks.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.items = action.payload.books;
      state.pagination.currentPage = action.payload.currentPage;
      state.pagination.totalPages = action.payload.totalPages;
      state.pagination.totalBooks = action.payload.totalBooks;
    });

    // Add Book Reducers
    builder.addCase(addBook.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(addBook.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.items.push(action.payload);
    });
    builder.addCase(addBook.rejected, (state, action) => {
      state.status = "failed";
      state.items.push(action.payload);
      state.error = action.error.message;
    });
  },
});

export const { setCurrentPage } = bookSlice.actions;

export default bookSlice.reducer;
