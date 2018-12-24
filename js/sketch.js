function sig(x) {return -2/(1 + pow(2.71828, -x)) }
function setup() {createCanvas(700, 500, WEBGL) }

let points = []
let history = []
let a = 0
let a_delta = 0.14
let inc = 0
let inc_d = 0.1


// радиус сферы 
let r = 200

// .........................................
let speed_of_finfing_dots = 6 	// <--- дельта
let fra = 0						// <--- начало
let fra_delta = 3				// <--- общая дельта
let next_fra = fra_delta		// <--- след. точка
// .........................................

// длина хвоста
let tail_len = 250

// формула
function formula(rad, delta) {
	return rad/2 + tan(delta*.0376)*r/3
	// return rad/2 + cos(delta*.0522)*r/6
}

function draw() {
	// inc += inc_d; if (inc > 5 || inc < -5) {inc_d *= -1 }
	background(41)
	scale(.4)

	// вертеть
	rotateY(radians(-40-frameCount*.5))
	translate(-width/2, -height/2)

	// показывать вспогомательные линии
	// base
	// noFill()
	// stroke(255, 10)
	// // ellipse(width/2, height/2, r, r)
	// line(0, height/2, width, height/2) // hor
	// line(width/2, 0, width/2, height) // ver

	stroke(255)
	push()

	let rx = 0
	let ry = 0
	translate((width/2), height/2)

	for (let i = fra; i < next_fra; i+=speed_of_finfing_dots) {
		angle = radians(-i)
		rotate(angle)
		
		let final_x = formula(r, i)
		// ellipse(final_x, 0, 5, 5)
		
		history.push([final_x, angle])
	}
	next_fra += fra_delta
	fra += fra_delta


	pop()
	// хвост
	if (history.length > tail_len){history.splice(0,3)}

	for (let i = 0; i < history.length; i++) {
		let some_point = history[i]

		push()
		stroke(160, some_point[0], 220)
		translate(width/2, height/2, some_point[0]/2)
		rotate(some_point[1])
		
		// 1 way
		translate(some_point[0], 0)
		box(some_point[0], 0, 5)
		
		// 2 way
		// ellipse(some_point[0], 0, 5, 5)
		
		pop()
	}

}
