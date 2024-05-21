import { ParamData } from "@/types";
import axios from "axios";

const getKey = async (key: string): Promise<ParamData> => {
  const response = await axios.get(`/api/v1/${key}`);
  const data: ParamData = response.data;
  return data;
}

export { getKey }