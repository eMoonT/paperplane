interface CloudflareEnv {
  // The KV Namespace binding type used here comes
  // from `@cloudflare/workers-types`. To use it in such
  // a way make sure that you have installed the package
  // as a dev dependency and you have added it to your
  //`tsconfig.json` file under `compilerOptions.types`.
  KV_TEST: KVNamespace,
  PASSWD: string,
  JWT_SECRET_KEY: string,
  R2_ACCOUNT_ID: string,
  R2_ACCESS_KEY_ID: string,
  R2_SECRET_KEY_ID: string,
  R2_BUCKET_NAME: string,
  PUBLIC_R2_URL: string,
}