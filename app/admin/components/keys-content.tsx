"use client";

import {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import type { KeysItemList, KeysItem as KeysItemType } from "@/types";

import toast from "react-hot-toast";
import axios from "axios";
import KeysItem from "./keys-item";
import { useRouter } from "next/navigation";

let BASE_URL = "";
if (process.env.NODE_ENV === "development") {
  BASE_URL = process.env.NEXT_PUBLIC_BASE_URL as string;
}
interface KeysContentProps {
  data: KeysItemType;
  setCount: Dispatch<SetStateAction<number>>;
}

const KeysContent: React.FC<KeysContentProps> = ({ data, setCount }) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [filterData, setFilterData] = useState<KeysItemList[]>([]);

  const router = useRouter();

  useEffect(() => {
    setFilterData(
      data.keys.filter((item) =>
        item.name.toLowerCase().includes(searchValue.toLowerCase())
      )
    );
  }, [searchValue, data]);

  const deleteKey = async (key: string) => {
    await axios.delete(`${BASE_URL}/api/v1/admin/${key}`);
    toast.success("删除成功!");
    // setFilterData(data.keys = data.keys.filter((item) => item.name !== key));
    router.refresh();
    router.push(`${BASE_URL}}/admin`);
    setCount((prev) => prev + 1);
  };

  return (
    <>
      <div className="w-full p-4 flex justify-between border shadow-sm">
        <span>总数量：{data.total}</span>
        <input
          placeholder="输入关键词搜索"
          className="px-1 border border-gray-300 placeholder:text-gray-300 placeholder:text-xs focus:outline-none focus:border-blue-500 rounded-sm"
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>
      <KeysItem data={filterData} deleteKey={deleteKey} />
    </>
  );
};

export default KeysContent;
