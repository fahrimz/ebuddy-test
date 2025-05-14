import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchUserData as fetchUserAPI,
  updateUserData as updateUserAPI,
} from "../../apis/userApi";
import { User } from "@/apis/user";

interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
  updateStatus: "idle" | "loading" | "succeeded" | "failed";
  updateError: string | null;
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
  updateStatus: "idle",
  updateError: null,
};

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  return await fetchUserAPI();
});

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async ({ userData }: { userData: Partial<User>; userId?: string }) => {
    return await updateUserAPI(userData);
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUpdateStatus: (state) => {
      state.updateStatus = "idle";
      state.updateError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;

        const actionError = action.error.message;
        if (!actionError) {
          state.error = "Failed to fetch user";
          return;
        }
        
        // try to parse the error
        try {
          const errResp = JSON.parse(actionError)
          state.error = errResp?.error || "Failed to fetch user";
        } catch (parseErr) {
          // pass error as-is if parsing failed
          state.error = actionError;
        }
      })
      .addCase(updateUser.pending, (state) => {
        state.updateStatus = "loading";
        state.updateError = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.updateStatus = "succeeded";
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.updateError = action.error.message || "Failed to update user";
      });
  },
});

export const { resetUpdateStatus } = userSlice.actions;

export default userSlice.reducer;
