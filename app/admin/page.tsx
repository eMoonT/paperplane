"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const Admin = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="px-6">
      <div className="mt-3 flex justify-between">
        <h1 className="text-3xl py-4">Admin DashBoard</h1>
        {/* <button className="" onClick={() => {}}>
          退出登录
        </button> */}
        <Button
          onClick={() => {}}
          disabled={loading}
          variant="outline"
          size="sm"
        >
          退出登录
        </Button>
      </div>
      <div className="mt-5">
        <div className="w-full p-4 flex justify-between border shadow-md">
          <span>总数量：</span>
          <input
            placeholder="输入关键词搜索"
            className="px-1 border border-gray-300 placeholder:text-gray-300 placeholder:text-xs focus:outline-none focus:border-blue-500 rounded-sm"
            type="text"
          />
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Admin;
