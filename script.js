// GSAP Timeline untuk animasi
let tl = gsap.timeline();

// Audio setup
const bgMusic = document.getElementById('bgMusic');
let musicStarted = false;

// Pesan typewriter
const birthdayMessage = "Hari ini ulang tahun ataa yeyy! 🎉 Semoga tahun baru ini membawa kebahagiaan yang tak terbatas yaa cintaa, kesehatan jugaa, dan semua impian yang ataa dambakan ituu jadii nyataa suatu saat nantii! 🌟 Kamu adalah orang yang hebat di mata akuu, kamu layak mendapatkan nyaa! 💖 Selamat ulang tahun, semoga panjang umur yaa! 🎂✨";

// Fungsi untuk memulai musik
function startMusic() {
    if (!musicStarted) {
        bgMusic.volume = 0.5;
        bgMusic.play().catch(e => console.log('Audio autoplay blocked'));
        musicStarted = true;
    }
}

// Fungsi untuk membuat confetti
function createConfetti() {
    const confettiContainer = document.querySelector('.confetti-container');
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.animationDelay = Math.random() * 3 + 's';
        confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
        confettiContainer.appendChild(confetti);
        
        // Hapus confetti setelah animasi selesai
        setTimeout(() => {
            if (confetti.parentNode) {
                confetti.parentNode.removeChild(confetti);
            }
        }, 5000);
    }
}

// Animasi chat intro
function animateChatIntro() {
    const chatContainer = document.querySelector('.chat-container');
    const chatMessages = document.querySelectorAll('.chat-message');
    
    // Tampilkan container chat
    gsap.to(chatContainer, { duration: 1, opacity: 1, scale: 1, ease: "back.out(1.7)" });
    
    // Animasi pesan satu per satu
    chatMessages.forEach((message, index) => {
        gsap.to(message, {
            duration: 0.8,
            opacity: 1,
            x: 0,
            delay: (index + 1) * 1.5,
            ease: "back.out(1.7)"
        });
    });
    
    // Auto start setelah chat selesai
    setTimeout(() => {
        startMusic();
        setTimeout(() => {
            showSection('mainWish');
            startMainSequence();
        }, 2000);
    }, 9000);
    
    createConfetti();
}

// Animasi wave text
function animateWaveText() {
    const waveText = document.querySelector('.wave-text');
    const waveSpans = document.querySelectorAll('.wave-text span');
    
    // Tampilkan container wave text terlebih dahulu
    gsap.to(waveText, { duration: 0.5, opacity: 1 });
    
    // Animasi setiap huruf
    gsap.fromTo(waveSpans, 
        { y: 50, opacity: 0 },
        { 
            y: 0, 
            opacity: 1, 
            duration: 0.8, 
            stagger: 0.3, 
            ease: "back.out(1.7)",
            onComplete: () => {
                waveText.classList.add('animate');
            }
        }
    );
}

// Animasi note
function animateNote() {
    const noteContainer = document.querySelector('.note-container');
    const typewriterElement = document.querySelector('.typewriter-note');
    
    // Tampilkan note container
    gsap.to(noteContainer, { duration: 1, opacity: 1, rotation: 1, scale: 1, ease: "back.out(1.7)" });
    
    // Mulai typewriter tanpa cursor
    setTimeout(() => {
        typeWriterNote(typewriterElement, birthdayMessage, 60);
    }, 1000);
}

// Efek typewriter untuk note (tanpa cursor)
function typeWriterNote(element, text, speed = 60) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            // Setelah selesai mengetik, beri jeda 5 detik
            console.log('Typewriter finished, waiting 5 seconds...');
        }
    }
    type();
}

// Animasi surprise
function animateSurprise() {
    const surpriseText = document.querySelector('.surprise-text');
    const surpriseCard = document.querySelector('.surprise-card');
    
    // Animasi teks surprise
    gsap.to(surpriseText, { duration: 1, opacity: 1, y: 0, ease: "back.out(1.7)" });
    
    // Animasi card surprise
    setTimeout(() => {
        gsap.to(surpriseCard, { 
            duration: 1.2, 
            opacity: 1, 
            scale: 1, 
            rotation: 0,
            ease: "back.out(1.7)" 
        });
    }, 1000);
    
    // Animasi popup emojis
    setTimeout(() => {
        animatePopupEmojis();
    }, 2500);
}

