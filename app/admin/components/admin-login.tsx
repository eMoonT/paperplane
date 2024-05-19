"use client"

import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";

import { LoginModal } from "@/components/login-modal";
import { useRouter } from "next/navigation";

const AdminLogin = () => {
  const router = useRouter();
  const [open, setOpen] = useState(true);

  const validPasswd = async (passwd: string) => {
    const res = await axios.post("/api/v1/login", { input: passwd });
    console.log(res);
    if (res.data.message === "Success") {
      toast.success("登录成功");
      router.refresh()
      // localStorage.setItem("isLogin", sm2Encrypt('true'))
      setOpen(false);
    } else if (res.data.message === "Fail") {
      toast.error("密码错误!");
      setOpen(true);
    } else {
      toast.error("服务器错误!");
      setOpen(true);
    }
  };

  return (
    <>
      <LoginModal
        isOpen={open}
        onClose={() => {setOpen(false);router.push('/')}}
        onConfirm={validPasswd}
        loading={false}
      />
    </>
  );
};

export default AdminLogin;