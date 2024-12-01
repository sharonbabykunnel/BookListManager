import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createBook, getAllBooks } from "../apis";

// Async thunk for fetching books
export const fetchBooks = createAsyncThunk(
  "books/fetchBooks",
  async (_, { rejectWithValue }) => {
    try {
      // Simulate API call - replace with actual API endpoint
        const response = await getAllBooks();

        if (!response.success) {
            throw new Error("Failed to fetch books");
        }
        console.log(response,'sfdoahsof')
      return response.books;
    } catch (error) {
        console.log('aoisof')
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
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Fetch Books Reducers
    builder.addCase(fetchBooks.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchBooks.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.items = action.payload;
    });
    builder.addCase(fetchBooks.rejected, (state, action) => {
      state.status = "failed";
      state.items = action.payload || [];
      state.error = action.error.message;
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

export default bookSlice.reducer;
