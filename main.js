// ═══════════════════════════════════════════════════
// 1. VANTA.JS — DREAMY PURPLE-ROSE FOG BACKGROUND
// ═══════════════════════════════════════════════════
VANTA.FOG({
    el: "#vanta-canvas",
    mouseControls: true,
    touchControls: true,
    gyroControls: true,
    minHeight: 200.00,
    minWidth: 200.00,
    highlightColor: 0xe8607c,   // rose
    midtoneColor: 0x2d1b4e,     // deep purple
    lowlightColor: 0x9b59b6,    // purple
    baseColor: 0x0f0a1a,        // dark purple-black
    blurFactor: 0.40,
    zoom: 0.90,
    speed: 2.00
});

// ═══════════════════════════════════════════════════
// 2. PARTICLES — SOFT FLOATING ORBS (fewer on mobile)
// ═══════════════════════════════════════════════════
const isMobile = window.innerWidth <= 600;
particlesJS("particles-js", {
    particles: {
        number: { value: isMobile ? 15 : 35 },
        color: { value: ["#e8607c", "#9b59b6", "#f0c27f", "#c39bd3", "#f7a8b8"] },
        shape: { type: "circle" },
        opacity: { value: 0.25, random: true, anim: { enable: true, speed: 0.4 } },
        size: { value: isMobile ? 3 : 4, random: true },
        move: { enable: true, speed: isMobile ? 0.3 : 0.5, direction: "none", random: true, out_mode: "out" },
        line_linked: { enable: false }
    }
});

// ═══════════════════════════════════════════════════
// 3. FLOATING HEARTS ON TAP
// ═══════════════════════════════════════════════════
const heartColors = ['#e8607c', '#f7a8b8', '#f0c27f', '#c39bd3', '#9b59b6'];
const heartIcons = ['fa-heart', 'fa-star', 'fa-sparkles'];

document.getElementById('main-body').addEventListener('click', (e) => {
    if (e.target.closest('nav') || e.target.closest('button') || e.target.closest('textarea') || e.target.closest('.track') || e.target.closest('form')) return;
    
    const count = isMobile ? 2 : 4;
    for (let i = 0; i < count; i++) {
        const heart = document.createElement('i');
        heart.className = 'fas ' + heartIcons[Math.floor(Math.random() * heartIcons.length)] + ' floating-heart';
        heart.style.left = (e.clientX - 10 + (Math.random() * 40 - 20)) + 'px';
        heart.style.top = (e.clientY - 10 + (Math.random() * 30 - 15)) + 'px';
        heart.style.fontSize = (0.7 + Math.random() * 1.2) + 'rem';
        heart.style.color = heartColors[Math.floor(Math.random() * heartColors.length)];
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 2500);
    }
});

// ═══════════════════════════════════════════════════
// 4. SPARKLE CURSOR TRAIL (desktop only — saves perf on phones)
// ═══════════════════════════════════════════════════
if (!isMobile) {
    let lastSparkle = 0;
    document.addEventListener('mousemove', (e) => {
        if (Date.now() - lastSparkle < 40) return;
        lastSparkle = Date.now();
        const s = document.createElement('div');
        s.className = 'sparkle';
        s.style.left = (e.clientX + (Math.random() * 10 - 5)) + 'px';
        s.style.top = (e.clientY + (Math.random() * 10 - 5)) + 'px';
        document.body.appendChild(s);
        setTimeout(() => s.remove(), 1000);
    });
}

// ═══════════════════════════════════════════════════
// 5. SHOOTING STARS
// ═══════════════════════════════════════════════════
function createShootingStar() {
    const star = document.createElement('div');
    star.className = 'shooting-star';
    star.style.left = Math.random() * window.innerWidth * 0.7 + 'px';
    star.style.top = Math.random() * (window.innerHeight * 0.4) + 'px';
    document.body.appendChild(star);
    setTimeout(() => star.remove(), 2000);
}
setInterval(createShootingStar, isMobile ? 8000 : 5000);
if (!isMobile) setTimeout(createShootingStar, 1500);

