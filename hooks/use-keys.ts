import { KeysItemList } from "@/types";
import toast from "react-hot-toast";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface keysStore {
  data: KeysItemList[];
  removeItem: (key: string) => void;
}

const useKeys = create<keysStore>((set, get) => ({
  data: [],
  removeItem: (key: string) => {
    set({data: get().data.filter((item) => item.name !== key)}),
    toast.success("删除成功")
  },
}));
