let canvas = document.getElementById('canvas');
ctx = canvas.getContext('2d');
canWid = document.documentElement.clientWidth - 300;
canHei = document.documentElement.clientHeight;
canvas.width = canWid;
canvas.height = canHei;

// let main parametrs for draw
let R, r, d, step, tetaStep = 0.01, teta = 0;

// let color line parametr
let colorLine;

// let blur parametrs
let shadowBlurColor;
let getShadowOffsetX, getShadowOffsetY;

// let filter parametrs
let hueAngle = 0;
let hueAngleStep = 0.1;
let hueCount = 1;
let hueTimer;
let buttonRotate = document.querySelector('.rotate');




let spiro = function () {
	// main parametrs for draw
	R = Number(document.querySelector('.bigRad').value);
	r = Number(document.querySelector('.smallRad').value);
	d = Number(document.querySelector('.d').value);
	step = Number(document.querySelector('.step').value);
	tetaStep = Number(document.querySelector('.teta').value);

	// parametr for color line
	colorLine = document.querySelector('.chooseColor').value;
	ctx.fillStyle = colorLine;

	// parametrs for blur color and size
	ctx.shadowColor = document.querySelector('.shadowBlurColor').value;
	ctx.shadowBlur = document.querySelector('.shadowBlurSize').value;
	// parametrs for blur offsetX and offsetY
	ctx.shadowOffsetX = document.querySelector('.getShadowOffsetX').value;
	ctx.shadowOffsetY = document.querySelector('.getShadowOffsetY').value;

	// hue-rotate function
	document.querySelector('.rotate').onclick = mainHue;

	// main formula
	let x = (R - r) * Math.cos(teta) + d * Math.cos((R - r) * teta / r);
	let y = (R - r) * Math.sin(teta) - d * Math.sin((R - r) * teta / r);
	teta += tetaStep;

	ctx.fillRect(x + canWid / 2, y + canHei / 2, 4, 4);
	timer = setTimeout(spiro, step);
};
spiro();




// functions for hue-rotate
function mainHue() {
	hueCount++;
	if (hueCount % 2 === 0) {
		hueTimer = setInterval(hueRotate, 10);
		buttonRotate.innerHTML = 'Оттенок-вкл';
	} else {
		buttonRotate.innerHTML = 'Оттенок-выкл';
		clearInterval(hueTimer);
	}
}

function hueRotate() {
	ctx.filter = `hue-rotate(${hueAngle}deg)`;
	hueAngle += hueAngleStep;
}





// extraneous actions
let clear, stopGoCount = 1;

clear = document.querySelector('.clear')
clear.onclick = function () {
	ctx.clearRect(0, 0, canWid, canHei);
}
let stop = document.querySelector('.stop');
stop.onclick = function () {
	if (stopGoCount % 2 === 0) {
		Go();
	} else stopGo();
	stopGoCount++;
}

let Go = function () {
	stop.innerHTML = 'Stop?';
	spiro();
}

let stopGo = function () {
	stop.innerHTML = 'Go?';
	clearTimeout(timer);
}

let choiseParametrs = function (e) {
	if (e.keyCode === 13) {
		let colorCanvas = prompt('подсветка холста', 'red');
		canvas.style['boxShadow'] = `1px 1px 19px ${colorCanvas}`
	}
};
window.addEventListener('keydown', choiseParametrs)