// ═══════════════════════════════════════════════════
// 6. CLOCKS — PAKISTAN & PHILIPPINES
// ═══════════════════════════════════════════════════
function updateClocks() {
    const now = new Date();
    document.getElementById('my-time').innerText = now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Karachi', hour: '2-digit', minute: '2-digit', second: '2-digit'
    });
    document.getElementById('her-time').innerText = now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Manila', hour: '2-digit', minute: '2-digit', second: '2-digit'
    });
}
setInterval(updateClocks, 1000);
updateClocks();

// ═══════════════════════════════════════════════════
// 7. COUNTDOWN — SINCE 1 HOUR AGO
// ═══════════════════════════════════════════════════
const COUNTER_START = new Date(Date.now() - 60 * 60 * 1000); // 1 hour ago
function updateCounter() {
    const start = COUNTER_START;
    const now = new Date();
    const diff = now - start;
    
    if (diff < 0) return;
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);
    
    animateNumber('cnt-days', days);
    animateNumber('cnt-hours', hours);
    animateNumber('cnt-mins', mins);
    animateNumber('cnt-secs', secs);
}

function animateNumber(id, target) {
    const el = document.getElementById(id);
    if (!el) return;
    const str = String(target);
    if (el.innerText !== str) {
        el.style.transform = 'translateY(-5px)';
        el.style.opacity = '0.4';
        setTimeout(() => {
            el.innerText = str;
            el.style.transform = 'translateY(0)';
            el.style.opacity = '1';
        }, 150);
    }
}
setInterval(updateCounter, 1000);
updateCounter();

// ═══════════════════════════════════════════════════
// 8. NAVIGATION — SLIDE TRANSITIONS + SWIPE BETWEEN PAGES
// ═══════════════════════════════════════════════════
const pageOrder = [
    'page-home', 'page-gallery', 'page-clocks', 'page-counter',
    'page-playlist', 'page-message', 'page-vault', 'page-promises',
    'page-type', 'page-dates', 'page-question', 'page-contact'
];
let currentPageIdx = 0;
let isNavigating = false;

// Build page indicator pips
(function buildPageIndicator() {
    const indicator = document.getElementById('page-indicator');
    if (!indicator) return;
    pageOrder.forEach((_, i) => {
        const pip = document.createElement('div');
        pip.className = 'pip' + (i === 0 ? ' active' : '');
        indicator.appendChild(pip);
    });
})();

function updatePageIndicator(idx) {
    const pips = document.querySelectorAll('.page-indicator .pip');
    pips.forEach((p, i) => p.classList.toggle('active', i === idx));
}

