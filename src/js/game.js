const CANVAS = document.querySelector('canvas'); // Returns the first Element that matches the specific selector, in this case our canvas element in index.html
const CONTEXT = CANVAS.getContext('2d'); //Returns a drawing context on the canvas. We're basically using 2d methods to draw

CANVAS.fillStyle = 'white'