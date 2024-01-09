const CANVAS = document.querySelector('canvas'); // Returns the first Element that matches the specific selector, in this case our canvas element in index.html
const CONTEXT = CANVAS.getContext('2d'); //Returns a drawing context on the canvas

CANVAS.width = 1024; // 16:9 ratio to fit most screen sizes
CANVAS.height = 576;