import { KeysItem, KeysItemList, newKeysItemList } from "@/types";
import axiosInstance from "@/lib/axios-instance";
// import axios from "axios";

const getAdmin = async (): Promise<newKeysItemList[]> => {
  const response = await axiosInstance.get(`/admin`);
  const data: KeysItem = response.data;

  const flattenData = (data: KeysItemList): newKeysItemList => {
    return {
      name: data.name,
      content: data.metadata.content,
      expireTime: data.metadata.expireTime,
      type: data.metadata.type,
    };
  };

  const newData: newKeysItemList[] = data.keys.reduce((acc, curr) => {
    acc.push(flattenData(curr));
    return acc;
  }, [] as newKeysItemList[]);

  const dataWithId: newKeysItemList[] = newData.map((item, index) => ({
    id: index,
    ...item,
  }));

  return dataWithId;
};


export { getAdmin };
