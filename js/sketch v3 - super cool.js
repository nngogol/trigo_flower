function sig(x) {return -2/(1 + pow(2.718281828, -x)) }

function setup() {
	createCanvas(900, 400)
}

let points = []
let history = []
let  a = 0
let  a_delta = 0.13
let inc = 0
let inc_d = 0.1
let r = 250

let fra = 0
let fra_delta = 5
let next_fra = fra_delta

function draw() {
	background(51)
	inc += inc_d; if (inc > 5 || inc < -5) {inc_d *= -1 }

	// base
	noFill()
	stroke(255, 255, 0)
	line(0, height/2, width, height/2) // hor
	line(width/2, 0, width/2, height) // ver
	ellipse(width/2, height/2, r, r)

	stroke(255)
	push()

	let rx = 0
	let ry = 0
	translate((width/2), height/2)
	for (var i = fra; i < next_fra; i+=3) {
		angle = radians(-i)
		rotate(angle)
		
		let final_x = r/2 + cos(i*.0422)*r/5
		// ellipse(final_x, 0, 5, 5)
		
		history.push([final_x, angle])
	}
	next_fra += fra_delta
	fra += fra_delta



	pop()
	// хвост
	// константный хвост 5000
	if (history.length > 5000){history.splice(0,1)}

	// константный хвост 100
	// if (history.length  > 100){history.splice(0,1)}

	// постепенный хвост
	// if (history.length * random(3,10) < history.length * random(5,10)){history.splice(0,1)}

	history.map(b =>
		{
			push()
			translate(width/2, height/2)
			rotate(b[1])
			ellipse(b[0], 0, 5, 5)
			
			pop()
		}
		)


}