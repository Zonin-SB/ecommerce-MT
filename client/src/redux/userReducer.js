import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  userDetails: null,
  cart:null,
};

const loginSlice = createSlice({
  name: "logindetails",
  initialState: INITIAL_STATE,
  reducers: {
    userLoginDetails: (state, action) => {
      let { userDetails } = state;
      userDetails = action.payload;
      return { ...state, userDetails };
    },
    cartCount: (state, action) => {
      let { cart } = state;
      cart = action.payload;
      return { ...state, cart };
    },
  },
});

export const { userLoginDetails,cartCount } = loginSlice.actions;

export default loginSlice.reducer;
