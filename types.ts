// export interface KeysItemList {
//   key: string,
//   value: string,
//   status: number,
//   expireTime: string
// }
export interface KeysItemList {
  name: string,
  metadata: {
    expireTime: string,
    content: string
  }
}

export interface KeysItem {
  keys: KeysItemList[],
  total: number
}