function navigate(id, direction) {
    if (isNavigating) return;
    const newIdx = pageOrder.indexOf(id);
    if (newIdx === -1 || newIdx === currentPageIdx) return;
    
    isNavigating = true;
    const oldPage = document.getElementById(pageOrder[currentPageIdx]);
    const newPage = document.getElementById(id);
    if (!oldPage || !newPage) { isNavigating = false; return; }
    
    // Determine slide direction
    const goingRight = direction === 'right' || (!direction && newIdx > currentPageIdx);
    
    // Remove old classes
    oldPage.classList.remove('slide-in-left', 'slide-in-right');
    newPage.classList.remove('slide-in-left', 'slide-in-right', 'slide-out-left', 'slide-out-right');
    
    // Slide out old page
    oldPage.classList.add(goingRight ? 'slide-out-left' : 'slide-out-right');
    
    // Prepare new page
    newPage.style.display = 'flex';
    newPage.style.opacity = '0';
    newPage.classList.add('active');
    
    // Small delay to allow CSS to register
    requestAnimationFrame(() => {
        newPage.style.opacity = '';
        newPage.classList.add(goingRight ? 'slide-in-right' : 'slide-in-left');
    });
    
    // Clean up after animation
    setTimeout(() => {
        oldPage.classList.remove('active', 'slide-out-left', 'slide-out-right');
        oldPage.style.display = '';
        newPage.classList.remove('slide-in-left', 'slide-in-right');
        isNavigating = false;
    }, 450);
    
    currentPageIdx = newIdx;
    
    // Update nav buttons
    document.querySelectorAll('nav button').forEach(b => b.classList.remove('active'));
    const btn = document.querySelector(`button[onclick="navigate('${id}')"]`);
    if (btn) {
        btn.classList.add('active');
        btn.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
    
    // Update page indicator
    updatePageIndicator(newIdx);

    // Trigger special page effects
    if (id === 'page-type') startTypewriter();
    if (id === 'page-gallery') { currentCard = 0; updateCardStack(); }
    if (id === 'page-vault' || id === 'page-promises') {
        const listName = id === 'page-vault' ? '.love-list li' : '.promise-list li';
        document.querySelectorAll(listName).forEach(li => {
            li.style.animation = 'none';
            li.offsetHeight;
            li.style.animation = '';
        });
    }
}

// Swipe between pages on main content area
(function initPageSwipe() {
    let startX = 0, startY = 0, swiping = false;
    const main = document.querySelector('main');
    
    main.addEventListener('touchstart', (e) => {
        // Don't interfere with card stack swiping or lightbox
        if (e.target.closest('#card-stack') || e.target.closest('.lightbox-overlay') || e.target.closest('nav')) return;
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        swiping = true;
    }, { passive: true });
    
    main.addEventListener('touchend', (e) => {
        if (!swiping) return;
        swiping = false;
        
        const endX = e.changedTouches[0].clientX;
        const endY = e.changedTouches[0].clientY;
        const dx = endX - startX;
        const dy = endY - startY;
        
        // Only horizontal swipe, must be > 60px and more horizontal than vertical
        if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) {
            if (dx < 0 && currentPageIdx < pageOrder.length - 1) {
                // Swipe left → next page
                navigate(pageOrder[currentPageIdx + 1], 'right');
            } else if (dx > 0 && currentPageIdx > 0) {
                // Swipe right → prev page
                navigate(pageOrder[currentPageIdx - 1], 'left');
            }
        }
    }, { passive: true });
})();

// ═══════════════════════════════════════════════════
// 9. MODAL
// ═══════════════════════════════════════════════════
function openModal(t) { 
    document.getElementById('modal-text').innerText = t; 
    document.getElementById('modal').classList.add('active');
    launchConfetti();
}
function closeModal() { 
    document.getElementById('modal').classList.remove('active'); 
}

// ═══════════════════════════════════════════════════
// 10. CONFETTI BURST
// ═══════════════════════════════════════════════════
function launchConfetti() {
    const colors = ['#e8607c', '#9b59b6', '#f0c27f', '#f7a8b8', '#c39bd3', '#f5d89a'];
    const count = isMobile ? 20 : 40;
    for (let i = 0; i < count; i++) {
        const piece = document.createElement('div');
        piece.className = 'confetti-piece';
        piece.style.left = (Math.random() * 100) + 'vw';
        piece.style.top = '-10px';
        piece.style.background = colors[Math.floor(Math.random() * colors.length)];
        piece.style.width = (4 + Math.random() * 10) + 'px';
        piece.style.height = (4 + Math.random() * 10) + 'px';
        piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
        piece.style.animationDuration = (2 + Math.random() * 2.5) + 's';
        piece.style.animationDelay = (Math.random() * 0.6) + 's';
        document.body.appendChild(piece);
        setTimeout(() => piece.remove(), 5000);
    }
}

// ═══════════════════════════════════════════════════
// 11. MEMORY CARD STACK
// ═══════════════════════════════════════════════════
const memoryCards = document.querySelectorAll('.memory-card');
const totalCards = memoryCards.length;
let currentCard = 0;

// Build dots
(function buildDots() {
    const dotsContainer = document.getElementById('stack-dots');
    for (let i = 0; i < totalCards; i++) {
        const dot = document.createElement('div');
        dot.className = 'stack-dot' + (i === 0 ? ' active' : '');
        dotsContainer.appendChild(dot);
    }
})();

