// Birthday Cake Cutting Animation
function initCakeCutting() {
    const cutCakeBtn = document.getElementById('cutCakeBtn');
    const cricketBat = document.getElementById('cricketBat');
    const cake = document.getElementById('cake');
    
    if (!cutCakeBtn || !cricketBat || !cake) return;
    
    cutCakeBtn.addEventListener('click', function() {
        if (this.classList.contains('clicked')) return;
        
        this.classList.add('clicked');
        this.textContent = 'Cutting... 🎉';
        
        // Swing the bat
        cricketBat.classList.add('swing');
        
        // Cut the cake after bat reaches it
        setTimeout(() => {
            cake.classList.add('cut');
            createFireworks();
            createMassiveConfetti();
        }, 600);
        
        // Reset button after animation
        setTimeout(() => {
            this.textContent = 'Cut Again! 🎂';
            this.classList.remove('clicked');
            cricketBat.classList.remove('swing');
            cake.classList.remove('cut');
        }, 5000);
    });
}

// Massive Fireworks Display
function createFireworks() {
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ffd700', '#ff69b4'];
    const fireworkCount = 15;
    
    for (let i = 0; i < fireworkCount; i++) {
        setTimeout(() => {
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight * 0.6;
            launchFirework(x, y, colors[Math.floor(Math.random() * colors.length)]);
        }, i * 200);
    }
}

function launchFirework(x, y, color) {
    const particleCount = 40;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'firework';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.background = color;
        
        const angle = (Math.PI * 2 * i) / particleCount;
        const velocity = 100 + Math.random() * 100;
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity;
        
        particle.style.animation = `fireworkExplosion 1s ease-out forwards`;
        particle.style.setProperty('--tx', tx + 'px');
        particle.style.setProperty('--ty', ty + 'px');
        
        document.body.appendChild(particle);
        
        setTimeout(() => particle.remove(), 1000);
    }
}

const fireworkStyle = document.createElement('style');
fireworkStyle.textContent = `
    @keyframes fireworkExplosion {
        0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
        }
        100% {
            transform: translate(var(--tx), var(--ty)) scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(fireworkStyle);

// Massive Confetti Burst
function createMassiveConfetti() {
    const colors = ['#ffd700', '#ff69b4', '#00ff00', '#00ffff', '#ff1493', '#ffa500', '#ff0000', '#00ff00'];
    const confettiCount = 200;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            left: ${Math.random() * 100}vw;
            top: -20px;
            width: ${Math.random() * 15 + 8}px;
            height: ${Math.random() * 15 + 8}px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            opacity: ${Math.random() * 0.8 + 0.2};
            transform: rotate(${Math.random() * 360}deg);
            animation: confettiFallMassive ${Math.random() * 3 + 2}s linear forwards;
            pointer-events: none;
            z-index: 10001;
            border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
        `;
        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), 5000);
    }
}

const massiveConfettiStyle = document.createElement('style');
massiveConfettiStyle.textContent = `
    @keyframes confettiFallMassive {
        to {
            top: 110vh;
            transform: rotate(${Math.random() * 1440}deg) translateX(${Math.random() * 200 - 100}px);
        }
    }
`;
document.head.appendChild(massiveConfettiStyle);

