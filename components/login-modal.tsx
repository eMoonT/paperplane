"use client";

import { useEffect, useRef, useState } from "react";
import { Model } from "@/components/ui/model";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (passwd: string) => void;
  loading: boolean;
}
export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [passwd, setPasswd] = useState<string>("");

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Model
      title="登录管理员面板"
      description="输入管理员密码"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="py-2 space-x-2 flex items-center justify-end w-full">
        <Input
          ref={inputRef}
          disabled={loading}
          onChange={(e) => setPasswd(e.target.value)}
          type="password"
          onKeyDown={(e) => {
            e.key === "Enter" && onConfirm(passwd);
          }}
          placeholder="请输入密码"
        />
        <Button
          variant="default"
          disabled={loading}
          onClick={() => onConfirm(passwd)}
        >
          登录
        </Button>
      </div>
    </Model>
  );
};
