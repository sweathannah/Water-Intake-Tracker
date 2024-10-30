let goal = 0;
let currentIntake = 0;

// Load saved values from localStorage on page load
window.onload = () => {
    goal = parseInt(localStorage.getItem('goal')) || 0;
    currentIntake = parseInt(localStorage.getItem('currentIntake')) || 0;
    document.getElementById('goal').value = goal || '';
    updateWaterLevel();
};

// Event listener to set the goal and save it in localStorage
document.getElementById('goal').addEventListener('change', (e) => {
    goal = parseInt(e.target.value) || 0;
    currentIntake = 0;
    localStorage.setItem('goal', goal);  // Save goal to localStorage
    localStorage.setItem('currentIntake', currentIntake);  // Reset intake in localStorage
    updateWaterLevel();
});

// Function to add water and update localStorage
function addWater() {
    if (goal > 0 && currentIntake < goal) {
        currentIntake++;
        localStorage.setItem('currentIntake', currentIntake);  // Save current intake to localStorage
        updateWaterLevel();
    }
}

function updateWaterLevel() {
    const percentage = (currentIntake / goal) * 100;
    const waterLevelElement = document.getElementById('water-level');
    const waterPercentageElement = document.getElementById('water-percentage');

    // Update text percentage
    waterPercentageElement.textContent = `${Math.min(percentage, 100).toFixed(0)}% Complete`;

    // Animate water level height
    gsap.to(waterLevelElement, { height: `${Math.min(percentage, 100)}%`, duration: 1, ease: "power2.out" });

    // Check if the goal is reached
    if (percentage >= 100) {
        triggerCelebration();
    }
}

function triggerCelebration() {
    playCelebrationSound();
    createRainEffect();
}

// Play celebration sound
function playCelebrationSound() {
    const celebrationSound = document.getElementById("celebration-sound");
    celebrationSound.play();
}

// Rainfall Effect
function createRainEffect() {
    const rainContainer = document.getElementById("rain-container");

    // Clear previous raindrops, if any
    rainContainer.innerHTML = '';

    // Create multiple raindrops
    for (let i = 0; i < 150; i++) { // Increase the number to prolong effect
        const raindrop = document.createElement("div");
        raindrop.classList.add("raindrop");
        rainContainer.appendChild(raindrop);

        // Randomize position and animate each raindrop
        gsap.set(raindrop, { x: Math.random() * window.innerWidth, y: -20 });
        gsap.to(raindrop, {
            y: window.innerHeight + 20,
            duration: Math.random() * 2.5 + 2, // Increase base duration to 2-4 seconds
            delay: Math.random(), // Random start delay
            ease: "power2.in",
            onComplete: () => raindrop.remove(), // Remove raindrop after animation
        });
    }
}

