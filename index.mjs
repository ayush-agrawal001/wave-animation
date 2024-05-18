// Import the dat.GUI library for creating a graphical user interface
import * as dat from 'dat.gui';

// Create a new GUI instance
const gui = new dat.GUI();

// Select the canvas element from the HTML document
var canvas = document.querySelector("canvas");

// Set the canvas dimensions to the inner width and height of the window
canvas.width = innerWidth;
canvas.height = innerHeight;

// Get the 2D rendering context for the canvas
var c = canvas.getContext("2d");

// Define the wave properties
const wave = {
    y : canvas.height / 2,     // Y position of the wave
    length : 0.01,             // Length of the wave
    amplitude : 100,           // Amplitude of the wave
    frequency : 0.01           // Frequency of the wave
}

// Define the stroke color properties
const strokeColor = {
    h: 200,     // Hue of the stroke color
    s: 50,      // Saturation of the stroke color
    l: 50       // Lightness of the stroke color
}

// Define the background color properties
const backgroundColor = {
    r : 0,      // Red component of the background color
    g : 0,      // Green component of the background color
    b : 0,      // Blue component of the background color
    a : 0.01,   // Alpha (opacity) of the background color
}

// Create a folder in the GUI for the wave properties and add controllers
const waveFolder = gui.addFolder("wave");
waveFolder.add(wave, 'y', 0, canvas.height);                // Control for the wave's y position
waveFolder.add(wave, 'length', -0.01, 0.01);                // Control for the wave's length
waveFolder.add(wave, 'amplitude', -300, 300);               // Control for the wave's amplitude
waveFolder.add(wave, 'frequency', -0.01, 2);                // Control for the wave's frequency
waveFolder.open();                                          // Open the folder by default

// Create a folder in the GUI for the stroke color properties and add controllers
const strokeFolder = gui.addFolder("strokeColor");
strokeFolder.add(strokeColor, "h", 0, 255);                 // Control for the stroke color hue
strokeFolder.add(strokeColor, "s", 0, 100);                 // Control for the stroke color saturation
strokeFolder.add(strokeColor, "l", 0, 100);                 // Control for the stroke color lightness
strokeFolder.open();                                        // Open the folder by default

// Create a folder in the GUI for the background color properties and add controllers
const backgroundFolder = gui.addFolder("backgroundColor");
backgroundFolder.add(backgroundColor, "r", 0, 255);         // Control for the background color red component
backgroundFolder.add(backgroundColor, "g", 0, 255);         // Control for the background color green component
backgroundFolder.add(backgroundColor, "b", 0, 255);         // Control for the background color blue component
backgroundFolder.add(backgroundColor, "a", 0, 1);           // Control for the background color alpha (opacity)
backgroundFolder.open();                                    // Open the folder by default

// Variable to keep track of the wave's frequency increment
let increase = wave.frequency;

// Animation function to draw the wave
function animate() {
    // Request the next frame for smooth animation
    requestAnimationFrame(animate);
    
    // Set the fill style to the background color and fill the canvas
    c.fillStyle = `rgba(${backgroundColor.r},${backgroundColor.g},${backgroundColor.b},${backgroundColor.a})`;
    c.fillRect(0, 0, canvas.width, canvas.height);

    // Begin a new path for the wave
    c.beginPath();
    
    // Move the drawing cursor to the start of the wave
    c.moveTo(0, canvas.height / 2);
    
    // Loop through the width of the canvas to draw the wave
    for (let i = 0; i < canvas.width; i++) {
        // Draw a line to the next point of the wave using a sine function
        c.lineTo(i, wave.y + Math.sin(i * wave.length + increase) * wave.amplitude * Math.tan(increase));
    }
    
    // Set the stroke style to an HSL color based on the wave properties
    c.strokeStyle = `hsl(${Math.abs(strokeColor.h * Math.sin(increase))}, ${strokeColor.s}%, ${strokeColor.l}%)`;
    
    // Stroke the wave path
    c.stroke();
    
    // Increment the wave's frequency for the next frame
    increase += wave.frequency;
}

// Start the animation
animate();
