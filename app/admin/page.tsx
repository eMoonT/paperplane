"use client";

import Panel from "./components/panel";
import KeysContent from "./components/keys-content";
import getAdmin from "@/actions/get-admin";
import { KeysItem, KeysItemList } from "@/types";

import { useEffect, useState } from "react";
import KeysTable from "./components/keys-table";

import { useStoreKeys } from "@/hooks/use-keys";
import { LoginModal } from "@/components/login-modal";
import { redirect, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { sm2Decrypt, sm2Encrypt } from "@/lib/sm2";

import axios from "axios";

type newKeysItemList = {
  name: string;
  content: string;
  expireTime: string;
};

const Admin = () => {
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
    const login = localStorage.getItem("isLogin")
    if (sm2Decrypt(login!)=== 'true') {
      return;
    }
    setOpen(true);
  }, []);

  useEffect(() => {
    (async function fetchData() {
      const data = await getAdmin();
      // setData(data);
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

  const validPasswd = async (passwd: string) => {
    const res = await axios.post('/api/v1/login',{input:passwd})
    // console.log(res)
    if (res.data.message === "Success") {
      toast.success("登录成功")
      localStorage.setItem("isLogin", sm2Encrypt('true'))
      setOpen(false);
    } else if(res.data.message === 'Fail'){
      toast.error("密码错误!");
      setOpen(true)
    } else {
      toast.error("服务器错误!");
      setOpen(true)
    }
  };

  const logout = () => {
    localStorage.setItem("isLogin", sm2Encrypt('false'))
    router.push('/')
  };

  return (
    <div className="px-6">
      <LoginModal
        isOpen={open}
        onClose={() => {
          setOpen(false);
          router.push("/");
        }}
        loading={loading}
        onConfirm={validPasswd}
      />
      <Panel logout={logout} />
      {/* <div className="mt-5">
        {<KeysContent data={data} setCount={setCount} />}
      </div> */}
      <KeysTable data={newData} />
    </div>
  );
};

export default Admin;
