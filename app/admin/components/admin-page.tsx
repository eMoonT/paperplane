"use client";

import Panel from "./panel";
import { getAdmin } from "@/actions/fetch-data";

import KeysTable from "./keys-table";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axios-instance";
import { useQuery } from "@tanstack/react-query";

const AdminPage = () => {
  const router = useRouter();
  // const keys = useStoreKeys((state)=>state.Keys);
  // const setKeys = useStoreKeys((state) => state.setKeys);

  const { data, isError, isLoading, isSuccess, isPending, error,status } = useQuery({
    queryKey: ["keys"],
    queryFn: () => getAdmin(),
    staleTime: 1000 * 60,
  });

  isError && router.push("/");

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-24 w-24 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  const logout = async () => {
    await axiosInstance.post("/logout");
    router.push("/");
  };

  return (
    <>
      <div className="px-6">
        <Panel logout={logout} />
        {data && <KeysTable data={data} />}
      </div>
    </>
  );
};

export default AdminPage;
