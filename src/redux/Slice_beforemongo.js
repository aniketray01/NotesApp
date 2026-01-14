import { createSlice } from "@reduxjs/toolkit";
import toast from 'react-hot-toast';

const initialState = {
  pastes: localStorage.getItem("pastes") ? JSON.parse(localStorage.getItem("pastes")) : []
}

export const Slice = createSlice({
  name: "Paste",
  initialState,
  reducers: {
    //add
    add: (state, action) => {
      const data = action.payload;
      state.pastes.push(data);
      localStorage.setItem("pastes", JSON.stringify(state.pastes))
      toast.success('Note added');
    },

    //update 
    update: (state, action) => {
      const updatedPaste = action.payload;

      const index = state.pastes.findIndex(
        (paste) => paste.id === updatedPaste.id
      );

      if (index >= 0) {
        state.pastes[index] = updatedPaste;
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success("Note updated");
      }
    },

    //remove
    remove: (state, action) => {
      const id = action.payload;
      state.pastes = state.pastes.filter((paste) => paste.id !== id);
      localStorage.setItem("pastes", JSON.stringify(state.pastes))
      toast.success("note deleted");
    },
    //see
    get: (state, action) => {

    }
  }
})

export const { get, remove, update, add } = Slice.actions;
export default Slice.reducer;