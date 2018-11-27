var myLoc;
var myMap;
var canvas;
var mappa = new Mappa ('MapboxGL', 'pk.eyJ1IjoiZGlwaGxhIiwiYSI6ImNqb3F1dTZxMzA5MnozcnJuZXRrNDB4dGQifQ.ie8cDKN7f0RxgGIQ45-c8g')

//international date line
var changedaylineLon = 180;

var options = {
  lat: 0,
  lng: 0,
  zoom: 5,
  style: "mapbox://styles/diphla/cjp02q2iw0bso2ro71pkvmmrs"
}

//clock
var cx, cy;
var secondsRadius;
var minutesRadius;
var hoursRadius;
var clockDiameter;


function preload(){
  myLoc = getCurrentPosition();
}

function setup() {

  canvas = createCanvas(windowWidth,windowHeight);

  //update options according to current location
	options.lat = myLoc.latitude;
	options.lng = myLoc.longitude;

  myMap = mappa.tileMap(options);
  myMap.overlay(canvas);

  //clock
  stroke(255);
  var radius = min(width, height) / 8;
  secondsRadius = radius * 0.71;
  minutesRadius = radius * 0.60;
  hoursRadius = radius * 0.50;
  clockDiameter = radius * 1.7;
  cx = 7*width/8
  cy = height/6;
}

function draw() {
  clear(); //remove everything you have drawn so far

  var point = myMap.latLngToPixel(myLoc.latitude, myLoc.longitude);
  noFill();
  stroke(50,78,82);
  ellipse(point.x,point.y, random(15,30));
  fill(255);
  strokeWeight(1);
  ellipse(point.x, point.y, 15);

  //text
  textSize(50);
  textFont('Gotham');
  textStyle(BOLD);
  fill(255);
  strokeWeight(6);
  stroke(50,78,82);
  textAlign(CENTER);

  //time zones
  if (-7.5 < myLoc.latitude && myLoc.latitude < 7.5) {
  text('You are in the UTC time zone', width/2, 7*height/8)
  } else if (7.5 < myLoc.latitude && myLoc.latitude > 22.5) {
  text('You are in the UTC+1 time zone', width/2, 7*height/8)
  } else if (22.5 < myLoc.latitude && myLoc.latitude > 37.5) {
    text('You are in the UTC+2 time zone', width/2, 7*height/8)
  } else if (37.5 < myLoc.latitude && myLoc.latitude > 52.5) {
    text('You are in the UTC+3 time zone', width/2, 7*height/8)
  } else if (52.5 < myLoc.latitude && myLoc.latitude > 67.5) {
    text('You are in the UTC+4 time zone', width/2, 7*height/8)
  } else if (67.5 < myLoc.latitude && myLoc.latitude > 82.5) {
    text('You are in the UTC+5 time zone', width/2, 7*height/8)
  } else if (82.5 < myLoc.latitude && myLoc.latitude > 97.5) {
    text('You are in the UTC+6 time zone', width/2, 7*height/8)
  } else if (97.5 < myLoc.latitude && myLoc.latitude > 112.5) {
    text('You are in the UTC+7 time zone', width/2, 7*height/8)
  } else if (112.5 < myLoc.latitude && myLoc.latitude > 127.5) {
    text('You are in the UTC+8 time zone', width/2, 7*height/8)
  } else if (127.5 < myLoc.latitude && myLoc.latitude > 142.5) {
    text('You are in the UTC+9 time zone', width/2, 7*height/8)
  } else if (142.5 < myLoc.latitude && myLoc.latitude > 157.5) {
    text('You are in the UTC+10 time zone', width/2, 7*height/8)
  } else if (157.5 < myLoc.latitude && myLoc.latitude > 172.5) {
    text('You are in the UTC+11 time zone', width/2, 7*height/8)
  } else if (172.5 < myLoc.latitude && myLoc.latitude > 187.5) {
    text('You are in the UTC+12 time zone', width/2, 7*height/8)
  } else if (-7.5 > myLoc.latitude && myLoc.latitude > -22.5) {
  text('You are in the UTC-1 time zone', width/2, 7*height/8)
  } else if (-22.5 > myLoc.latitude && myLoc.latitude > -37.5) {
    text('You are in the UTC-2 time zone', width/2, 7*height/8)
  } else if (-37.5 > myLoc.latitude && myLoc.latitude > -52.5) {
    text('You are in the UTC-3 time zone', width/2, 7*height/8)
  } else if (-52.5 > myLoc.latitude && myLoc.latitude > -67.5) {
    text('You are in the UTC-4 time zone', width/2, 7*height/8)
  } else if (-67.5 > myLoc.latitude && myLoc.latitude > -82.5) {
    text('You are in the UTC-5 time zone', width/2, 7*height/8)
  } else if (-82.5 > myLoc.latitude && myLoc.latitude > -97.5) {
    text('You are in the UTC-6 time zone', width/2, 7*height/8)
  } else if (-97.5 > myLoc.latitude && myLoc.latitude > -112.5) {
    text('You are in the UTC-7 time zone', width/2, 7*height/8)
  } else if (-112.5 > myLoc.latitude && myLoc.latitude > -127.5) {
    text('You are in the UTC-8 time zone', width/2, 7*height/8)
  } else if (-127.5 > myLoc.latitude && myLoc.latitude > -142.5) {
    text('You are in the UTC-9 time zone', width/2, 7*height/8)
  } else if (-142.5 > myLoc.latitude && myLoc.latitude > -157.5) {
      text('You are in the UTC-10 time zone', width/2, 7*height/8)
  } else if (-157.5 > myLoc.latitude && myLoc.latitude > -172.5) {
  text('You are in the UTC-11 time zone', width/2, 7*height/8)
  }

  //calc distance date line
  var distance = calcGeoDistance(myLoc.latitude, myLoc.longitude, changedaylineLon, changedaylineLon, "km");
  textSize(28);
  textAlign(CENTER);
  text('and ' + distance + ' Km from the international date line', width/2, 11*height/12);

  //clock
  noStroke()
  fill(255);
  ellipse(cx, cy, clockDiameter + 40, clockDiameter + 40);
  fill(50,78,82);
  ellipse(cx, cy, clockDiameter, clockDiameter);

  //angles
  var s = map(second(), 0, 60, 0, TWO_PI) - HALF_PI;
  var m = map(minute() + norm(second(), 0, 60), 0, 60, 0, TWO_PI) - HALF_PI;
  var h = map(hour() + norm(minute(), 0, 60), 0, 24, 0, TWO_PI * 2) - HALF_PI;

  //clock hands
  stroke(255);
  strokeWeight(1);
  line(cx, cy, cx + cos(s) * secondsRadius, cy + sin(s) * secondsRadius);
  strokeWeight(4);
  line(cx, cy, cx + cos(m) * minutesRadius, cy + sin(m) * minutesRadius);
  strokeWeight(5);
  line(cx, cy, cx + cos(h) * hoursRadius, cy + sin(h) * hoursRadius);

  //minute ticks
  strokeWeight(3);
  beginShape(POINTS);
  for (var a = 0; a < 360; a+=6) {
  var angle = radians(a);
  var x = cx + cos(angle) * secondsRadius;
  var y = cy + sin(angle) * secondsRadius;
  vertex(x, y);
  }
  endShape();
}
