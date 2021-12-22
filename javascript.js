// reference to the canvas element and the context
const canvas = document.getElementById('canvas');
const c = canvas.getContext('2d');

// empty array to push the particles to when the image is loaded
let particles;
let parts;

// set the image data
const image = new Image();
image.src = base64img;

// when image is loaded, run this function
image.onload = function () {
  setupImage();
};

// preparing various settings, filling the particles array and executing the animate function
function setupImage() {
  // clearing the particles array before filling it
  particles = [];
  // setting height and width of canvas according to image (dynamic)
  canvas.width = image.width;
  canvas.height = image.height;

  parts; // total number of parts = this value * this value

  console.log(canvas.width);
  if (canvas.width > 1000) {
    parts = 40;
  } else if (canvas.width > 800) {
    parts = 30;
  } else if (canvas.width > 400) {
    parts = 20;
  } else {
    parts = 10;
  }

  const size = canvas.width / parts;

  c.drawImage(image, 0, 0);
  // splitting the image in parts
  for (let y = 0; y < canvas.height; y += canvas.height / parts) {
    for (let x = 0; x < canvas.width; x += canvas.width / parts) {
      const part = c.getImageData(
        x,
        y,
        canvas.width / parts,
        canvas.height / parts
      );
      const color =
        'rgba(' +
        part.data[0] + // red
        ', ' +
        part.data[1] + // green
        ', ' +
        part.data[2] + // blue
        ', ' +
        part.data[3] + // alpha
        ')';
      particles.push(new Particle(part, x, y, size, color));
    }
  }
  animate();
}

// this mode-variable is used to determine which method to trigger in the animate function below
let mode = 1;

// function to animate the canvas, with pause parameter (0)
function animate(paused) {
  if (paused === 0) {
    console.log('Animation paused!');
  } else {
    c.clearRect(0, 0, canvas.width, canvas.height);
    if (mode === 1) {
      particles.forEach((particle) => {
        particle.orbit();
      });
    } else if (mode === 2) {
      particles.forEach((particle) => {
        particle.toInitial();
      });
      // } else if (mode === 3) {
      //   particles.forEach((particle) => {
      //     particle.newEffectFunction();
      //   });
      // } else if (mode === 4) {
      //   etc, might refactor to a switch if a lot of modes are made.
    } else {
      mode = 1;
    }
    requestAnimationFrame(animate);
  }
}

// click listener to switch between orbit mode and original mode
canvas.addEventListener('click', () => {
  mode++;
});

// function to create a base64 string, copy-pasted from stackoverflow
function toDataURL(url, callback) {
  let xhr = new XMLHttpRequest();
  xhr.onload = function () {
    let reader = new FileReader();
    reader.onloadend = function () {
      callback(reader.result);
    };
    reader.readAsDataURL(xhr.response);
  };
  xhr.open('GET', url);
  xhr.responseType = 'blob';
  xhr.send();
}

// below is a mouse object which stores the current x and y position of the mouse when it's over the canvas
// not yet used for anything, will be added later
let mouse = {
  x: undefined,
  y: undefined,
};

canvas.addEventListener('mousemove', (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});
