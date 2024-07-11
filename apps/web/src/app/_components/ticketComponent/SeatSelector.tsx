import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/app/_lib/redux/hooks";
import { setSelectTicket } from "@/app/_lib/redux/slices/selectTicket.slice";
import csrMainApi from "@/app/_lib/axios/csrMainApi";
import { ITicketWithSeat } from "@/app/_model/ticketWithSeat.model";

const SeatSelector = () => {
  const [seats, setSeats] = useState<ITicketWithSeat[]>([]);
  const selectTicket = useAppSelector((state) => state.selectTicket);
  const { studioId, time } = selectTicket;
  const dispatch = useAppDispatch();
  const fetchSeats = async () => {
    const res = await csrMainApi().get(`/ticket/${studioId}`, {
      params: { time },
    });
    setSeats(res.data.data);
  };
  useEffect(() => {
    fetchSeats();
  }, [studioId, time]);

  return (
    <div className="mb-4">
      <h2 className="text-lg font-semibold">Select Seats</h2>
      <div className="flex flex-col w-full">
        {getUniqueRows(seats).map((a, aidx) => (
          <>
            <div className="w-full flex flex-nowrap" key={aidx}>
              {seats.map((e, i) => {
                const booked = e.transactionId;
                const selected =
                  selectTicket.tickets.findIndex((te) => te.id == e.id) + 1;
                return (
                  e.seat.row == a && (
                    <button
                      disabled={Boolean(booked)}
                      key={e.id}
                      onClick={(event) => {
                        const selectedTickets = selected
                          ? selectTicket.tickets.filter((te) => te.id !== e.id)
                          : [...selectTicket.tickets, e];
                        dispatch(
                          setSelectTicket({
                            ...selectTicket,
                            tickets: selectedTickets,
                          })
                        );
                      }}
                      className={`p-2 border rounded min-w-[50px] ${
                        booked
                          ? "bg-gray-500"
                          : selected
                          ? "bg-red-600"
                          : "bg-green-400"
                      }`}
                    >
                      {e.seat.row + String(e.seat.number)}
                    </button>
                  )
                );
              })}
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default SeatSelector;

function getUniqueRows(data: ITicketWithSeat[]) {
  const uniqueRows = new Set();

  data.forEach((item) => {
    uniqueRows.add(item.seat.row);
  });

  return Array.from(uniqueRows);
}
