import { sm2 } from 'sm-crypto-v2'

// let keypair = sm2.generateKeyPairHex()

// let publicKey = keypair.publicKey // 公钥
// let privateKey = keypair.privateKey // 私钥

// 默认生成公钥 130 位太长，可以压缩公钥到 66 位
// const compressedPublicKey = sm2.compressPublicKeyHex(publicKey) // compressedPublicKey 和 publicKey 等价
// sm2.comparePublicKeyHex(publicKey, compressedPublicKey) // 判断公钥是否等价

// 自定义随机数，参数会直接透传给 BigInt 构造器
// 注意：开发者使用自定义随机数，需要自行确保传入的随机数符合密码学安全

/// 初始化随机数池，在某些场景下可能会用到
// await sm2.initRNGPool()/ let keypair2 = sm2.generateKeyPairHex('12321319322324451')

const publicKey = '0409217ff7415860e94d70db168783db66552f0e87199ad58cf424966884dffe2697c1806badffc9cf0e93548321fa5a9df2a6921b425c2e5bc524f4ccd8418275'
const privateKey = '40a1dbc95f2a652a6bfb53d8da8a0d947572c1fa96bb1bdd107f28fe43dc51af'

// let verifyResult = sm2.verifyPublicKey(publicKey) // 验证公钥
// console.log(verifyResult)

const cipherMode = 1 // 1 - C1C3C2，0 - C1C2C3，默认为1
// 支持使用 asn1 对加密结果进行编码，在 options 参数中传入 { asn1: true } 即可，默认不开启
export function sm2Encrypt(msg: string): string {
  return sm2.doEncrypt(msg, publicKey, cipherMode, { asn1: false })
}

export function sm2Decrypt(encryptData: string): string {
  const decoder = new TextDecoder();
  try {
    const res = sm2.doDecrypt(encryptData,privateKey,cipherMode,{output: 'array',asn1:false})
    return decoder.decode(res)
  } catch {
    return "false"
  }
}