// Animasi popup emojis
function animatePopupEmojis() {
    const popupEmojis = document.querySelectorAll('.popup-emoji');
    
    popupEmojis.forEach((emoji, index) => {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        
        emoji.style.left = x + 'px';
        emoji.style.top = y + 'px';
        
        gsap.fromTo(emoji,
            { scale: 0, rotation: 0, opacity: 0 },
            { 
                scale: 1.5, 
                rotation: 360, 
                opacity: 1, 
                duration: 1,
                delay: index * 0.2,
                ease: "back.out(1.7)",
                onComplete: () => {
                    gsap.to(emoji, {
                        scale: 0,
                        opacity: 0,
                        duration: 0.5,
                        delay: 2
                    });
                }
            }
        );
    });
}

// Animasi galeri foto polaroid
function animateGallery() {
    const polaroids = document.querySelectorAll('.polaroid');
    
    gsap.fromTo(polaroids,
        { y: 100, opacity: 0, scale: 0.8 },
        { 
            y: 0, 
            opacity: 1, 
            scale: 1, 
            duration: 1.2, 
            stagger: 0.4, 
            ease: "back.out(1.7)",
            onComplete: () => {
                // Tambah efek floating ringan
                polaroids.forEach((polaroid, index) => {
                    gsap.to(polaroid, {
                        y: Math.sin(index) * 5,
                        duration: 2 + index * 0.5,
                        repeat: -1,
                        yoyo: true,
                        ease: "sine.inOut"
                    });
                });
            }
        }
    );
}

// Fungsi untuk berpindah section dengan transisi smooth
function showSection(sectionId) {
    const currentSection = document.querySelector('section:not(.hidden)');
    const nextSection = document.getElementById(sectionId);
    
    if (currentSection) {
        // Fade out current section
        gsap.to(currentSection, {
            duration: 0.8,
            opacity: 0,
            y: -50,
            ease: "power2.inOut",
            onComplete: () => {
                currentSection.classList.add('hidden');
                
                // Show and fade in next section
                nextSection.classList.remove('hidden');
                gsap.fromTo(nextSection, 
                    { opacity: 0, y: 50 },
                    { duration: 0.8, opacity: 1, y: 0, ease: "power2.inOut" }
                );
            }
        });
    } else {
        // First section, just show
        nextSection.classList.remove('hidden');
        gsap.fromTo(nextSection, 
            { opacity: 0, y: 50 },
            { duration: 0.8, opacity: 1, y: 0, ease: "power2.inOut" }
        );
    }
    
    // Scroll ke atas
    window.scrollTo(0, 0);
}

// Fungsi utama setelah chat intro
function startMainSequence() {
    setTimeout(() => {
        animateWaveText();
        
        // Tunggu wave text selesai baru tampilkan note
        setTimeout(() => {
            animateNote();
        }, 6000);
        
        setTimeout(() => {
            showSection('gallery');
            animateGallery();
        }, 30000);
        
        setTimeout(() => {
            showSection('surprise');
            createConfetti();
            animateSurprise();
            
        }, 40000);
        
        setTimeout(() => {
            showSection('ending');
            animateFinalChat();
            
        }, 47000);
        
        setTimeout(() => {
            showSection('finalWords');
            animateFinalWords();
            
        }, 54000);
        
        setTimeout(() => {
            showSection('videoSection');
            animateVideoSection();
            
        }, 61000);
        
    }, 1000);
}

// Animasi chat akhir
function animateFinalChat() {
    const finalChatContainer = document.querySelector('.final-chat-container');
    const finalChatMessages = document.querySelectorAll('.final-chat-message');
    
    // Tampilkan container chat
    gsap.to(finalChatContainer, { duration: 1, opacity: 1, scale: 1, ease: "back.out(1.7)" });
    
    // Animasi pesan satu per satu
    finalChatMessages.forEach((message, index) => {
        gsap.to(message, {
            duration: 0.8,
            opacity: 1,
            y: 0,
            delay: (index + 1) * 1.2,
            ease: "back.out(1.7)"
        });
    });
    
    // Efek akhir chat
    setTimeout(() => {
        gsap.to(finalChatContainer, { 
            duration: 2, 
            scale: 1.05, 
            boxShadow: '0 0 30px rgba(255,255,255,0.5)', 
            ease: "power2.out" 
        });
    }, 6000);
}

