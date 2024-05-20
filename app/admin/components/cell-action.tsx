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
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AlterModal } from "@/components/alter-modal";

import { deleteKey } from "@/actions/multiple-delete";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { newKeysItemList } from "@/types";
import { downloadFile } from "@/lib/utils";

interface CellActionProps {
  data: KeysColumn;
}

const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  // const setDelKey = useStoreKeys((state)=> state.setDelKey);

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (name: string) => deleteKey(name),
    onSuccess: () => {
      toast.success("删除成功!");
      setOpen(false);
      // setDelKey(data.name);
      router.refresh();
      router.push(`/admin`);
    },
    onMutate: async (name: string) => {
      await queryClient.cancelQueries({ queryKey: ["keys"] });
      const prevData = await queryClient.getQueryData(["keys"]);
      queryClient.setQueryData(["keys"], (oldData: newKeysItemList[]) => {
        return oldData.filter((item: newKeysItemList) => item.name !== name);
      });
      return { prevData };
    },
    onError: (error, variables, context) => {
      console.error("mutate: ", error);
      queryClient.setQueryData(["keys"], context?.prevData);
    },
    // onSettled: () => {
    //   queryClient.invalidateQueries({ queryKey: ["keys"] })
    // }
  });

  // const onDelete = async () => {
  //   try {
  //     setLoading(true);
  //     setOpen(true);
  //     await deleteKey(data.name)
  //     toast.success("删除成功!");
  //     setDelKey(data.name);
  //     router.refresh();
  //     router.push(`/admin`);
  //   } catch (error) {
  //     toast.error("删除失败!");
  //   } finally {
  //     setLoading(false);
  //     setOpen(false);
  //   }
  // };

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("复制成功!");
  };

  return (
    <>
      <AlterModal
        loading={loading}
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={() => mutate(data.name)}
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
            <DropdownMenuItem onClick={() => {downloadFile(data.content);toast.success("下载成功!")}}>
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
