"use strict";

const internals = {};

// Adapted from https://codepen.io/deanwagman/pen/EjLBdQ

export const init = () => {
    // Little Canvas things
    internals.canvas = document.querySelector("#canvassss");
    if (!internals.canvas) {
        console.warn("#canvas not found in DOM");
        return;
    }

    internals.ctx = internals.canvas.getContext("2d");
    console.log("internals.ctx", internals.ctx);

    // Set Canvas to be window size
    internals.canvas.width = window.innerWidth;
    internals.canvas.height = window.innerHeight;

    internals.tacoImg = document.createElement("img");
    internals.tacoImg.src = "/System1/Assets/taco.png";

    // Some Variables hanging out
    internals.particles = [];

    internals.centerX = internals.canvas.width / 2;
    internals.centerY = internals.canvas.height / 2;

    // First Frame
    internals.frame();

    // First particle explosion
    internals.initParticles(config.particleNumber);

    window.addEventListener("resize", () => {
        // Set Canvas to be window size
        internals.canvas.width = window.innerWidth;
        internals.canvas.height = window.innerHeight;
    });
};

// Draws the background for the canvas, because space
internals.drawBg = (ctx, color) => {
    ctx.fillStyle = "rgb(" + color.r + "," + color.g + "," + color.b + ")";
    ctx.fillRect(0, 0, internals.canvas.width, internals.canvas.height);
};

// Configuration, Play with these
const config = {
    particleNumber: 38,
    maxParticleSize: 20,
    maxSpeed: 40,
    colorVariation: 50,
};

// Colors
const colorPalette = {
    bg: { r: 0, g: 0, b: 0, a: 0 },
    matter: [
        { r: 36, g: 18, b: 42 }, // darkPRPL
        { r: 78, g: 36, b: 42 }, // rockDust
        { r: 252, g: 178, b: 96 }, // solorFlare
        { r: 253, g: 238, b: 152 }, // totesASun
    ],
};

// Particle Constructor
const Particle = function (x, y) {
    // X Coordinate
    this.x = x || Math.round(Math.random() * internals.canvas.width);
    // Y Coordinate
    this.y = y || Math.round(Math.random() * internals.canvas.height);
    // Radius of the space dust
    this.r = Math.ceil(Math.random() * config.maxParticleSize);
    // Color of the rock, given some randomness
    this.c = colorVariation(
        colorPalette.matter[
            Math.floor(Math.random() * colorPalette.matter.length)
        ],
        true
    );
    // Speed of which the rock travels
    this.s = Math.pow(Math.ceil(Math.random() * config.maxSpeed), 0.7);
    // Direction the Rock flies
    this.d = Math.round(Math.random() * 360);
};

// Provides some nice color variation
// Accepts an rgba object
// returns a modified rgba object or a rgba string if true is passed in for argument 2
const colorVariation = function (color, returnString) {
    var r, g, b, a, variation;
    r = Math.round(
        Math.random() * config.colorVariation -
            config.colorVariation / 2 +
            color.r
    );
    g = Math.round(
        Math.random() * config.colorVariation -
            config.colorVariation / 2 +
            color.g
    );
    b = Math.round(
        Math.random() * config.colorVariation -
            config.colorVariation / 2 +
            color.b
    );
    a = Math.random() + 0.5;
    if (returnString) {
        return "rgba(" + r + "," + g + "," + b + "," + a + ")";
    } else {
        return { r, g, b, a };
    }
};

// Used to find the rocks next point in space, accounting for speed and direction
internals.updateParticleModel = function (p) {
    var a = 180 - (p.d + 90); // find the 3rd angle
    p.d > 0 && p.d < 180
        ? (p.x += (p.s * Math.sin(p.d)) / Math.sin(p.s))
        : (p.x -= (p.s * Math.sin(p.d)) / Math.sin(p.s));
    p.d > 90 && p.d < 270
        ? (p.y += (p.s * Math.sin(a)) / Math.sin(p.s))
        : (p.y -= (p.s * Math.sin(a)) / Math.sin(p.s));
    return p;
};

// Just the function that physically draws the particles
// Physically? sure why not, physically.
internals.drawParticle = function (x, y, r, c) {
    const size = r * 2;

    // ctx.globalCompositeOperation = 'copy'; // copy pixel-to-pixel source image
    internals.ctx.globalCompositeOperation = "source-over";
    internals.ctx.drawImage(internals.tacoImg, x, y, size, size);
    // ctx.globalCompositeOperation = 'source-over';
    // ctx.globalCompositeOperation = 'multiply'; // multiply it by color
    // ctx.fillStyle = c;
    // ctx.fillStyle = '#ff0000';
    // ctx.fillRect(x, y, size, size);
    // ctx.globalCompositeOperation = 'destination-atop'; // restore transparency
    // ctx.drawImage(internals.tacoImg, x, y, size, size);
    // ctx.globalCompositeOperation = 'source-over';
};

// Remove particles that aren't on the canvas
const cleanUpArray = function () {
    internals.particles = internals.particles.filter((p) => {
        return p.x > -100 && p.y > -100;
    });
};

internals.initParticles = function (numParticles, x, y) {
    for (let i = 0; i < numParticles; i++) {
        internals.particles.push(new Particle(x, y));
    }

    internals.particles.forEach((p) => {
        internals.drawParticle(p.x, p.y, p.r, p.c);
    });
};

// That thing
window.requestAnimFrame = (() => {
    return (
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        }
    );
})();

// Our Frame function
internals.frame = () => {
    // Draw background first
    internals.drawBg(internals.ctx, colorPalette.bg);
    // Update Particle models to new position
    internals.particles.map((p) => {
        return internals.updateParticleModel(p);
    });
    // Draw em'
    internals.particles.forEach((p) => {
        internals.drawParticle(p.x, p.y, p.r, p.c);
    });
    // Play the same song? Ok!
    window.requestAnimFrame(internals.frame);
};

export const genParticles = (x, y) => {
    if (!internals._initialized) {
        init();
        internals._initialized = true;
    }

    cleanUpArray();
    internals.initParticles(config.particleNumber, x, y);
};
