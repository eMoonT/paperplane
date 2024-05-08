import { KVNamespace } from "@cloudflare/workers-types";

const { KV_TEST } = process.env as unknown as { KV_TEST: KVNamespace };

const getKey = async (key: string) => {
  await KV_TEST.get(key)
};

const setKey = async (key:string,text:string,expiration:number = 60) => {
  await KV_TEST.put(key,text,{expiration: expiration})
}

const allKey = async () => {
  const list = await KV_TEST.list()
  return list
}

export const kv = { 
  getKey,
  setKey,
  allKey
};