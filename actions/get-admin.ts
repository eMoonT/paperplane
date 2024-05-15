import { KeysItem } from "@/types";
import axios from "axios";
import axiosInstance from "@/lib/axios-instance";

const getAdmin = async (): Promise<KeysItem> => {
  const response = await axiosInstance.get(`/admin`);
// const response = await axios.get("http://localhost:4000/data");
  return response.data;
};

export default getAdmin;
