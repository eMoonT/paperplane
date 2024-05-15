"use client";

import Panel from "./panel";
import getAdmin from "@/actions/get-admin";
import { KeysItem, KeysItemList } from "@/types";

import { useEffect, useState } from "react";
import KeysTable from "./keys-table";

import { useStoreKeys } from "@/hooks/use-keys";
import { redirect, useRouter } from "next/navigation";
import toast from "react-hot-toast";

import axiosInstance from "@/lib/axios-instance";
import axios from "axios";

type newKeysItemList = {
  name: string;
  content: string;
  expireTime: string;
};

const AdminPage = () => {
  const [data, setData] = useState<KeysItem>({ keys: [], total: 0 });

  const [loading, setLoading] = useState<boolean>(true);
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState<number>(0);
  // const [isLogin,setIsLogin] = useState<boolean>(false);

  const delKey = useStoreKeys((state) => state.delKey);
  const keys = useStoreKeys((state) => state.Keys)
  const setKeys = useStoreKeys((state) => state.setKeys)

  const router = useRouter();
  

  useEffect(() => {
    (async function fetchData() {
      const data = await getAdmin();
      console.log(data)
      setData(data);
      setKeys(data.keys)
      // setIsLogin(true)
      setLoading(false);
    })();
  }, []);
  // const data: KeysItem = await getAdmin() ?? { keys: [] ,total: 0};
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-24 w-24 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  const flattenData = (data: KeysItemList): newKeysItemList => {
    return {
      name: data.name,
      content: data.metadata.content,
      expireTime: data.metadata.expireTime,
    };
  };

  const newData: newKeysItemList[] = keys.reduce((acc, curr) => {
    acc.push(flattenData(curr));
    return acc;
  }, [] as newKeysItemList[]);

  const logout = async () => {
    await axiosInstance.post('/logout')
    router.push('/')
  };

  return (
    <>
    <div className="px-6">
      <Panel logout={logout} />
      <KeysTable data={newData} />
    </div> 
    </>
  );
};

export default AdminPage;
