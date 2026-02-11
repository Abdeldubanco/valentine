let noClickCount = 0;
let yesScale = 1;
let volumeLevel = 0.5; // 🔊 Volume modifiable (0.0 à 1.0)

// Sons
const yesSound = new Audio("static/media/rizz.mp3");
const gotchaSound = new Audio("static/media/gotcha.mp3");
const disappearSound = new Audio("static/media/disappear.mp3")

const noSounds = [
    new Audio("static/media/bruh.mp3"),
    new Audio("static/media/noot.mp3"),
    new Audio("static/media/wrong.mp3")
];

// Appliquer le volume
yesSound.volume = volumeLevel;
gotchaSound.volume = volumeLevel;
noSounds.forEach(sound => sound.volume = volumeLevel);

// Périmètre de déplacement
const moveRangeX = 500;
const moveRangeY = 400;

function playRandomNoSound() {
    const randomIndex = Math.floor(Math.random() * noSounds.length);
    noSounds[randomIndex].currentTime = 0;
    noSounds[randomIndex].play();
}

function no() {
    const buttonNo = document.getElementById('no');
    const buttonYes = document.getElementById('yes');

    noClickCount++;

    // 🔊 Son aléatoire NO
    playRandomNoSound();

    // Agrandir YES
    yesScale *= 1.25;
    buttonYes.style.transform = `scale(${yesScale})`;

    if (noClickCount === 1) {
        buttonNo.textContent = "No ?";
    } 
    else if (noClickCount === 2) {
        buttonNo.textContent = "No ??";
    } 
    else if (noClickCount === 3) {
        buttonNo.textContent = "Are you sure ?";
    } 
    else if (noClickCount === 7) {

    // 🎵 Son disparition
    disappearSound.currentTime = 0;
    disappearSound.play();

    // Empêche nouveaux clics
    buttonNo.disabled = true;

    // Animation disparition
    buttonNo.style.transition = "all 0.6s ease";
    buttonNo.style.transform = "scale(0) rotate(720deg)";
    buttonNo.style.opacity = "0";
    buttonYes.textContent = "Yes 😏😏"

    // Supprime après animation
    setTimeout(() => {
        buttonNo.style.display = "none";
    }, 600);
}

    else {
        buttonNo.textContent = "No 😭😭?";

        const randomX = Math.floor(Math.random() * moveRangeX) - moveRangeX / 2;
        const randomY = Math.floor(Math.random() * moveRangeY) - moveRangeY / 2;

        buttonNo.style.position = "relative";
        buttonNo.style.left = randomX + "px";
        buttonNo.style.top = randomY + "px";
    }
}

function yes() {
    const buttonNo = document.getElementById('no');
    const buttonYes = document.getElementById('yes');
    const title = document.getElementById('title');
    const sub = document.getElementById('sub');

    // 🔊 Son YES
    yesSound.currentTime = 0;
    yesSound.play();

    // 🎉 Confettis
    startConfetti();

    // Petite animation avant disparition
    buttonYes.style.transition = "all 0.4s ease";
    buttonYes.style.transform = "scale(1.5)";
    buttonYes.style.opacity = "0";

    if (buttonNo) {
        buttonNo.style.transition = "all 0.4s ease";
        buttonNo.style.opacity = "0";
    }

    setTimeout(() => {
        if (buttonNo) buttonNo.style.display = "none";
        buttonYes.style.display = "none";
        sub.style.display = 'none';
        // Changer le titre
        title.textContent = "You're my valentine now !";

    }, 400);
}


/* =========================
   🎉 CONFETTIS PRO SYSTEM
========================= */

function startConfetti() {
    for (let i = 0; i < 250; i++) {
        createConfetti();
    }
}

function createConfetti() {
    const confetti = document.createElement("div");

    const size = Math.random() * 10 + 5;
    const colors = [
        "#ff4d6d", "#ff758f", "#ff8fa3",
        "#ffb3c1", "#cdb4db", "#ffc8dd",
        "#bde0fe", "#a2d2ff", "#ff0",
        "#f0f", "#0ff"
    ];

    confetti.style.position = "fixed";
    confetti.style.width = size + "px";
    confetti.style.height = size * 0.6 + "px";
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.top = "-20px";
    confetti.style.left = Math.random() * window.innerWidth + "px";
    confetti.style.opacity = Math.random() + 0.5;
    confetti.style.zIndex = "9999";
    confetti.style.borderRadius = Math.random() > 0.5 ? "50%" : "0px";
    confetti.style.pointerEvents = "none";

    document.body.appendChild(confetti);

    let posY = -20;
    let posX = parseFloat(confetti.style.left);
    let rotation = Math.random() * 360;
    let speedY = Math.random() * 3 + 2;
    let speedX = (Math.random() - 0.5) * 2;
    let rotateSpeed = (Math.random() - 0.5) * 10;

    function animate() {
        posY += speedY;
        posX += speedX;
        rotation += rotateSpeed;

        confetti.style.top = posY + "px";
        confetti.style.left = posX + "px";
        confetti.style.transform = `rotate(${rotation}deg)`;

        if (posY < window.innerHeight + 20) {
            requestAnimationFrame(animate);
        } else {
            confetti.remove();
        }
    }

    requestAnimationFrame(animate);
}

