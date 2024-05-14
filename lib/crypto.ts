import {
  createCipheriv,
  createDecipheriv,
  randomBytes,
  scryptSync,
  generateKeyPairSync,
  publicEncrypt,
} from "crypto";

// AES 加密配置
// const algorithm = 'aes-256-cbc';
// const password = 'ads123qw3q123jj'; // 使用强密码替换此处
// const key = scryptSync(password, 'salt', 32);
// const iv = randomBytes(16);

// // 加密函数
// export function encrypt(text: string): string {
//     const cipher = createCipheriv(algorithm, key, iv);
//     let encrypted = cipher.update(text, 'utf8', 'hex');
//     encrypted += cipher.final('hex');
//     return encrypted;
// }

// // 解密函数
// export function decrypt(encrypted: string): string {
//     const decipher = createDecipheriv(algorithm, key, iv);
//     let decrypted = decipher.update(encrypted, 'hex', 'utf8');
//     decrypted += decipher.final('utf8');
//     return decrypted;
// }

// // 测试加解密
// const text = 'Hello, world!';
// const encrypted = encrypt(text);
// const decrypted = decrypt(encrypted);

// console.log(`Original: ${text}`);
// console.log(`Encrypted: ${encrypted}`);
// console.log(`Decrypted: ${decrypted}`);


// 生成随机盐值
function generateSalt(length: number): string {
  return randomBytes(length).toString('base64');
}

// 加盐并返回 Base64 编码
export function encodeBase64WithSalt(data: string, salt: string = randomBytes(30).toString('base64')): string {
  // 使用盐值和原始数据创建加密的 Buffer
  const buffer = Buffer.from(data + salt);
  return buffer.toString('base64');
}

// 解码 Base64 编码，并移除盐值
export function decodeBase64WithSalt(encodedData: string, saltLength: number): string {
  const buffer = Buffer.from(encodedData, 'base64');
  const dataWithSalt = buffer.toString();
  return dataWithSalt.slice(0, -saltLength); // 假定盐值加在了数据的尾部
}

