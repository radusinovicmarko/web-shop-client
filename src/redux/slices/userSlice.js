import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "../../services/auth.service";
import usersService from "../../services/users.service";

export const login = createAsyncThunk(
  "user/login",
  ({ username, password }, thunkAPI) =>
    authService.login(username, password).catch(thunkAPI.rejectWithValue)
);

export const state = createAsyncThunk("user/state", (_, { rejectWithValue }) =>
  authService.state()
);

export const activate = createAsyncThunk(
  "user/activate",
  ({ username, pin }, thunkAPI) =>
    authService.activate(username, pin).catch(thunkAPI.rejectWithValue)
);

export const register = createAsyncThunk("user/register", (user, thunkAPI) =>
  authService.register(user).catch(thunkAPI.rejectWithValue)
);

export const updateProfile = createAsyncThunk(
  "user/update",
  ({ id, user }, { rejectWithValue }) =>
    usersService.updateProfile(id, user).catch(rejectWithValue)
);

const logoutAction = (state, action) => {
  authService.logout();
  state.activated = false;
  state.authenticated = false;
  state.loading = false;
  state.user = null;
  state.pendingActivation = false;
};

const onSuccessAuth = (state, action) => {
  state.authenticationFailed = false;
  state.loading = false;
  if (action.payload.activate) {
    state.pendingActivation = true;
    state.user = { username: action.payload.username };
  } else {
    state.pendingActivation = false;
    state.authenticated = true;
    state.user = action.payload;
  }
};

const userSlice = createSlice({
  name: "user",
  initialState: {
    pendingActivation: false,
    authenticated: false,
    authenticationFailed: false,
    loading: false,
    user: null
  },
  reducers: {
    logout: logoutAction
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, onSuccessAuth);
    builder.addCase(login.rejected, (state, action) => {
      state.authenticated = false;
      state.authenticationFailed = true;
      state.loading = false;
    });
    builder.addCase(login.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(state.fulfilled, onSuccessAuth);
    builder.addCase(state.rejected, (state, action) => {
      state.authenticated = false;
      state.authenticationFailed = true;
      state.loading = false;
    });
    builder.addCase(activate.fulfilled, onSuccessAuth);
    builder.addCase(activate.rejected, (state, action) => {
      state.authenticationFailed = true;
      state.loading = false;
      state.pendingActivation = true;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.authenticationFailed = false;
      state.loading = false;
      state.pendingActivation = true;
      state.user = { username: action.payload.username };
    });
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      state.user = action.payload.data;
    });
  }
});
export const { logout } = userSlice.actions;
export default userSlice.reducer;
