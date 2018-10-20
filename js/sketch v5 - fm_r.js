function sig(x) {return -2/(1 + pow(2.718281828, -x)) }
function setup() {createCanvas(900, 400, WEBGL) }

let points = []
let history = []
let a = 0
let a_delta = 0.13
let inc = 0
let inc_d = 0.1


// радиус сферы 
let r = 250

// .........................................
let speed_of_finfing_dots = 3 	// <--- дельта
let fra = 0						// <--- начало
let fra_delta = 5				// <--- общая дельта
let next_fra = fra_delta		// <--- след. точка
// .........................................

// длина хвоста
let tail_len = 640

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
	// rotateY(radians(-frameCount*.5))
	translate(-width/2, -height/2)

	// показывать вспогомательные линии
	// base
	noFill()
	stroke(255, 10)
	// ellipse(width/2, height/2, r, r)
	line(0, height/2, width, height/2) // hor
	line(width/2, 0, width/2, height) // ver

	stroke(255)
	push()

	let rx = 0
	let ry = 0
	translate((width/2), height/2)
	for (var i = fra; i < next_fra; i+=speed_of_finfing_dots) {
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

	history.map(b =>
		{
			push()
			stroke(160, b[0], 220)
			translate(width/2, height/2, b[0]/2)
			rotate(b[1])
			
			// 1 way
			translate(b[0], 0)
			box(b[0], 0, 5)
			
			// 2 way
			ellipse(b[0], 0, 5, 5)
			
			pop()
		}
		)


}