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

interface setKeyProps {
  key: string;
  text: string;
  expiration?: number;
}

const setKey = async ({
  key,
  text,
  expiration = 60,
}: setKeyProps): Promise<string | null> => {
  if (process.env.NODE_ENV == "development") {
    const form = new FormData();
    form.append("metadata", "");
    form.append("value", text);
    const url = `https://api.cloudflare.com/client/v4/accounts/${accountID}/storage/kv/namespaces/${namespcaeID}/values/${key}`;
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.CLOUDFLARE_AUTH_TOKEN}`,
      },
      body: key,
    };
    const res = await fetch(url, options)
      .then((res) => {
        return res.json();
      })
      .catch((err) => {
        console.error(err);
        return null;
      });
    return res;
  } else {
    await KV_TEST.put(key, text, { expiration: expiration });
    return "true";
  }
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
