/** @format */

import { createSlice } from "@reduxjs/toolkit";
import { IUser, IAdmin } from "@/app/_model/user.model";
import { deleteCookie } from "cookies-next";

type TState = IUser | null | IAdmin;

const initialState = null as TState;
const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    loginUser: (state, action: { payload: IUser; type: string }) => {
      state = action.payload;
      return state;
    },
    loginAdmin: (state: TState, action: { payload: IAdmin; type: string }) => {
      state = action.payload;
      return state;
    },
    logout: (state, action: { payload: any; type: string }) => {
      state = initialState;
      deleteCookie("rauth");
      deleteCookie("aauth");

      return state;
    },
  },
});

export default userDataSlice;
export const userDataAction = userDataSlice.actions;