// Counter Animation for Scoreboard
function animateCounters() {
    const counters = document.querySelectorAll('.score-value[data-target]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000;
                const increment = target / (duration / 16);
                let current = 0;
                
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCounter();
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
}

// Catch My Heart Game
let gameScore = 0;
let gameActive = false;
let heartInterval;
let centuryShown = false;

function initGame() {
    const gameArea = document.getElementById('gameArea');
    const scoreDisplay = document.getElementById('gameScore');
    const centuryMessage = document.getElementById('centuryMessage');
    
    gameArea.addEventListener('click', startGame);
    
    function startGame() {
        if (!gameActive) {
            gameActive = true;
            gameScore = 0;
            centuryShown = false;
            scoreDisplay.textContent = gameScore;
            createCricketBall();
            heartInterval = setInterval(createCricketBall, 1200);
        }
    }
    
    function createCricketBall() {
        const gameArea = document.getElementById('gameArea');
        const ball = document.createElement('div');
        ball.className = 'falling-heart';
        ball.style.left = Math.random() * (gameArea.offsetWidth - 50) + 'px';
        ball.style.top = '-50px';
        
        const duration = 2500 + Math.random() * 1500;
        ball.style.animationDuration = duration + 'ms';
        
        let clicked = false; // Prevent multiple clicks on same ball
        
        const handleClick = (e) => {
            if (clicked) return; // Already clicked this ball
            clicked = true;
            
            e.preventDefault();
            e.stopPropagation();
            
            gameScore += 6; // Hit a six!
            scoreDisplay.textContent = gameScore;
            
            // Check for century
            if (gameScore >= 100 && !centuryShown) {
                centuryShown = true;
                centuryMessage.classList.add('show');
                createMassiveConfetti();
                createFireworks();
                setTimeout(() => {
                    centuryMessage.classList.remove('show');
                }, 3000);
            }
            
            // Bat swing animation
            const bat = document.querySelector('.batting-bat');
            if (bat) {
                bat.style.animation = 'none';
                setTimeout(() => {
                    bat.style.animation = 'batSwingHit 0.3s ease-out';
                }, 10);
                setTimeout(() => {
                    bat.style.animation = 'batReady 2s infinite ease-in-out';
                }, 300);
            }
            
            // Create explosion effect
            const explosion = document.createElement('div');
            explosion.textContent = '+6 Runs! 🎯';
            explosion.style.position = 'absolute';
            explosion.style.left = ball.style.left;
            explosion.style.top = ball.offsetTop + 'px';
            explosion.style.color = '#ffd700';
            explosion.style.fontWeight = 'bold';
            explosion.style.fontSize = '1.5rem';
            explosion.style.pointerEvents = 'none';
            explosion.style.animation = 'scorePopup 1s forwards';
            gameArea.appendChild(explosion);
            
            setTimeout(() => explosion.remove(), 1000);
            ball.remove();
        };
        
        ball.addEventListener('click', handleClick, { once: true });
        ball.addEventListener('touchstart', handleClick, { once: true, passive: false });
        
        gameArea.appendChild(ball);
        
        setTimeout(() => {
            if (ball.parentNode) {
                ball.remove();
            }
        }, duration);
    }
}

// Add bat swing animation style
const batSwingStyle = document.createElement('style');
batSwingStyle.textContent = `
    @keyframes batSwingHit {
        0% { transform: translateX(-50%) rotate(45deg); }
        50% { transform: translateX(-50%) rotate(-30deg) scale(1.2); }
        100% { transform: translateX(-50%) rotate(45deg); }
    }
`;
document.head.appendChild(batSwingStyle);

// Add score popup animation
const style = document.createElement('style');
style.textContent = `
    @keyframes scorePopup {
        0% {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
        100% {
            opacity: 0;
            transform: translateY(-50px) scale(1.5);
        }
    }
`;
document.head.appendChild(style);

// Parallax Effect on Scroll
function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.cricket-balls-bg .ball');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            element.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
        });
    });
}