function updateCardStack() {
    const dots = document.querySelectorAll('.stack-dot');
    memoryCards.forEach((card, i) => {
        card.className = 'memory-card';
        card.style.transform = '';
        card.style.opacity = '';
        
        const diff = i - currentCard;
        if (diff === 0) {
            card.classList.add('stack-active');
        } else if (diff === 1) {
            card.classList.add('stack-behind-1');
        } else if (diff === 2) {
            card.classList.add('stack-behind-2');
        } else {
            card.classList.add('stack-hidden');
        }
    });
    dots.forEach((d, i) => {
        d.classList.toggle('active', i === currentCard);
    });
    // Scroll active dot into view
    const activeDot = dots[currentCard];
    if (activeDot) activeDot.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
}
updateCardStack();

function stackNext() {
    if (currentCard >= totalCards - 1) {
        // Wrap around with a nice swipe animation
        const card = memoryCards[currentCard];
        card.classList.add('swipe-left');
        setTimeout(() => {
            currentCard = 0;
            updateCardStack();
        }, 400);
        return;
    }
    const card = memoryCards[currentCard];
    card.classList.add('swipe-left');
    setTimeout(() => {
        currentCard++;
        updateCardStack();
    }, 400);
}

function stackPrev() {
    if (currentCard <= 0) {
        const card = memoryCards[currentCard];
        card.classList.add('swipe-right');
        setTimeout(() => {
            currentCard = totalCards - 1;
            updateCardStack();
        }, 400);
        return;
    }
    const card = memoryCards[currentCard];
    card.classList.add('swipe-right');
    setTimeout(() => {
        currentCard--;
        updateCardStack();
    }, 400);
}

// Swipe gesture on card stack
(function() {
    let startX = 0, startY = 0, isDragging = false, dragCard = null, dragDeltaX = 0;
    const stack = document.getElementById('card-stack');
    
    function getActiveCard() {
        return memoryCards[currentCard];
    }
    
    stack.addEventListener('touchstart', (e) => {
        dragCard = getActiveCard();
        if (!dragCard) return;
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        isDragging = true;
        dragDeltaX = 0;
        dragCard.classList.add('swiping');
    }, { passive: true });
    
    stack.addEventListener('touchmove', (e) => {
        if (!isDragging || !dragCard) return;
        const dx = e.touches[0].clientX - startX;
        const dy = e.touches[0].clientY - startY;
        
        // Only horizontal swipe
        if (Math.abs(dx) > Math.abs(dy)) {
            e.preventDefault();
            dragDeltaX = dx;
            const rotate = dx * 0.08;
            dragCard.style.transform = `translateX(${dx}px) rotate(${rotate}deg)`;
            dragCard.style.opacity = Math.max(0.3, 1 - Math.abs(dx) / 300);
        }
    }, { passive: false });
    
    stack.addEventListener('touchend', () => {
        if (!isDragging || !dragCard) return;
        isDragging = false;
        dragCard.classList.remove('swiping');
        
        if (Math.abs(dragDeltaX) > 70) {
            // Swipe complete
            if (dragDeltaX < 0) stackNext();
            else stackPrev();
        } else {
            // snap back
            dragCard.style.transform = '';
            dragCard.style.opacity = '';
        }
        dragCard = null;
    }, { passive: true });
    
    // Mouse swipe for desktop
    stack.addEventListener('mousedown', (e) => {
        dragCard = getActiveCard();
        if (!dragCard) return;
        startX = e.clientX;
        isDragging = true;
        dragDeltaX = 0;
        dragCard.classList.add('swiping');
        e.preventDefault();
    });
    
    document.addEventListener('mousemove', (e) => {
        if (!isDragging || !dragCard) return;
        const dx = e.clientX - startX;
        dragDeltaX = dx;
        const rotate = dx * 0.08;
        dragCard.style.transform = `translateX(${dx}px) rotate(${rotate}deg)`;
        dragCard.style.opacity = Math.max(0.3, 1 - Math.abs(dx) / 300);
    });
    
    document.addEventListener('mouseup', () => {
        if (!isDragging || !dragCard) return;
        isDragging = false;
        dragCard.classList.remove('swiping');
        
        if (Math.abs(dragDeltaX) > 70) {
            if (dragDeltaX < 0) stackNext();
            else stackPrev();
        } else {
            dragCard.style.transform = '';
            dragCard.style.opacity = '';
        }
        dragCard = null;
    });
})();

