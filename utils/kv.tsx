import { KVNamespace } from "@cloudflare/workers-types";

const { KV_TEST } = process.env as unknown as { KV_TEST: KVNamespace };
const accountID = process.env.CLOUDFLARE_ACCOUT_ID;
const namespcaeID = process.env.CLOUDFLARE_NAMESPACE_ID;

interface getKeyProps {
  key: string;
}

const getKey = async ({ key }: getKeyProps): Promise<string | null> => {
  if (process.env.NODE_ENV == "development") {
    const res = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${accountID}/storage/kv/namespaces/${namespcaeID}/values/${key}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        return res.json();
      })
      .catch((err) => {
        console.error(err);
        return null;
      });
    if (res?.error) {
      return null;
    }
    return res;
  } else {
    const data = await KV_TEST.get(key);
    return data ?? null;
  }
};

const setKey = async (key: string, text: string, expiration: number = 60) => {
  await KV_TEST.put(key, text, { expiration: expiration });
};

const allKey = async () => {
  const list = await KV_TEST.list();
  return list;
};

export const kv = {
  getKey,
  setKey,
  allKey,
};
