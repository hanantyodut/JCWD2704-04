"use client";
import { useState } from "react";
import BackEndForm from "@/app/_components/formComponent/backEndForm";
import { TBranchTicket } from "@/app/_model/branchTicket.model";
import TicketCard from "@/app/_components/ticketComponent/ticketCard";
import SeatSelector from "./SeatSelector";
import { useAppSelector, useAppDispatch } from "@/app/_lib/redux/hooks";
import { setSelectTicket } from "@/app/_lib/redux/slices/selectTicket.slice";
import { useRouter } from "next/navigation";
import { IUser } from "@/app/_model/user.model";
import Modal from "@/app/_components/modalComponent/Modal";

interface Props {
  studios: TBranchTicket[];
}

export default function TicketSelect({ studios }: Props) {
  const dispatch = useAppDispatch();
  const userData = useAppSelector((s) => s.userData) as IUser;
  const router = useRouter();
  const [input, setInput] = useState<{ [key: string]: any }>({});
  const selectTicket = useAppSelector((state) => state.selectTicket);
  const total = selectTicket.tickets.reduce((p, n) => p + n.price, 0);

  return (
    <>
      {/* TicketList */}
      {studios
        .filter((e) => e.seats[0].ticket.length)
        .map((e1, i) => {
          const e = e1 as TBranchTicket;
          return (
            <TicketCard
              studioId={e.id}
              key={i}
              branch={e.branch}
              studioName={e.studioName}
              tickets={e.seats[0].ticket}
            />
          );
        })}

      {/* SelectSeat Modal */}
      {!selectTicket.time && !selectTicket.studioId ? null : (
        <Modal
          isOpen={selectTicket.studioId && selectTicket.time ? true : false}
          onClose={() => {
            dispatch(setSelectTicket());
          }}
        >
          <div className="w-full h-10 bg-slate-400 font-bold text-xl rounded-lg justify-center flex items-center">
            screen
          </div>
          <SeatSelector />
          <div className="flex flex-col items-end space-y-4 p-4">
            <h1 className="text-xl font-semibold">
              Total:{" "}
              {(total - (input.usePoint ? userData.points : 0)).toLocaleString(
                "id-ID",
                {
                  style: "currency",
                  currency: "IDR",
                }
              )}
            </h1>
            <BackEndForm
              action="/transaction/t1"
              method="post"
              className="flex flex-col items-end"
              data={{
                type: "online",
                pointsUsed: input.usePoint,
                ticketIds: selectTicket.tickets,
              }}
              onSuccess={(res) => {
                router.push(`/checkOut/${res.data.data.invoiceNum}`);
                dispatch(setSelectTicket());
              }}
            >
              <div className="flex justify-end space-x-2">
                <label htmlFor="usePoint">
                  Your Point:{" "}
                  {input.usePoint
                    ? userData.points < total
                      ? 0
                      : userData.points - total
                    : userData.points}
                </label>
                <input
                  id="usePoint"
                  name="usePoint"
                  type="checkbox"
                  onChange={(e) => {
                    setInput({ ...input, [e.target.id]: e.target.checked });
                  }}
                />
              </div>

              <input
                onClick={(e) => {
                  selectTicket.tickets.length ? null : e.preventDefault();
                }}
                type="submit"
                value="Checkout"
                className="mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition duration-200"
              />
            </BackEndForm>
          </div>
        </Modal>
      )}
    </>
  );
}
