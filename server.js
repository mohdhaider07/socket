const { Server } = require("socket.io");
const readline = require("readline");

const io = new Server(5000);

io.on("connection", (socket) => {
	console.log("New client connected", socket.id);

	socket.on("disconnect", () => {
		console.log("Client disconnected");
	});

	socket.on("chat message", (msg) => {
		let mseg = msg.split(",")[0];
		let userId = msg.split(",")[1];
		// console.log(msg);
		if (userId) {
			console.log("userid exist");
			socket.to(userId).emit("chat message", { msg: mseg, id: socket.id });
		} else {
			socket.broadcast.emit("chat message", { msg: mseg, id: socket.id });
		}

		// const rl = readline.createInterface({
		// 	input: process.stdin,
		// 	output: process.stdout,
		// });

		// rl.question("Enter Message:  ", (message) => {
		// 	console.log(message);
		// 	socket.emit("chat message", { msg: message, id: socket.id });
		// 	rl.close();
		// });
	});
});
