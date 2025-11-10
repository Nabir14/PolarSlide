export class Input {
	constructor(){
		this.KeyCode = {
			KEY_A: 65, KEY_B: 66, KEY_C: 67, KEY_D: 68, KEY_E: 69,
			KEY_F: 70, KEY_G: 71, KEY_H: 72, KEY_I: 73, KEY_J: 74,
			KEY_K: 75, KEY_L: 76, KEY_M: 77, KEY_N: 78, KEY_O: 79,
			KEY_P: 80, KEY_Q: 81, KEY_R: 82, KEY_S: 83, KEY_T: 84,
			KEY_U: 85, KEY_V: 86, KEY_W: 87, KEY_X: 88, KEY_Y: 89,
			KEY_Z: 90, KEY_0: 48, KEY_1: 49, KEY_2: 50, KEY_3: 51,
			KEY_4: 52, KEY_5: 53, KEY_6: 54, KEY_7: 55, KEY_8: 56,
			KEY_9: 57, ESCAPE: 27, BACKSPACE: 8, ENTER: 13, TAB: 9,
			SHIFT: 16, CONTROL: 17, ALT: 18, CAPS_LOCK: 20, LEFT: 37,
			RIGHT: 39, UP: 38, DOWN: 40, SPACE: 32
		};
		this.EventQueue = {};
	}

	queueKeyEvent(){
		window.addEventListener('keydown', (Event) => {
			this.EventQueue[Event.keyCode] = true;
		});
		window.addEventListener('keyup', (Event) => {
			this.EventQueue[Event.keyCode] = false;
		});

	}
	checkKey(key){
		return (this.EventQueue[key] === true);
	}
}
