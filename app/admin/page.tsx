"use client";

import Panel from "./components/panel";
import KeysContent from "./components/keys-content";
import getAdmin from "@/actions/get-admin";
import { KeysItem } from "@/types";

import { useEffect, useReducer, useState } from "react";

const Admin = () => {
  const [data, setData] = useState<KeysItem>({ keys: [], total: 0 });

  const [loading, setLoading] = useState<boolean>(true);
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    (async function fetchData() {
      const data = await getAdmin();
      setData(data);
      setLoading(false);
    })();
  }, [count]);
  // const data: KeysItem = await getAdmin() ?? { keys: [] ,total: 0};
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>)
    ;
  }

  return (
    <div className="px-6">
      <Panel />
      <div className="mt-5">
        {<KeysContent data={data} setCount={setCount} />}
      </div>
    </div>
  );
};

export default Admin;
