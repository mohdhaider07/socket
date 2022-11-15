const table = [["a", "b", "c", "d"]];

for (let i = 0; i < 26; i++) {
	for (let j = 0; j < 26; j++) {
		table.push;
	}
}

function generateKey(str, key) {
	key = key.split("");
	if (str.length == key.length) return key.join("");
	else {
		let temp = key.length;
		for (let i = 0; i < str.length - temp; i++) {
			key.push(key[i % key.length]);
		}
	}
	return key.join("");
}

function encryption(inputText, key) {
	inputText = inputText.toLowerCase();
	key = key.toLowerCase();
	let encryptedText = "";

	for (let i = 0; i < inputText.length; i++) {
		encryptedText += intToChar(
			parseInt(
				charToInt(inputText[i]) + charToInt(key[i]) - charToInt("a")
			) % 26
		);
		//    console.log(parseInt((charToInt(inputText[i]) + charToInt(key[i]) - charToInt('a'))));
	}

	// console.log("encryption text", encryptedText);
	return encryptedText;
}

function decryption(encryptedText, key) {
	encryptedText = encryptedText.toLowerCase();
	key = key.toLowerCase();
	let decryptionText = "";
	for (let i = 0; i < encryptedText.length; i++) {
		decryptionText += intToChar(
			parseInt(
				charToInt(encryptedText[i]) -
					charToInt(key[i]) +
					26 +
					charToInt("a")
			) % 26
		);
		//    console.log(parseInt((charToInt(inputText[i]) + charToInt(key[i]) - charToInt('a'))));
	}
	// console.log("decryption text", decryptionText);
	return decryptionText;
}

function charToInt(char) {
	const code = "a".charCodeAt(0);
	// console.log(code);
	return char.charCodeAt(0) - code;
}

function intToChar(int) {
	const code = "a".charCodeAt(0);
	// console.log(code); // 👉️ 65

	return String.fromCharCode(code + int);
}

module.exports = { table, generateKey, encryption, decryption };