// Double-tap to heart + open lightbox on hold
(function() {
    let lastTap = 0;
    const stack = document.getElementById('card-stack');
    
    stack.addEventListener('click', (e) => {
        const now = Date.now();
        if (now - lastTap < 300) {
            // Double tap - heart burst
            const card = memoryCards[currentCard];
            const heart = document.createElement('i');
            heart.className = 'fas fa-heart card-heart-burst';
            card.appendChild(heart);
            setTimeout(() => heart.remove(), 1000);
            launchConfetti();
            lastTap = 0;
        } else {
            lastTap = now;
            // Single tap after delay → open lightbox
            setTimeout(() => {
                if (lastTap !== 0 && Date.now() - lastTap >= 280) {
                    openLightbox(currentCard);
                    lastTap = 0;
                }
            }, 300);
        }
    });
})();

// ═══════════════════════════════════════════════════
// 11b. LIGHTBOX
// ═══════════════════════════════════════════════════
const galleryImages = [];
for (let i = 1; i <= 13; i++) galleryImages.push('images/' + i + '.jpeg');
let lightboxIdx = 0;

function openLightbox(idx) {
    lightboxIdx = idx;
    const overlay = document.getElementById('lightbox');
    const img = document.getElementById('lightbox-img');
    const counter = document.getElementById('lightbox-counter');
    img.src = galleryImages[idx];
    counter.textContent = (idx + 1) + ' / ' + galleryImages.length;
    overlay.classList.add('active');
}

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('active');
}

function lightboxNext() {
    lightboxIdx = (lightboxIdx + 1) % galleryImages.length;
    updateLightboxImage();
}

function lightboxPrev() {
    lightboxIdx = (lightboxIdx - 1 + galleryImages.length) % galleryImages.length;
    updateLightboxImage();
}

function updateLightboxImage() {
    const img = document.getElementById('lightbox-img');
    const counter = document.getElementById('lightbox-counter');
    img.style.opacity = '0';
    setTimeout(() => {
        img.src = galleryImages[lightboxIdx];
        counter.textContent = (lightboxIdx + 1) + ' / ' + galleryImages.length;
        img.style.opacity = '1';
    }, 150);
}

// Close lightbox on backdrop click
document.getElementById('lightbox').addEventListener('click', (e) => {
    if (e.target === document.getElementById('lightbox') || e.target.closest('.lightbox-img-wrap') === null && !e.target.closest('.lightbox-nav') && !e.target.closest('.lightbox-close')) {
        closeLightbox();
    }
});

// Keyboard navigation for lightbox
document.addEventListener('keydown', (e) => {
    const lb = document.getElementById('lightbox');
    if (!lb.classList.contains('active')) return;
    if (e.key === 'ArrowRight') lightboxNext();
    if (e.key === 'ArrowLeft') lightboxPrev();
    if (e.key === 'Escape') closeLightbox();
});

// Swipe gestures for lightbox (mobile)
(function() {
    let touchStartX = 0, touchEndX = 0;
    const lb = document.getElementById('lightbox');
    lb.addEventListener('touchstart', (e) => { touchStartX = e.changedTouches[0].screenX; }, { passive: true });
    lb.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) lightboxNext();
            else lightboxPrev();
        }
    }, { passive: true });
})();

// ═══════════════════════════════════════════════════
// 12. MUSIC PLAYER
// ═══════════════════════════════════════════════════
const songs = ["perfect.mp3", "letmedown.mp3", "baby.mp3"];
const titles = ["Perfect", "Let Me Down Slowly", "Baby"];
let sIdx = 0;
const audio = document.getElementById('main-audio');
const playBtn = document.getElementById('play-pause-btn');
const albumArt = document.getElementById('album-art');

function loadSong(idx) {
    sIdx = idx;
    audio.src = songs[sIdx];
    document.getElementById('song-title').innerText = titles[sIdx];
    document.querySelectorAll('.track').forEach((t, i) => {
        i === idx ? t.classList.add('active') : t.classList.remove('active');
    });
}

