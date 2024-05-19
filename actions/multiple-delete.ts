import axiosInstance from "@/lib/axios-instance";
import { getAdmin } from "./fetch-data";

export const deleteKey = async (key: string) => {
  try {
    await axiosInstance.delete(`/admin/${key}`);
  } catch (error) {
    console.error(error);
  }
};

export const MultipleDelete = async (ids: string[]) => {
  const data = await getAdmin();
  ids.forEach(async (id) => {
    const item = data.filter((item) => item.id === Number(id));
    await deleteKey(item[0].name);
  });
};
