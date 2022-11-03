import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { State } from 'react-native-gesture-handler';

interface LoggedInUser {
  isLoading: boolean;
  userName: string;
  email: string;
}
const initialState: LoggedInUser = {
  isLoading: false,
  userName: '',
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
  async (
    { userName, email }: { userName: string; email: string },
    { rejectWithValue }
  ) => {
    try {
      AsyncStorage.setItem('loggedInUser', JSON.stringify({ userName, email }));
      return { userName, email };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signIn: (state, { payload }: { payload: LoggedInUser }) => {
      state.userName = payload.userName;
      state.email = payload.email;
    },
    signOut: (state) => {
      state.userName = '';
      state.email = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getLoggedInUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getLoggedInUser.fulfilled, (state, action) => {
      state.email = action.payload.email;
      state.userName = action.payload.userName;
      state.isLoading = false;
    });
    builder.addCase(getLoggedInUser.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(signIn.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.userName = action.payload.userName;
      state.email = action.payload.email;
      state.isLoading = false;
    });
  },
});

export default authSlice.reducer;
