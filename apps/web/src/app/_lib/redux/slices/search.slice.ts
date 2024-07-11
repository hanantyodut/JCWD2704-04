import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: "",
};

export const selectTicket = createSlice({
  name: "selectTicket",
  initialState,
  reducers: {
    setSearch: (
      state,
      action: { payload: typeof initialState | undefined; type: string }
    ) => {
      if (action.payload) {
        state = action.payload;
        return state;
      } else {
        state = initialState;
        return state;
      }
    },
  },
});

export const { setSearch } = selectTicket.actions;
export default selectTicket;
