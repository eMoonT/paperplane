import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { KeysColumn } from "./columns";
import { Button } from "@/components/ui/button";
import { Copy, MoreHorizontal, Trash, Download } from "lucide-react";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { AlterModal } from "@/components/alter-modal";

import { useStoreKeys } from "@/hooks/use-keys";

interface CellActionProps {
  data: KeysColumn;
}

const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();
  const storeKey = useStoreKeys();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const onDelete = async () => {
    try {
      setLoading(true);
      setOpen(true);
      await axios.delete(`/api/v1/admin/${data.name}`);
      toast.success("删除成功!");
      storeKey.setDelKey(data.name);
      router.refresh();
      router.push(`/admin`);
    } catch (error) {
      toast.error("删除失败!");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };
  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("复制成功!");
  };

  // 创建一个点击事件触发下载
  const downloadFile = (fileUrl: string) => {
    try {
      const fileName = fileUrl.split("/").pop() as string;
      let a = document.createElement("a");
      a.href = fileUrl + "?response-content-type=application/octet-stream";
      a.download = fileName;

      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      toast.error("下载失败!");
    }
  };

  return (
    <>
      <AlterModal
        loading={loading}
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0 flex justify-self-end">
            <span className="sr-only">open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>操作</DropdownMenuLabel>
          {data.type === 1 && (
            <DropdownMenuItem onClick={() => downloadFile(data.content)}>
              <Download className="mr-2 w-4 h-4"></Download>
              <div>下载</div>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem onClick={() => onCopy(data.content)}>
            <Copy className="mr-2 w-4 h-4" />
            复制
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 w-4 h-4" />
            删除
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default CellAction;