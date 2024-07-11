"use client";
import { TTicket } from "@/app/_model/ticket.model";
import BuyTicketButton from "./buyTicketButton";

type Props = {
  tickets: TTicket[];
  branch: any;
  studioId: number;
  studioName: string;
};

export default function TicketCard({
  branch,
  tickets,
  studioId,
  studioName,
}: Props) {
  return (
    <div className=" w-full my-2 p-3 flex justify-start md:justify-between flex-wrap border-2 border-black bg-white">
      <div className="w-full sm:w-[50%] h-full">
        <h1 className="font-semibold">{branch.location}</h1>
        <h2 className="">{studioName}</h2>
      </div>
      <div className="w-full sm:w-[50%] gap-2 flex justify-end flex-wrap">
        {tickets &&
          tickets.map((te, ti) => {
            const time = new Date(te.time).toISOString();
            return <BuyTicketButton studioId={studioId} time={time} key={ti} />;
          })}
      </div>
    </div>
  );
}
