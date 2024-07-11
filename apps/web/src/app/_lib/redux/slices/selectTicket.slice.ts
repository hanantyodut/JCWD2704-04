/** @format */

import { createSlice } from "@reduxjs/toolkit";
import { ITicketWithSeat } from "@/app/_model/ticketWithSeat.model";

interface IState {
  studioId?: number;
  time?: Date;
  tickets: ITicketWithSeat[];
}

const initialState: IState = {
  studioId: undefined,
  time: undefined,
  tickets: [],
};

export const selectTicket = createSlice({
  name: "selectTicket",
  initialState,
  reducers: {
    setSelectTicket: (
      state,
      action: { payload: IState | undefined; type: string }
    ) => {
      if (action.payload) {
        state = { ...state, ...action.payload };
        return state;
      } else {
        state = initialState;
        return state;
      }
    },
  },
});

export const { setSelectTicket } = selectTicket.actions;
export default selectTicket;
