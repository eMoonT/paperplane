
"use client";

import { useEffect, useState } from "react";
import { Model } from "@/components/ui/model";
import { Button } from "./ui/button";

interface AlterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}
export const AlterModal: React.FC<AlterModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Model
      title="确定删除该数据?"
      description="删除后数据不可恢复"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="py-2 space-x-2 flex items-center justify-end w-full">
        <Button variant="outline" disabled={loading} onClick={onClose}>
          取消 
        </Button>
        <Button variant="destructive" disabled={loading} onClick={onConfirm}>
          确定 
        </Button>
      </div>
    </Model>
  );
};
