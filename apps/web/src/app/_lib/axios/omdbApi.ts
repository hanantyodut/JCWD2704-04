import axios from "axios";
import { OMDB_KEY } from "../../_config/config";

export const omdbAPI = axios.create({
  baseURL: "https://www.omdbapi.com",
  params: {
    apikey: OMDB_KEY,
  },
});
