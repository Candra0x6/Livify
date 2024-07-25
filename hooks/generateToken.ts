export default function generateToken(text: string) {
	const crypto = require("crypto");
	const algorithm = "aes-256-cbc";
	const key = crypto.randomBytes(32);

	const cipher = crypto.createCipher(algorithm, Buffer.from(key));
	let encrypted = cipher.update(text);
	encrypted = Buffer.concat([encrypted, cipher.final()]);
	return encrypted.toString("hex");
}
