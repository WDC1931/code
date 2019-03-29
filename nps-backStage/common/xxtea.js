const xxtea = require('xxtea-node');

const XXTea = {
  // 加密
  encrypt(plainText, secret) {
    if (!plainText) {
      return '';
    }
    // Fixed Bug: Int 型数字加密会返回空，先转换为字符串类型
    let array = xxtea.encrypt(
      xxtea.toBytes(plainText.toString()),
      xxtea.toBytes(secret)
    );
    let buffer = Buffer.from(array);
    let encryptedText = buffer.toString('hex');
    return encryptedText;
  },

  // 解密
  decrypt(encryptedText, secret) {
    if (!encryptedText) {
      return '';
    }
    let buffer = new Buffer(encryptedText, 'hex');
    let array = new Uint8Array(buffer);
    let plainText = xxtea.toString(xxtea.decrypt(array, xxtea.toBytes(secret)));
    return plainText;
  }
};

module.exports = XXTea;
