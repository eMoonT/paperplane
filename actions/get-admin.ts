import { KeysItem } from "@/types";
import axios from "axios";

const getAdmin = async (): Promise<KeysItem> => {
  const response = await axios.get(`/api/v1/admin`);
// const response = await axios.get("http://localhost:4000/data");
  return response.data;
};

export default getAdmin;
