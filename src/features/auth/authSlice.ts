import { createSlice } from "@reduxjs/toolkit";
import { AuthData } from "../../types";
import { RootState } from "../../app/store"; // Import RootState

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, accessToken: "" } as AuthData, // Initialize with the AuthData type
  reducers: {
    setCredentials: (state, action) => {
      const { user, accessToken } = action.payload;
      state.user = user;
      state.accessToken = accessToken;
    },
    logOut: (state) => {
      state.user = null;
      state.accessToken = "";
    }
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

// Define the return types explicitly for the selectors using RootState
export const selectCurrentUser = (state: RootState) => state.persisted.auth.user;
export const selectCurrentToken = (state: RootState) => state.persisted.auth.accessToken; 
