import jwt from 'jsonwebtoken';

const secretKey = 'cccf0bba83a64d1c9ed149ed475bc1fa'; // 保密且复杂的密钥

// 生成 JWT
export function generateToken(data: object): string {
    const token = jwt.sign(data, secretKey, { expiresIn: '1h' }); // 令牌有效期1小时
    return token;
}

// 验证 JWT
export function verifyToken(token: string): jwt.JwtPayload | string {
    try {
        const decoded = jwt.verify(token, secretKey);
        return decoded;
    } catch (error) {
        return 'Token is invalid or has expired';
    }
}

// 示例使用
const myData = { id: 1, name: 'John Doe' };
const token = generateToken(myData);
console.log(`Generated Token: ${token}`);

const verificationResult = verifyToken(token);
console.log(`Verification Result: `, verificationResult);
