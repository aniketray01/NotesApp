import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from 'react-hot-toast';
import axios from 'axios';

// --- CHANGED: Use environment variable for production (Render URL) ---
// We automatically append /api/pastes if it's not present in the environment variable
const getApiUrl = () => {
  const envUrl = import.meta.env.VITE_API_URL;
  if (envUrl) {
    // If it already contains /api/pastes, use it as is, otherwise append it
    return envUrl.includes("/api/pastes") ? envUrl : `${envUrl.replace(/\/$/, "")}/api/pastes`;
  }
  return "http://localhost:5000/api/pastes";
};

const API_URL = getApiUrl();

// --- CHANGED: Added Async Thunks for MongoDB DB Operations ---

// Fetch all notes from MongoDB
export const fetchPastes = createAsyncThunk("pastes/fetchAll", async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

// Add a new note to MongoDB
export const addPaste = createAsyncThunk("pastes/add", async (newPaste) => {
  const response = await axios.post(API_URL, newPaste);
  return response.data;
});

// Update an existing note in MongoDB
export const updatePaste = createAsyncThunk("pastes/update", async (updatedPaste) => {
  // We use the 'id' field to find the record in the backend
  const response = await axios.put(`${API_URL}/${updatedPaste._id || updatedPaste.id}`, updatedPaste);
  return response.data;
});

// Delete a note from MongoDB
export const deletePaste = createAsyncThunk("pastes/delete", async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id; // Return the id to remove it from the local state
});

const initialState = {
  pastes: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null
}

export const Slice = createSlice({
  name: "Paste",
  initialState,
  reducers: {
    // Synchronous reducers if needed
  },
  // --- CHANGED: Handling Async Thunks in extraReducers ---
  extraReducers: (builder) => {
    builder
      // Handle fetching all notes
      .addCase(fetchPastes.fulfilled, (state, action) => {
        // --- CHANGED: Ensure action.payload is an array to avoid crashes ---
        if (Array.isArray(action.payload)) {
          state.pastes = action.payload;
          state.status = 'succeeded';
        } else {
          state.pastes = [];
          console.error("API response is not an array:", action.payload);
        }
      })
      // Handle adding a note
      .addCase(addPaste.fulfilled, (state, action) => {
        if (!Array.isArray(state.pastes)) state.pastes = [];
        state.pastes.push(action.payload);
        toast.success('Note added');
      })
      // Handle updating a note
      .addCase(updatePaste.fulfilled, (state, action) => {
        if (Array.isArray(state.pastes)) {
          const index = state.pastes.findIndex(p => (p._id || p.id) === (action.payload._id || action.payload.id));
          if (index !== -1) {
            state.pastes[index] = action.payload;
          }
        }
        toast.success('Note updated');
      })
      // Handle deleting a note
      .addCase(deletePaste.fulfilled, (state, action) => {
        if (Array.isArray(state.pastes)) {
          state.pastes = state.pastes.filter(p => (p._id || p.id) !== action.payload);
        }
        toast.success('Note deleted');
      })
      .addCase(fetchPastes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        toast.error("Failed to load notes from Server");
      });
  }
})

export default Slice.reducer;