// const p = document.querySelectorAll('p');
// const myClass = document.querySelectorAll('.my-class');
// const onlyP = document.querySelector('#only-p');
// const button = document.querySelector('#button');

// button.addEventListener('click', (event) => {
//   console.log(event.clientX, event.clientY);
// });

function setup() {
  createCanvas(400, 400);
};

function draw() {
  background(220);
};

function mousePressed() {
  console.log(mouseX, mouseY);
}