// Smooth Scroll for Sections
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Add sparkle effect on cursor
function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: 10px;
        height: 10px;
        background: radial-gradient(circle, #ffd700, transparent);
        border-radius: 50%;
        pointer-events: none;
        animation: sparkleAnim 1s forwards;
        z-index: 9999;
    `;
    document.body.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 1000);
}

const sparkleStyle = document.createElement('style');
sparkleStyle.textContent = `
    @keyframes sparkleAnim {
        0% {
            opacity: 1;
            transform: scale(0) rotate(0deg);
        }
        100% {
            opacity: 0;
            transform: scale(3) rotate(180deg);
        }
    }
`;
document.head.appendChild(sparkleStyle);

let sparkleTimeout;
document.addEventListener('mousemove', (e) => {
    clearTimeout(sparkleTimeout);
    sparkleTimeout = setTimeout(() => {
        if (Math.random() > 0.8) {
            createSparkle(e.clientX, e.clientY);
        }
    }, 50);
});

// Intersection Observer for Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    const animatedElements = document.querySelectorAll('.wicket-card, .score-item, .message-card');
    animatedElements.forEach(el => observer.observe(el));
}

// Polaroid Photo Lightbox Effect
function initPhotoGallery() {
    const photos = document.querySelectorAll('.polaroid-frame img');
    
    photos.forEach((photo, index) => {
        photo.addEventListener('click', () => {
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.innerHTML = `
                <div class="lightbox-content">
                    <span class="lightbox-close">&times;</span>
                    <img src="${photo.src}" alt="${photo.alt}">
                    <div class="lightbox-caption">Cricket Memory ${index + 1} 🏏</div>
                </div>
            `;
            document.body.appendChild(lightbox);
            
            setTimeout(() => lightbox.classList.add('active'), 10);
            
            lightbox.addEventListener('click', (e) => {
                if (e.target === lightbox || e.target.className === 'lightbox-close') {
                    lightbox.classList.remove('active');
                    setTimeout(() => lightbox.remove(), 300);
                }
            });
        });
    });
}

// Add lightbox styles
const lightboxStyle = document.createElement('style');
lightboxStyle.textContent = `
    .lightbox {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10001;
        opacity: 0;
        transition: all 0.3s ease;
        backdrop-filter: blur(0px);
    }
    
    .lightbox.active {
        opacity: 1;
        background: rgba(0, 0, 0, 0.95);
        backdrop-filter: blur(10px);
    }
    
    .lightbox-content {
        position: relative;
        max-width: 90%;
        max-height: 90%;
        transform: scale(0.8);
        transition: transform 0.3s ease;
    }
    
    .lightbox.active .lightbox-content {
        transform: scale(1);
    }
    
    .lightbox-content img {
        max-width: 100%;
        max-height: 85vh;
        border-radius: 15px;
        box-shadow: 0 0 50px rgba(255, 215, 0, 0.5);
        border: 3px solid #ffd700;
    }
    
    .lightbox-close {
        position: absolute;
        top: -40px;
        right: 0;
        font-size: 3rem;
        color: #ffd700;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .lightbox-close:hover {
        color: #fff;
        transform: rotate(90deg);
    }
    
    .lightbox-caption {
        text-align: center;
        color: #ffd700;
        font-size: 1.5rem;
        margin-top: 20px;
        font-weight: bold;
        text-shadow: 0 0 20px rgba(255, 215, 0, 0.5);
    }
`;
document.head.appendChild(lightboxStyle);

// Add cricket ball cursor trail
let cursorTrail = [];
const maxTrailLength = 10;

function createCursorTrail(x, y) {
    const trail = document.createElement('div');
    trail.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: 8px;
        height: 8px;
        background: radial-gradient(circle, rgba(255, 215, 0, 0.8), transparent);
        border-radius: 50%;
        pointer-events: none;
        animation: trailFade 0.5s forwards;
        z-index: 9998;
    `;
    document.body.appendChild(trail);
    cursorTrail.push(trail);
    
    if (cursorTrail.length > maxTrailLength) {
        const oldTrail = cursorTrail.shift();
        oldTrail.remove();
    }
}

const trailStyle = document.createElement('style');
trailStyle.textContent = `
    @keyframes trailFade {
        to {
            opacity: 0;
            transform: scale(0);
        }
    }
`;
document.head.appendChild(trailStyle);

