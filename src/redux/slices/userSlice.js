import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "../../services/auth.service";

export const login = createAsyncThunk("user/login", ({ username, password }, thunkAPI) =>
  authService.login(username, password)
);

export const activate = createAsyncThunk("user/activate", ({ username, pin }, thunkAPI) =>
  authService.activate(username, pin)
);

export const register = createAsyncThunk("user/register", (user, thunkAPI) =>
  authService.register(user)
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
  extraReducers: {
    [login.pending]: (state, action) => {
      state.loading = true;
    },
    [login.rejected]: (state, action) => {
      state.authenticationFailed = true;
      state.loading = false;
    },
    [login.fulfilled]: onSuccessAuth,
    [activate.fulfilled]: onSuccessAuth,
    [activate.rejected]: (state, action) => {
      state.authenticationFailed = true;
      state.loading = false;
      state.pendingActivation = true;
    },
    [register.fulfilled]: (state, action) => {
      state.authenticationFailed = false;
      state.loading = false;
      state.pendingActivation = true;
      state.user = { username: action.payload.username };
    }
  }
});
export const { logout } = userSlice.actions;
export default userSlice.reducer;
