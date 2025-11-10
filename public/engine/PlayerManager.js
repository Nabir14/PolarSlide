import * as T from "three";

export class PlayerManager {
	constructor(scene){
		this.scene = scene;
	}
	spawnPlayer(player_id, pos = {x: 0, y: 0, z: 0}){
		const box = new T.BoxGeometry(1, 1, 1);
		const material = new T.MeshBasicMaterial({color: 0x0000ff});
		const object = new T.Mesh(box, material);
		object.name = player_id;
		object.position.x = pos.x;
		object.position.y = pos.y;
		object.position.z = pos.z;
		this.scene.add(object);
	}
	despawnPlayer(player_id){
		this.scene.remove(this.scene.getObjectByName(player_id));
	}
}
