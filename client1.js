const { io } = require("socket.io-client");
const readline = require("readline");

const socket = io("http://localhost:5000");

socket.on("connect", () => {
	console.log("Connected to server", socket.id);
});

socket.emit("chat message", `Hello `);

socket.on("chat message", ({ msg, id }) => {
	console.log("user id =>", id);
	console.log("message =>", msg);
	sendMessage(socket);
});

const sendMessage = (socket) => {
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	});

	rl.question("Enter Message:  ", (message) => {
		socket.emit("chat message", `${message}`);
		rl.close();
	});
};
