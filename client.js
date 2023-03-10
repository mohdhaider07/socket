const WebSocket = require("ws");
const socket = new WebSocket("ws://localhost:8080");
const readline = require("readline");
// Here r1 is used for readline
  var r1; 
socket.on("open", () => {
	console.log("Connected to server");
	sendMsg();
});
     
socket.on("message", (data) => {
	console.log("\nNumber is : " + data);
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
	rl.question(">> ", (msg) => {
		socket.send(msg);
	});
};