function playSpecificSong(idx) {
    loadSong(idx);
    audio.play();
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    albumArt.classList.add('playing');
}

function nextSong() {
    sIdx = (sIdx + 1) % songs.length;
    loadSong(sIdx);
    audio.play();
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    albumArt.classList.add('playing');
}

function prevSong() {
    sIdx = (sIdx - 1 + songs.length) % songs.length;
    loadSong(sIdx);
    audio.play();
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    albumArt.classList.add('playing');
}

playBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
        albumArt.classList.add('playing');
    } else {
        audio.pause();
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
        albumArt.classList.remove('playing');
    }
});

audio.addEventListener('ended', nextSong);

// ═══════════════════════════════════════════════════
// 13. TYPEWRITER LOVE LETTER
// ═══════════════════════════════════════════════════
const loveLetterText = 
`From the very first time we talked, something just felt different.\n
You are not just someone I like talking to — you are someone I cannot imagine not talking to.\n
Every late-night call, every random message, every single moment with you feels like a dream I never want to wake up from.\n
This distance? It is nothing. It is temporary. What I feel for you is permanent.\n
I built this little world for us — a place where miles do not exist and it is just you and me.\n
You are my favorite notification. My best part of every day. My peace in the chaos.\n
And I hope... one day... I get to hold your hand and tell you all of this in person.\n
Until then — this is for you.\n
— With everything I have ❤️`;

let typeIdx = 0;
let typeTimer = null;

function startTypewriter() {
    typeIdx = 0;
    const el = document.getElementById('typewriter-text');
    if (!el) return;
    el.innerHTML = '';
    clearInterval(typeTimer);
    
    typeTimer = setInterval(() => {
        if (typeIdx < loveLetterText.length) {
            const char = loveLetterText[typeIdx];
            if (char === '\n') {
                el.innerHTML += '<br>';
            } else {
                el.innerHTML += char;
            }
            typeIdx++;
        } else {
            clearInterval(typeTimer);
        }
    }, 40);
}

// ═══════════════════════════════════════════════════
// 14. DATE WHEEL SPINNER
// ═══════════════════════════════════════════════════
function spinDates() {
    const list = [
        "🎬 FaceTime Movie Night",
        "☕ Virtual Coffee + Deep Talk",
        "🎮 Game Night Together",
        "🎁 Surprise Delivery for You",
        "📖 Read the Same Book on Call",
        "🎨 Draw Each Other Blindfolded",
        "🌅 Watch Sunset on FaceTime",
        "🍳 Cook the Same Meal Together",
        "💌 Write Each Other Love Letters",
        "🎵 Create a Playlist for Each Other",
        "🧩 Online Puzzle Night",
        "📸 Send 10 Random Selfies"
    ];
    
    const el = document.getElementById('date-result');
    el.classList.add('date-spinning');
    let spins = 0;
    const maxSpins = 18;
    
    const spinInterval = setInterval(() => {
        el.innerText = list[Math.floor(Math.random() * list.length)];
        spins++;
        if (spins >= maxSpins) {
            clearInterval(spinInterval);
            el.classList.remove('date-spinning');
            el.innerText = list[Math.floor(Math.random() * list.length)];
            launchConfetti();
        }
    }, 90);
}

// ═══════════════════════════════════════════════════
// 15. QUESTION PAGE — "WILL YOU BE MINE?"
// ═══════════════════════════════════════════════════
function answerYes() {
    launchConfetti();
    launchConfetti();
    openModal('I knew you would say yes! 💖 You just made me the happiest person in the world. This is the beginning of our forever. 🌹✨');
}

// ═══════════════════════════════════════════════════
// 16. FORM SUBMIT HANDLER
// ═══════════════════════════════════════════════════
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function() {
        const btn = document.getElementById('send-btn');
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        setTimeout(() => launchConfetti(), 500);
    });
}

// ═══════════════════════════════════════════════════
// 17. ENTRANCE ANIMATION
// ═══════════════════════════════════════════════════
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 1.2s ease';
    requestAnimationFrame(() => {
        document.body.style.opacity = '1';
    });
    setTimeout(createShootingStar, 2000);
});
