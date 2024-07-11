"use client";

import { TMovie } from "@/app/_model/movie.model";
import BackEndForm from "./backEndForm";
import { ChangeEvent, useEffect, useState } from "react";
import csrMainApi from "@/app/_lib/axios/csrMainApi";

type Props = {
  studioId: number;
  onSuccess: (e: any) => void;
  closeModal: () => void;
};

export default function adminAddTicket({
  studioId,
  onSuccess,
  closeModal,
}: Props) {
  const [input, setInput] = useState({
    price: 0,
    date: "",
    omdbId: "",
  });
  const [movie, setMovie] = useState<TMovie[]>([]);
  function inputHandler(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setInput({ ...input, [e.target.id]: e.target.value });
  }
  useEffect(() => {
    const fetchMovie = async () => {
      const data = await csrMainApi().get("/movie", {
        params: { status: "CurrentlyPlaying" },
      });
      setMovie(data.data.data);
    };
    fetchMovie();
  }, []);

  useEffect(() => {
    if (movie.length && !input.omdbId)
      setInput((prev) => ({ ...prev, omdbId: movie[0].omdbId }));
  }, [movie]);

  return (
    <BackEndForm
      action={`/ticket/${studioId}/v1`}
      data={{
        price: input.price,
        omdbId: input.omdbId,
        time: input.date,
      }}
      method="post"
      onSuccess={onSuccess}
      onFail={() => {
        alert("Failed Create Tickets");
      }}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div className="flex flex-col bg-gray-200 p-3 rounded">
        <label className="block mb-2">Price</label>
        <input
          id="price"
          type="number"
          className="w-full px-4 py-2 border rounded"
          onChange={inputHandler}
          //   placeholder="IDR"
          required
        />
        <label className="block mb-2">movie</label>
        <select
          id="omdbId"
          className="w-full px-4 py-2 border rounded"
          onChange={inputHandler}
          // defaultValue={movie[1]?.omdbId}
          value={input.omdbId}
          required
        >
          {/* <option disabled></option> */}
          {movie.map((e, i) => (
            <option key={i} value={e.omdbId}>
              {e.title}
            </option>
          ))}
        </select>
        <label className="block mb-2">Date</label>
        <input
          id="date"
          type="datetime-local"
          className="w-full px-4 py-2 border rounded"
          onChange={(e) => {
            setInput({
              ...input,
              date: new Date(e.target.value).toISOString(),
            });
          }}
          required
        />
        <div className="flex w-full justify-center gap-x-2 my-2">
          <input
            className="mr-2 px-4 py-2 bg-green-400 rounded hover:bg-green-600"
            type="submit"
            value="Create"
          />
          <button
            className="mr-2 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            onClick={() => closeModal()}
          >
            Cancel
          </button>
        </div>
      </div>
    </BackEndForm>
  );
}
