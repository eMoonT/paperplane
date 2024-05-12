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
    await axios.delete(`http://localhost:8788/api/v1/admin/${key}`);
    toast.success("删除成功!");
    // setFilterData(data.keys = data.keys.filter((item) => item.name !== key));
    router.refresh();
    router.push("http://localhost:8788/admin");
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
