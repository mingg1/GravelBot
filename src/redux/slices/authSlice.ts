import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface AuthState {
  isLoading: boolean;
  userName?: string;
  email?: string;
}

const initialState: AuthState = {
  isLoading: false,
  userName: 'Tiina',
  email: '',
};

export const getLoggedInUser = createAsyncThunk(
  'auth/getLoggedInUser',
  async (_, { rejectWithValue }) => {
    try {
      const authDataSerialized = await AsyncStorage.getItem('loggedInUser');
      if (authDataSerialized) {
        const authData = JSON.parse(authDataSerialized);

        return authData;
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const signIn = createAsyncThunk(
  'auth/signIn',
  async ({ ...args }: Partial<AuthState>, { rejectWithValue }) => {
    try {
      AsyncStorage.setItem('loggedInUser', JSON.stringify(args));
      return args;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const signOut = createAsyncThunk(
  'auth/signOut',
  async (_, { rejectWithValue }) => {
    try {
      AsyncStorage.removeItem('loggedInUser');
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    removeUser: (state) => {
      state.email = '';
      state.userName = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getLoggedInUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getLoggedInUser.fulfilled, (state, action) => {
      state.userName = action.payload?.userName || 'Tiina';
      state.email = action.payload?.email;
      state.isLoading = false;
    });
    builder.addCase(getLoggedInUser.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(signIn.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.userName = action.payload.userName || 'Tiina';
      state.email = action.payload.email;
      state.isLoading = false;
    });
    builder.addCase(signOut.fulfilled, (state) => {
      state.userName = undefined;
      state.email = undefined;
    });
  },
});

export const { removeUser } = authSlice.actions;
export default authSlice.reducer;
