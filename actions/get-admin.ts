import { KeysItem } from "@/types";
import axios from "axios";

let BASE_URL = "";
if (process.env.NODE_ENV === "development") {
  BASE_URL = process.env.NEXT_PUBLIC_BASE_URL as string;
}

const getAdmin = async (): Promise<KeysItem> => {
  const response = await axios.get(`${BASE_URL}/api/v1/admin`);
// const response = await axios.get("http://localhost:4000/data");
  return response.data;
};

export default getAdmin;