let trailInterval;
document.addEventListener('mousemove', (e) => {
    clearInterval(trailInterval);
    trailInterval = setInterval(() => {
        createCursorTrail(e.clientX, e.clientY);
    }, 50);
});

// Add confetti effect on specific sections
function createConfetti() {
    const colors = ['#ffd700', '#ff69b4', '#00ff00', '#00ffff', '#ff1493'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            left: ${Math.random() * 100}vw;
            top: -10px;
            width: ${Math.random() * 10 + 5}px;
            height: ${Math.random() * 10 + 5}px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            opacity: ${Math.random()};
            transform: rotate(${Math.random() * 360}deg);
            animation: confettiFall ${Math.random() * 3 + 2}s linear forwards;
            pointer-events: none;
            z-index: 10000;
        `;
        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), 5000);
    }
}

const confettiStyle = document.createElement('style');
confettiStyle.textContent = `
    @keyframes confettiFall {
        to {
            top: 100vh;
            transform: rotate(${Math.random() * 720}deg);
        }
    }
`;
document.head.appendChild(confettiStyle);

// Birthday Confetti Burst
function createBirthdayConfetti() {
    const confettiBurst = document.querySelector('.confetti-burst');
    if (!confettiBurst) return;
    
    const colors = ['#ffd700', '#ff69b4', '#00ff00', '#00ffff', '#ff1493', '#ffa500'];
    const confettiCount = 100;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        const startX = 50 + (Math.random() - 0.5) * 20;
        const endX = startX + (Math.random() - 0.5) * 100;
        const endY = 100 + Math.random() * 50;
        const rotation = Math.random() * 720;
        const delay = Math.random() * 0.5;
        
        confetti.style.cssText = `
            position: absolute;
            left: ${startX}%;
            top: 50%;
            width: ${Math.random() * 10 + 5}px;
            height: ${Math.random() * 10 + 5}px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            opacity: ${Math.random() * 0.8 + 0.2};
            animation: confettiBurst ${Math.random() * 2 + 2}s ease-out ${delay}s forwards;
            animation-iteration-count: infinite;
            transform-origin: center;
        `;
        confettiBurst.appendChild(confetti);
    }
}

const birthdayConfettiStyle = document.createElement('style');
birthdayConfettiStyle.textContent = `
    @keyframes confettiBurst {
        0% {
            transform: translate(0, 0) rotate(0deg) scale(1);
            opacity: 1;
        }
        100% {
            transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 300 + 200}px) rotate(${Math.random() * 720}deg) scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(birthdayConfettiStyle);

// Trigger confetti on page load
window.addEventListener('load', () => {
    setTimeout(createConfetti, 500);
    createBirthdayConfetti();
});

// Add floating hearts randomly
function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.textContent = '💕';
    heart.style.cssText = `
        position: fixed;
        left: ${Math.random() * 100}vw;
        bottom: -50px;
        font-size: ${Math.random() * 20 + 20}px;
        opacity: 0.6;
        pointer-events: none;
        animation: floatUp ${Math.random() * 5 + 5}s linear forwards;
        z-index: 9999;
    `;
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 10000);
}

const floatStyle = document.createElement('style');
floatStyle.textContent = `
    @keyframes floatUp {
        to {
            bottom: 110vh;
            transform: translateX(${Math.random() * 200 - 100}px) rotate(${Math.random() * 360}deg);
        }
    }
`;
document.head.appendChild(floatStyle);

// Create floating hearts periodically
setInterval(createFloatingHeart, 3000);

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    animateCounters();
    initGame();
    initParallax();
    initSmoothScroll();
    initScrollAnimations();
    initPhotoGallery();
    initCakeCutting();
    
    console.log('🏏 Cricket Friendship Website Loaded! ⭐');
});

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join('') === konamiSequence.join('')) {
        createConfetti();
        alert('🏆 You found the secret! You\'re as amazing as a perfect hat-trick! 💕');
        konamiCode = [];
    }
});
