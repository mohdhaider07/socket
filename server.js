const { WebSocketServer } = require("ws");
const wss = new WebSocketServer({ port: 8080 });
const readline = require("readline");

let rl;

wss.on("connection", (ws) => {
	console.log("Client connected");

	ws.on("message", (message) => {
		console.log("\nClient: " + message);
		Number(message) % 2 === 0 ? ws.send("Even") : ws.send("Odd");
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
