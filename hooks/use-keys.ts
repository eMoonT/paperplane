import { KeysItemList } from "@/types";
import toast from "react-hot-toast";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface keysStore {
  delKey: string;
  setDelKey: (key: string) => void;
  Keys: KeysItemList[];
  setKeys: (keys: KeysItemList[]) => void;
  addKey: (key: KeysItemList) => void;
}

export const useStoreKeys = create<keysStore>((set, get) => ({
  delKey: "",
  setDelKey: (key: string) => {
    set((state) => {
      const updateKeys = state.Keys.filter((item) => item.name !== key);
      return {
        Keys: updateKeys,
        delKey: key,
      };
    });
  },
  Keys: [],
  setKeys: (keys: KeysItemList[]) => {
    set({ Keys: keys });
  },
  addKey: (key: KeysItemList) => {
    set((state) => {
      const updateKeys = [...state.Keys, key];
      return {
        Keys: updateKeys,
      };
    });
  },
}));
