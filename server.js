const http = require('http');
const express = require('express');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

let players = {};

app.use(express.static(path.join(__dirname, 'public/dist')));

app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, 'public', 'dist', 'index.html'));
});

io.on("connection", (socket) => {
	console.log("client connected!");
	
	io.emit("spawn_player", socket.id, players);
	players[socket.id] = {
		"id": socket.id,
		"pos": {
			x: 0,
			y: 0,
			z: 0
		},
		"hidden": false
	};
	socket.on("disconnect", () => {
		console.log(players);
		console.log("client disconnected!");
		io.emit("despawn_player", socket.id);
		players[socket.id]["hidden"] = true;
	});

	socket.on("update_player_pos", (player_id, player_pos) => {
		console.log(players);
		players[socket.id]["pos"] = player_pos;
		io.emit("update_player_pos", player_id, player_pos);
	});
});

server.listen(8080, () => {
	console.log("server listening on port 8080");	
});
