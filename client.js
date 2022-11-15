const WebSocket = require("ws");
const socket = new WebSocket("ws://localhost:8080");
const readline = require("readline");
const { table, generateKey, encryption, decryption } = require("./table");

let rl;

let key = generateKey("computer", "irfan");
let encryprtionText = encryption("computer", key);
let decryptionText = decryption(encryprtionText, key);

console.log(decryptionText);

socket.on("open", () => {
	console.log("Connected to server");
	sendMsg();
});

socket.on("message", (data) => {
	// console.log("\nNumber is : " + data);
	sendMsg();
});

socket.on("error", () => {
	console.log("Error connecting to server");
});

const sendMsg = () => {
	//closing the previous readline
	if (rl) rl.close();

	//creating a new readline
	rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	});
	rl.question(" >> ", (msg) => {
		msg = msg.split(",");

		console.log("Original Text : ", msg[0]);
		console.log("Key : ", msg[1]);
		let key = generateKey(msg[0], msg[1]);
		let encryprtionText = encryption(msg[0], key);
		console.log("Encrypted Text : ", encryprtionText);
		const data = {
			encryprtionText,
			key,
		};
		socket.send(JSON.stringify(data));
	});
};
