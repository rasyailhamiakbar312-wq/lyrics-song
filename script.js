// =========================
// LYRICS
// =========================

const LYRICS = [
    "Got nothing to hide no more",
    "I don't know where to start",
    "But to show you the shape of my heart",
    "I'm lookin' back on things I've done",
    "I never wanna play the same old part",
    "I'll keep you in the dark",
    "Now let me show you the shape of my heart"
];


// =========================
// DELAYS
// =========================

const DELAYS = [
    0.3,
    4.0,
    9.0,
    19.0,
    25.5,
    31.5,
    35.0
];


// =========================
// POSITIONS
// =========================

const X_POSITIONS = [
    400,
    700,
    400,
    550,
    700,
    400,
    700
];


// =========================
// KARAOKE SPEED
// =========================

const KARAOKE_SPEEDS = [
    5,
    5,
    6,
    5,
    4,
    4,
    5
];


// =========================
// COLORS
// =========================

const BOX_COLORS = [
    "#FF0000",
    "#E60000",
    "#CC0000",
    "#FF1A1A",
    "#FF3333",
    "#B30000",
    "#FF4D4D"
];


const PARTICLE_COLORS = [
    "#FFB6C1",
    "#FFC0CB",
    "#DC143C",
    "#FFF0F5",
    "#FF69B4",
    "#FF1493",
    "#FF6B6B"
];


// =========================
// CONTAINER
// =========================

const lyricsContainer =
    document.getElementById("lyrics-container");

const particlesContainer =
    document.getElementById("particles");


// =========================
// CREATE HEART
// =========================

function createHeart(index) {

    const heart =
        document.createElement("div");

    heart.classList.add("heart");

    // Special size for fourth lyric
    if (
        LYRICS[index]
        === "I'm lookin' back on things I've done"
    ) {
        heart.classList.add("large");
    }

    heart.style.setProperty(
        "--heart-color",
        BOX_COLORS[index % BOX_COLORS.length]
    );


    // Position

    let x = X_POSITIONS[index];

    // Prevent heart from going too far
    // outside smaller screens

    if (window.innerWidth < 900) {

        x =
            Math.max(
                20,
                Math.min(
                    window.innerWidth - 320,
                    x
                )
            );
    }


    heart.style.left = `${x}px`;

    // Start below screen

    heart.style.top =
        `${window.innerHeight + 20}px`;


    // Animation duration

    const duration =
        Math.max(
            8,
            window.innerHeight / 120
        );

    heart.style.animationDuration =
        `${duration}s`;


    // Text

    const text =
        document.createElement("div");

    text.classList.add("heart-text");

    heart.appendChild(text);

    lyricsContainer.appendChild(heart);


    // Karaoke effect

    startKaraoke(
        text,
        LYRICS[index],
        KARAOKE_SPEEDS[index]
    );


    // Remove after animation

    setTimeout(() => {

        heart.remove();

    }, duration * 1000 + 500);
}


// =========================
// KARAOKE
// =========================

function startKaraoke(
    element,
    text,
    speed
) {

    let index = 0;

    const interval =
        setInterval(() => {

            if (index >= text.length) {

                clearInterval(interval);

                return;
            }

            element.textContent =
                text.substring(0, index + 1);

            index++;

        }, speed * 10);
}


// =========================
// CREATE PARTICLE
// =========================

function createParticle() {

    const particle =
        document.createElement("div");

    particle.classList.add("particle");

    particle.textContent = "♥";


    // Random position

    const x =
        Math.random() * 100;

    const size =
        10 + Math.random() * 20;

    const duration =
        5 + Math.random() * 7;

    const drift =
        -100 + Math.random() * 200;


    particle.style.setProperty(
        "--x",
        `${x}%`
    );

    particle.style.setProperty(
        "--size",
        `${size}px`
    );

    particle.style.setProperty(
        "--duration",
        `${duration}s`
    );

    particle.style.setProperty(
        "--drift",
        `${drift}px`
    );

    particle.style.setProperty(
        "--particle-color",
        PARTICLE_COLORS[
            Math.floor(
                Math.random() *
                PARTICLE_COLORS.length
            )
        ]
    );


    particlesContainer.appendChild(
        particle
    );


    setTimeout(() => {

        particle.remove();

    }, duration * 1000);
}


// =========================
// START LYRICS
// =========================

function startLyrics() {

    LYRICS.forEach(
        (_, index) => {

            setTimeout(() => {

                createHeart(index);

            }, DELAYS[index] * 1000);

        }
    );
}


// =========================
// PARTICLE LOOP
// =========================

setInterval(() => {

    if (
        document.querySelectorAll(
            ".particle"
        ).length < 60
    ) {

        if (Math.random() < 0.5) {

            createParticle();

        }

    }

}, 100);


// =========================
// START
// =========================

window.addEventListener(
    "load",
    () => {

        startLyrics();

    }
);
