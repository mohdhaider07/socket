const { WebSocketServer } = require("ws");
const wss = new WebSocketServer({ port: 8080 });
const readline = require("readline");
const { table, generateKey, encryption, decryption } = require("./table");

let rl;

// console.log(table);

// let key=generateKey("computer","irfan");
// let encryprtionText=encryption("computer", key);
// decryption(encryprtionText,key);

wss.on("connection", (ws) => {
	console.log("Client connected");

	ws.on("message", (data) => {
		// console.log("\nClient: " + message);
		// Number(message) % 2 === 0 ? ws.send("Even") : ws.send("Odd");
		data = JSON.parse(data);
		let decryptionText = decryption(data.encryprtionText, data.key);
		console.log("Decrypted Text : ", decryptionText);

		// sendMsg(ws);
	});

	ws.on("close", () => {
		console.log("Client disconnected");
	});
});

const sendMsg = (ws) => {
	if (rl) rl.close();
	rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	});
	rl.question(">> ", (msg) => {
		ws.send(msg);
		rl.close();
	});
};
