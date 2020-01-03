let r1, r2;
r1length = 50;
r2length = 80;
angularvelocity =0.02;
let i = 0;
let locus = [];
function setup(){
	createCanvas(300,300);
	r1 = new rod(r1length, 150, 150);
	r2 = new rod(r2length, r1.end.x, r1.end.y);
}

function draw(){
	stroke(0,255,255);
	background(0);
	fill(100);
	ellipse(150,150,7);
	stroke(150);
	strokeWeight(0.4);
	line(0,150,width, 150);


	r1.show();
	r2.show();
	rectMode(CENTER);
	stroke(0,0,255);
	rect(r2.end.x,r2.end.y, 10, 10);
	ellipse(r2.begin.x, r2.begin.y,1.4);

	r1.makeAngle(i);

	r2.begin = r1.end;
	r2.setLength(r2length); //only for r2

	locus.push(	new dot( (r2.begin.x+r2.end.x)/2, (r2.begin.y+r2.end.y)/2 )	  );
	for( each of locus){
		each.disp();
	}

	i+=angularvelocity;
	if(i >= 2*PI){
		i = 0;
	}

}

function rod(length, begin1, begin2){
	this.length = new vector(0,0);
	this.length.setR(length);
	this.angle = 0;
	this.length.setAngle(this.angle);
	this.begin = new vector( begin1, begin2);
	this.end = new vector(0,0);
	this.end = vectorsum(this.begin, this.length);

	this.show = function(){
		push();
		strokeWeight(1);
		stroke(255,0,0);
		line(this.begin.x, this.begin.y, this.end.x, this.end.y);
		pop();
	}
	this.makeAngle = function(angle){

		this.length.setAngle(angle);
		this.end = vectorsum(this.begin, this.length);
	}
	this.setLength = function(l){
		this.length.setR(l);
		// console.log(PI - asin(r1length/sin(i)*1/r2length));
		this.length.setAngle(PI + asin(r1length*sin(i)/r2length));
		this.end = vectorsum(this.begin, this.length);
	}
}

function dot(a,b){
	this.x = a;
	this.y = b;

	this.disp = function(){
		fill(255);
		noStroke();
		ellipse(this.x,this.y,1);
	}
}

function vectorsum(a,b){
	let c = new vector(0,0);
	c.setX(a.x + b.x);
	c.setY(a.y + b.y);
	return c;
}
