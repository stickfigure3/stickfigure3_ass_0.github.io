// DrawTriangle.js (c) 2012 matsuda
function main() {
  // Retrieve <canvas> element
  var canvas = document.getElementById('example');  
  if (!canvas) { 
    console.log('Failed to retrieve the <canvas> element');
    return false; 
  } 

  // Get the rendering context for 2DCG
  var ctx = canvas.getContext('2d');

  // Draw a blue rectangle
  ctx.fillStyle = 'rgba(0, 0, 0, 1.0)'; // Set color to blue
  ctx.fillRect(0, 0, 400, 400);        // Fill a rectangle with the color

  var v1 = new Vector3([2.25, 2.25, 0]);
  drawVector(ctx, v1, "red");
  //console.log('v1 elements:', v1.elements[0], v1.elements[1]);


}

function drawVector(ctx, v, color) {
  ctx.beginPath();
  ctx.moveTo(200, 200); // Start at canvas center (assuming 400x400 resolution)
  ctx.lineTo(200 + v.elements[0] * 20, 200 - v.elements[1] * 20);
  ctx.strokeStyle = color;
  ctx.stroke();
}

function handleDrawEvent() {

  const canvas = document.getElementById('example');
  const ctx = canvas.getContext('2d');

  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'rgba(0, 0, 0, 1.0)'; // Set color to blue
  ctx.fillRect(0, 0, 400, 400);
  // Read input values
  const x1 = parseFloat(document.getElementById('x1Coord').value);
  const y1 = parseFloat(document.getElementById('y1Coord').value);


  const x2 = parseFloat(document.getElementById('x2Coord').value);
  const y2 = parseFloat(document.getElementById('y2Coord').value);
  // Create the vector
  var v1 = new Vector3([x1, y1, 0]);
  var v2 = new Vector3([x2, y2, 0]);

  // Call drawVector with the new vector and color
  drawVector(ctx, v1, 'red');
  drawVector(ctx, v2, 'blue');
}

function handleDrawOperationEvent(){
  const canvas = document.getElementById('example');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'rgba(0, 0, 0, 1.0)';
  ctx.fillRect(0, 0, 400, 400);
  const x1 = parseFloat(document.getElementById('x1Coord').value);
  const y1 = parseFloat(document.getElementById('y1Coord').value);
  const x2 = parseFloat(document.getElementById('x2Coord').value);
  const y2 = parseFloat(document.getElementById('y2Coord').value);
  const operation = document.getElementById("operation").value;
  const scalar = parseFloat(document.getElementById("scalar").value);
  var v1 = new Vector3([x1, y1, 0]);
  var v2 = new Vector3([x2, y2, 0]);


  if (operation === "add") {
        v1.add(v2);
        drawVector(ctx,v1, "green");
    }
  if (operation === "sub") {
        v1.sub(v2);
        drawVector(ctx,v1, "green");
    }
  if (operation === "mul") {
        v1.mul(scalar);
        v2.mul(scalar);
        drawVector(ctx,v1, "green");
        drawVector(ctx,v2, "green");
    }
  if (operation === "div") {
        if (scalar !== 0) {
            v1.div(scalar);
            v2.div(scalar);
            drawVector(ctx,v1, "green");
            drawVector(ctx,v2, "green");
        }
        else {
            alert("dividing by 0");
        }
    }
  if (operation === "magnitude") {
        console.log("Magnitude of v1:", v1.magnitude());
        console.log("Magnitude of v2:", v2.magnitude());
  }
  if (operation === "normalize") {
     let v3 = v1.normalize();
     let v4 = v2.normalize();
     drawVector(ctx, v3, "green");
     drawVector(ctx, v4, "green");
  }
  if (operation == "angle"){
    console.log("Angle between the two vectors is:", ang(v1, v2))
  }
  if (operation == "area"){
    console.log("Area between the two vectors is:", area(v1, v2))
  }
}

function ang(v1, v2){
    let dotprod= Vector3.dot(v1,v2);
    let mags = v1.magnitude() * v2.magnitude();
    return Math.acos(dotprod / mags) * (180 / Math.PI);
}

function area(v1, v2) {
    return 0.5 * Vector3.cross(v1, v2).magnitude();
}
