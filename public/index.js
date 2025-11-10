import * as T from 'three';
import { PlayerManager  } from '/engine/PlayerManager.js';
import { Input } from '/engine/Input.js';

console.log("PolarSlide Client Launched! 2");

const socket = io();
const input = new Input();

const scene = new T.Scene();
const camera = new T.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new T.WebGLRenderer();

camera.position.z = 1.5;
camera.position.z = 3.0;

const player_manager = new PlayerManager(scene);

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(
	renderer.domElement,
);
renderer.setAnimationLoop(gameLoop);	

socket.on("spawn_player", (player_id, old_players) => {
	if(Object.keys(old_players).length > 0){
		Object.values(old_players).forEach(old_player => {
			if(socket.id === old_player["id"]){
				return;
			}
			if(old_player["hidden"]){
				return;
			}
			player_manager.spawnPlayer(old_player["id"], old_player["pos"]);
		});
	}
	player_manager.spawnPlayer(player_id);
});

socket.on("despawn_player", (player_id) => {
	player_manager.despawnPlayer(player_id);
});

socket.on("update_player_pos", (player_id, player_data) => {
	if(player_id === socket.id){
		return;
	}
	const player = scene.getObjectByName(player_id);
	player.position.x = player_data.x;
	player.position.y = player_data.y;
	player.position.z = player_data.z;
});

input.queueKeyEvent();

function gameLoop(){
	gameInputLogic();
	renderer.render(scene, camera);
}

function updateCameraPosition(){
	const player = scene.getObjectByName(socket.id);
	camera.position.x = player.position.x;
	camera.position.y = player.position.y;
	camera.position.z = player.position.z + 3.0;
}

function gameInputLogic(){
	if(input.checkKey(input.KeyCode.UP)){
		scene.getObjectByName(socket.id).position.z -= 0.01;
		const data = scene.getObjectByName(socket.id).position;
		socket.emit("update_player_pos", socket.id, { x: data.x, y: data.y, z: data.z });		
		updateCameraPosition();
	}
	if(input.checkKey(input.KeyCode.DOWN)){
		scene.getObjectByName(socket.id).position.x += 0.01;
		const data = scene.getObjectByName(socket.id).position;
		socket.emit("update_player_pos", socket.id, { x: data.x, y: data.y, z: data.z });
		updateCameraPosition();
	}
	if(input.checkKey(input.KeyCode.LEFT)){
		scene.getObjectByName(socket.id).position.x -= 0.01;
		const data = scene.getObjectByName(socket.id).position;
		socket.emit("update_player_pos", socket.id, { x: data.x, y: data.y, z: data.z });
		updateCameraPosition();
	}
	if(input.checkKey(input.KeyCode.RIGHT)){
		scene.getObjectByName(socket.id).position.x += 0.01;
		const data = scene.getObjectByName(socket.id).position;
		socket.emit("update_player_pos", socket.id, { x: data.x, y: data.y, z: data.z });
		updateCameraPosition();
	}

}