// Animasi final words
function animateFinalWords() {
    const finalWordsContainer = document.querySelector('.final-words-container');
    
    // Tampilkan container
    gsap.to(finalWordsContainer, { duration: 1, opacity: 1, scale: 1, ease: "back.out(1.7)" });
    
    // Efek akhir dengan background gelap
    setTimeout(() => {
        gsap.to('body', { 
            duration: 4, 
            backgroundColor: 'rgba(0,0,0,0.8)', 
            ease: "power2.inOut" 
        });
        
        gsap.to(finalWordsContainer, { 
            duration: 3, 
            scale: 1.1, 
            textShadow: '0 0 40px rgba(255,255,255,0.9)', 
            delay: 1,
            ease: "power2.out" 
        });
    }, 3000);
}

// Animasi video section
function animateVideoSection() {
    const videoContainer = document.querySelector('.video-container');
    const video = document.getElementById('birthdayVideo');
    
    // Pause background music
    if (bgMusic) {
        bgMusic.pause();
    }
    
    gsap.fromTo(videoContainer,
        { y: 50, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 1.5, ease: "back.out(1.7)" }
    );
    
    // Auto play video after animation
    setTimeout(() => {
        if (video) {
            video.play().catch(e => console.log('Video autoplay blocked'));
            
            // Listen for video end
            video.addEventListener('ended', () => {
                setTimeout(() => {
                    showSection('thankYou');
                    animateThankYou();
                }, 2000);
            });
        }
    }, 1500);
    
    // Efek glow pada container
    setTimeout(() => {
        gsap.to(videoContainer, {
            boxShadow: '0 0 30px rgba(147, 51, 234, 0.3)',
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    }, 2000);
}

// Animasi thank you section
function animateThankYou() {
    const thankYouContainer = document.querySelector('.thank-you-container');
    
    gsap.fromTo(thankYouContainer,
        { y: 50, opacity: 0, scale: 0.8 },
        { y: 0, opacity: 1, scale: 1, duration: 2, ease: "back.out(1.7)" }
    );
}

// Hover effects untuk polaroid
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.querySelectorAll('.polaroid').forEach(polaroid => {
            polaroid.addEventListener('mouseenter', () => {
                gsap.to(polaroid, { 
                    duration: 0.3, 
                    scale: 1.05, 
                    rotation: 0, 
                    z: 50,
                    ease: "power2.out" 
                });
            });
            
            polaroid.addEventListener('mouseleave', () => {
                const originalRotation = polaroid.classList.contains('polaroid-1') ? -6 : 
                                       polaroid.classList.contains('polaroid-2') ? 3 : 6;
                gsap.to(polaroid, { 
                    duration: 0.3, 
                    scale: 1, 
                    rotation: originalRotation,
                    z: 0,
                    ease: "power2.out" 
                });
            });
        });
    }, 1000);
});

// Efek klik untuk emoji dancing
document.querySelectorAll('.dancing-emojis span').forEach(emoji => {
    emoji.addEventListener('click', () => {
        gsap.to(emoji, { 
            duration: 0.5, 
            scale: 1.5, 
            rotation: 360, 
            ease: "back.out(1.7)",
            onComplete: () => {
                gsap.to(emoji, { duration: 0.3, scale: 1, rotation: 0 });
            }
        });
    });
});

// Animasi saat halaman dimuat
window.addEventListener('load', () => {
    animateChatIntro();
});

// Tambah sparkle effect secara random
function addSparkles() {
    const sparkleContainer = document.body;
    
    setInterval(() => {
        const sparkle = document.createElement('div');
        sparkle.innerHTML = '✨';
        sparkle.className = 'sparkle';
        sparkle.style.position = 'fixed';
        sparkle.style.left = Math.random() * window.innerWidth + 'px';
        sparkle.style.top = Math.random() * window.innerHeight + 'px';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.zIndex = '5';
        
        sparkleContainer.appendChild(sparkle);
        
        setTimeout(() => {
            if (sparkle.parentNode) {
                sparkle.parentNode.removeChild(sparkle);
            }
        }, 2000);
    }, 3000);
}

// Mulai efek sparkle
addSparkles();

// Deteksi mobile untuk optimasi
const isMobile = window.innerWidth <= 768;
if (isMobile) {
    // Kurangi jumlah confetti untuk performa mobile
    document.querySelector('.confetti-container').style.display = 'none';
}