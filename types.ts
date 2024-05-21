// export interface KeysItemList {
//   key: string,
//   value: string,
//   status: number,
//   expireTime: string
// }
export interface KeysItemList {
  name: string;
  expiration?: string;
  metadata: {
    expireTime: string;
    content: string;
    type?: number;
  };
}

export interface KeysItem {
  keys: KeysItemList[];
  total: number;
}

export type newKeysItemList = {
  name: string;
  content: string;
  expireTime: string;
  type?: number;
  id?: number;
  url?: string;
};

export type ParamData = {
  key: string;
  value: string;
  status: number;
  expireTime: string;
  type: number;
  url?: string;
};
