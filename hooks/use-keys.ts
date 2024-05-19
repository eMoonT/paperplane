import { newKeysItemList } from "@/types";
import { create } from "zustand";

interface keysStore {
  delKey: string;
  setDelKey: (key: string) => void;
  Keys: newKeysItemList[];
  setKeys: (keys: newKeysItemList[]) => void;
  addKey: (key: newKeysItemList) => void;
  multipleDelete: (keys: string[]) => void;
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
  setKeys: (keys: newKeysItemList[]) => {
    set({ Keys: keys });
  },
  addKey: (key: newKeysItemList) => {
    set((state) => {
      const updateKeys = [...state.Keys, key];
      return {
        Keys: updateKeys,
      };
    });
  },
  multipleDelete: (ids: string[]) => {
    ids.map((id) => {
      set((state) => {
        const updateKeys = state.Keys.filter((key) => key.id !== Number(id));
        return {
          Keys: updateKeys,
        };
      });
    });
  },
}));
