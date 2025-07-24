// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Button Ripple Effect
    function createRipple(event) {
        const button = event.currentTarget;
        const ripple = button.querySelector('.btn-ripple');
        
        if (ripple) {
            ripple.remove();
        }
        
        const circle = document.createElement('div');
        circle.classList.add('btn-ripple');
        
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;
        
        const rect = button.getBoundingClientRect();
        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - rect.left - radius}px`;
        circle.style.top = `${event.clientY - rect.top - radius}px`;
        
        button.appendChild(circle);
    }
    
    // Add ripple effect to all buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', createRipple);
    });
    
    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
    
    // Smooth Scrolling for Navigation Links
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.glass-header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                
                // Update active link
                navLinks.forEach(navLink => navLink.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
    
    // Header Scroll Effect
    const header = document.querySelector('.glass-header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.background = 'rgba(15, 20, 25, 0.95)';
            header.style.backdropFilter = 'blur(30px)';
        } else {
            header.style.background = 'rgba(15, 20, 25, 0.8)';
            header.style.backdropFilter = 'blur(20px)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Intersection Observer for Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.mission-card, .action-item');
    animateElements.forEach(el => {
        observer.observe(el);
    });
    
    // Parallax Effect for Floating Orbs
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        const orbs = document.querySelectorAll('.floating-orb');
        orbs.forEach((orb, index) => {
            const speed = (index + 1) * 0.1;
            orb.style.transform = `translateY(${rate * speed}px)`;
        });
    });
    
    // Counter Animation for Stats
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start).toLocaleString() + '+';
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target.toLocaleString() + '+';
            }
        }
        
        updateCounter();
    }
    
    // Trigger counter animation when stats come into view
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                
                statNumbers.forEach(stat => {
                    const text = stat.textContent;
                    const number = parseInt(text.replace(/[^\d]/g, ''));
                    let target;
                    
                    if (text.includes('K')) {
                        target = number * 1000;
                    } else {
                        target = number;
                    }
                    
                    animateCounter(stat, target);
                });
                
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        statsObserver.observe(heroStats);
    }
    
    // Typing Effect for Hero Title
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.textContent = '';
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }
    
    // Enhanced Glass Card Interactions
    const glassCards = document.querySelectorAll('.glass-card, .mission-card');
    glassCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 40px 80px rgba(16, 185, 129, 0.4)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 20px 60px rgba(16, 185, 129, 0.3)';
        });
    });
    
    // Particle Animation for Background
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(52, 211, 153, 0.6);
            border-radius: 50%;
            pointer-events: none;
            left: ${Math.random() * 100}vw;
            top: 100vh;
            animation: particleFloat ${Math.random() * 3 + 2}s linear forwards;
        `;
        
        document.querySelector('.background-animation').appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            particle.remove();
        }, 5000);
    }
    
    // Add particle animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes particleFloat {
            to {
                transform: translateY(-100vh) translateX(${Math.random() * 200 - 100}px);
                opacity: 0;
            }
        }
        
        .animate-in {
            animation: fadeInUp 0.8s ease-out forwards;
        }
        
        .nav-menu.active {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: rgba(15, 20, 25, 0.95);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 0 0 20px 20px;
            padding: 2rem;
            gap: 1rem;
        }
        
        .nav-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .nav-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .nav-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
        
        @media (max-width: 768px) {
            .nav-menu {
                display: none;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Create particles periodically
    setInterval(createParticle, 500);
    
    // Progressive Enhancement for Reduced Motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (prefersReducedMotion.matches) {
        // Disable or reduce animations for users who prefer reduced motion
        const style = document.createElement('style');
        style.textContent = `
            *, *::before, *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Scroll Progress Indicator
    const scrollProgress = document.createElement('div');
    scrollProgress.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, var(--primary-green), var(--accent-green));
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(scrollProgress);
    
    window.addEventListener('scroll', function() {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = (scrollTop / scrollHeight) * 100;
        scrollProgress.style.width = scrollPercent + '%';
    });
    
    // Dynamic Background Color Based on Scroll
    window.addEventListener('scroll', function() {
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        const hue = 180 + (scrollPercent * 0.5); // Shift from blue-green to pure green
        
        document.body.style.background = `linear-gradient(135deg, 
            hsl(${hue}, 70%, 10%) 0%, 
            hsl(${hue + 20}, 60%, 15%) 50%, 
            hsl(${hue}, 70%, 10%) 100%)`;
    });
    
    // Easter Egg: Konami Code
    let konamiCode = [];
    const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA
    
    document.addEventListener('keydown', function(e) {
        konamiCode.push(e.keyCode);
        
        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }
        
        if (konamiCode.toString() === konamiSequence.toString()) {
            // Easter egg activation
            document.body.style.filter = 'hue-rotate(180deg)';
            setTimeout(() => {
                document.body.style.filter = 'none';
            }, 3000);
            
            // Create explosion of particles
            for (let i = 0; i < 50; i++) {
                setTimeout(createParticle, i * 50);
            }
        }
    });
    
    console.log('🌱 Cleanity Homepage Loaded! Ready to make a difference!');
});

// Global centralized data for the entire site
window.CleanityData = {
    stats: {
        members: {
            value: 200,
            suffix: '+',
            label: 'Members',
            labelAlternatives: ['Active Members']
        },
        citiesActive: {
            value: 5,
            suffix: '',
            label: 'Cities Active',
            labelAlternatives: []
        },
        citiesDocumented: {
            value: 50,
            suffix: '+',
            label: 'Cities Documented',
            labelAlternatives: []
        },
        eventsOrganized: {
            value: 20,
            suffix: '+',
            label: 'Events Organized',
            labelAlternatives: []
        },
        trashCollected: {
            value: 2.5,
            suffix: 'M',
            label: 'Pieces of Trash',
            labelAlternatives: ['Pieces Collected', 'Waste Collected']
        },
        studentsEducated: {
            value: 1200,
            suffix: '',
            label: 'Students Educated',
            labelAlternatives: []
        },
        communityPartners: {
            value: 15,
            suffix: '',
            label: 'Community Partners',
            labelAlternatives: ['Partnerships']
        },
        photosCaptured: {
            value: 500,
            suffix: '+',
            label: 'Photos Captured',
            labelAlternatives: []
        },
        hoursRecorded: {
            value: 10,
            suffix: 'K+',
            label: 'Hours Recorded',
            labelAlternatives: []
        },
        livesImpacted: {
            value: 1,
            suffix: 'M+',
            label: 'Lives Impacted',
            labelAlternatives: []
        }
    },

    // Format number for display
    formatStat: function(statKey) {
        const stat = this.stats[statKey];
        if (!stat) return '';
        
        let formattedValue = stat.value;
        if (stat.value >= 1000 && !stat.suffix.includes('K') && !stat.suffix.includes('M')) {
            formattedValue = (stat.value / 1000).toFixed(1) + 'K';
        } else {
            formattedValue = stat.value.toString();
        }
        
        return formattedValue + stat.suffix;
    },

    // Update a stat value
    updateStat: function(statKey, newValue) {
        if (this.stats[statKey]) {
            this.stats[statKey].value = newValue;
            this.refreshAllStats();
            this.saveToLocalStorage();
        }
    },

    // Refresh all stat displays on the current page
    refreshAllStats: function() {
        // Update all elements with data-stat attribute
        const statElements = document.querySelectorAll('[data-stat]');
        statElements.forEach(element => {
            const statKey = element.getAttribute('data-stat');
            if (this.stats[statKey]) {
                const className = element.className;
                
                // Handle different types of elements
                if (className.includes('circle-number') || className.includes('stat-number')) {
                    // For pure number displays, replace entire content
                    element.textContent = this.formatStat(statKey);
                } else {
                    // For text with embedded numbers, replace the number part
                    const textContent = element.textContent;
                    
                    // Different regex patterns for different stat types
                    let numberPattern;
                    if (statKey === 'trashCollected') {
                        numberPattern = /[\d.,]+(\s+)?million|[\d.,]+[M]/gi;
                    } else if (statKey === 'studentsEducated') {
                        numberPattern = /[\d.,]+(\s+students)?/gi;
                    } else if (statKey === 'communityPartners') {
                        numberPattern = /\b\d+\b/g;
                    } else {
                        numberPattern = /[\d.,]+[KM\+]*/g;
                    }
                    
                    const matches = textContent.match(numberPattern);
                    if (matches && matches.length > 0) {
                        let newText = textContent;
                        
                        // Replace the number based on stat type
                        if (statKey === 'trashCollected') {
                            newText = textContent.replace(numberPattern, this.formatStat(statKey).toLowerCase() + ' million');
                        } else {
                            newText = textContent.replace(matches[0], this.formatStat(statKey));
                        }
                        
                        element.textContent = newText;
                    }
                }
            }
        });
    },

    // Save to localStorage
    saveToLocalStorage: function() {
        localStorage.setItem('cleanityData', JSON.stringify(this.stats));
    },

    // Load from localStorage
    loadFromLocalStorage: function() {
        const saved = localStorage.getItem('cleanityData');
        if (saved) {
            try {
                const savedData = JSON.parse(saved);
                // Merge saved data with current structure
                Object.keys(savedData).forEach(key => {
                    if (this.stats[key] && savedData[key].value !== undefined) {
                        this.stats[key].value = savedData[key].value;
                    }
                });
            } catch (e) {
                console.warn('Failed to load saved data:', e);
            }
        }
    }
};

// Keyboard shortcut for data management access
let typedKeys = '';
let keyTimeout = null;

// Initialize data management system
document.addEventListener('DOMContentLoaded', function() {
    // Load saved data
    window.CleanityData.loadFromLocalStorage();
    
    // Initialize stats on page load
    setTimeout(() => {
        window.CleanityData.refreshAllStats();
    }, 100);

    // Set up keyboard shortcut listener
    setupKeyboardShortcut();
});

function setupKeyboardShortcut() {
    document.addEventListener('keydown', function(e) {
        // Ignore if user is typing in an input field
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable) {
            return;
        }
        
        // Add the typed key to our string
        typedKeys += e.key.toLowerCase();
        
        // Clear timeout if it exists
        if (keyTimeout) {
            clearTimeout(keyTimeout);
        }
        
        // Reset typed keys after 2 seconds of no typing
        keyTimeout = setTimeout(() => {
            typedKeys = '';
        }, 2000);
        
        // Check if "rumet" was typed
        if (typedKeys.includes('rumet')) {
            typedKeys = ''; // Reset
            openDataManagementModal();
            
            // Show a fun message
            console.log('🎉 Rumet Asan detected! Opening data management panel...');
        }
        
        // Keep only last 10 characters to prevent memory issues
        if (typedKeys.length > 10) {
            typedKeys = typedKeys.slice(-10);
        }
    });
}

function openDataManagementModal() {
    // Create modal if it doesn't exist
    if (!document.getElementById('dataManagementModal')) {
        createDataManagementModal();
    }
    
    const modal = document.getElementById('dataManagementModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Populate current values
    populateDataManagementForm();
}

function createDataManagementModal() {
    const modalHTML = `
        <div class="form-modal" id="dataManagementModal">
            <div class="modal-overlay"></div>
            <div class="modal-content">
                <div class="glass-card data-management-card">
                    <div class="form-header">
                        <h2 class="form-title">📊 Site İstatistik Yönetimi</h2>
                        <button class="close-btn" id="closeDataModal">×</button>
                    </div>
                    
                    <form class="data-management-form" id="dataManagementForm">
                        <div class="form-section">
                            <h3 class="section-title">Temel İstatistikler</h3>
                            
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="members" class="form-label">Üye Sayısı</label>
                                    <input type="number" id="members" name="members" class="form-input" min="0">
                                    <div class="input-underline"></div>
                                </div>
                                
                                <div class="form-group">
                                    <label for="citiesActive" class="form-label">Aktif Şehir Sayısı</label>
                                    <input type="number" id="citiesActive" name="citiesActive" class="form-input" min="0">
                                    <div class="input-underline"></div>
                                </div>
                            </div>
                            
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="eventsOrganized" class="form-label">Organize Edilen Etkinlik</label>
                                    <input type="number" id="eventsOrganized" name="eventsOrganized" class="form-input" min="0">
                                    <div class="input-underline"></div>
                                </div>
                                
                                <div class="form-group">
                                    <label for="trashCollected" class="form-label">Toplanan Çöp (Milyon)</label>
                                    <input type="number" id="trashCollected" name="trashCollected" class="form-input" min="0" step="0.1">
                                    <div class="input-underline"></div>
                                </div>
                            </div>
                            
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="studentsEducated" class="form-label">Eğitim Alan Öğrenci</label>
                                    <input type="number" id="studentsEducated" name="studentsEducated" class="form-input" min="0">
                                    <div class="input-underline"></div>
                                </div>
                                
                                <div class="form-group">
                                    <label for="communityPartners" class="form-label">Topluluk Ortağı</label>
                                    <input type="number" id="communityPartners" name="communityPartners" class="form-input" min="0">
                                    <div class="input-underline"></div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="form-section">
                            <h3 class="section-title">Galeri İstatistikleri</h3>
                            
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="citiesDocumented" class="form-label">Belgelenen Şehir</label>
                                    <input type="number" id="citiesDocumented" name="citiesDocumented" class="form-input" min="0">
                                    <div class="input-underline"></div>
                                </div>
                                
                                <div class="form-group">
                                    <label for="photosCaptured" class="form-label">Çekilen Fotoğraf</label>
                                    <input type="number" id="photosCaptured" name="photosCaptured" class="form-input" min="0">
                                    <div class="input-underline"></div>
                                </div>
                            </div>
                            
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="hoursRecorded" class="form-label">Kaydedilen Saat (Bin)</label>
                                    <input type="number" id="hoursRecorded" name="hoursRecorded" class="form-input" min="0">
                                    <div class="input-underline"></div>
                                </div>
                                
                                <div class="form-group">
                                    <label for="livesImpacted" class="form-label">Etkilenen Yaşam (Milyon)</label>
                                    <input type="number" id="livesImpacted" name="livesImpacted" class="form-input" min="0" step="0.1">
                                    <div class="input-underline"></div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="form-actions">
                            <button type="button" class="btn btn-secondary" id="cancelDataBtn">
                                <span>İptal</span>
                            </button>
                            <button type="submit" class="btn btn-primary">
                                <span>Kaydet ve Güncelle</span>
                                <div class="btn-ripple"></div>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Add event listeners
    const modal = document.getElementById('dataManagementModal');
    const overlay = modal.querySelector('.modal-overlay');
    const closeBtn = document.getElementById('closeDataModal');
    const cancelBtn = document.getElementById('cancelDataBtn');
    const form = document.getElementById('dataManagementForm');
    
    closeBtn.addEventListener('click', closeDataManagementModal);
    cancelBtn.addEventListener('click', closeDataManagementModal);
    overlay.addEventListener('click', closeDataManagementModal);
    
    // Prevent modal close when clicking inside modal content
    modal.querySelector('.modal-content').addEventListener('click', function(e) {
        e.stopPropagation();
    });
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        saveDataManagementForm();
    });
}

function populateDataManagementForm() {
    const form = document.getElementById('dataManagementForm');
    if (!form) return;
    
    const data = window.CleanityData.stats;
    
    form.members.value = data.members.value;
    form.citiesActive.value = data.citiesActive.value;
    form.eventsOrganized.value = data.eventsOrganized.value;
    form.trashCollected.value = data.trashCollected.value;
    form.studentsEducated.value = data.studentsEducated.value;
    form.communityPartners.value = data.communityPartners.value;
    form.citiesDocumented.value = data.citiesDocumented.value;
    form.photosCaptured.value = data.photosCaptured.value;
    form.hoursRecorded.value = data.hoursRecorded.value;
    form.livesImpacted.value = data.livesImpacted.value;
}

function saveDataManagementForm() {
    const form = document.getElementById('dataManagementForm');
    const formData = new FormData(form);
    
    // Update all values
    window.CleanityData.updateStat('members', parseInt(formData.get('members')));
    window.CleanityData.updateStat('citiesActive', parseInt(formData.get('citiesActive')));
    window.CleanityData.updateStat('eventsOrganized', parseInt(formData.get('eventsOrganized')));
    window.CleanityData.updateStat('trashCollected', parseFloat(formData.get('trashCollected')));
    window.CleanityData.updateStat('studentsEducated', parseInt(formData.get('studentsEducated')));
    window.CleanityData.updateStat('communityPartners', parseInt(formData.get('communityPartners')));
    window.CleanityData.updateStat('citiesDocumented', parseInt(formData.get('citiesDocumented')));
    window.CleanityData.updateStat('photosCaptured', parseInt(formData.get('photosCaptured')));
    window.CleanityData.updateStat('hoursRecorded', parseInt(formData.get('hoursRecorded')));
    window.CleanityData.updateStat('livesImpacted', parseFloat(formData.get('livesImpacted')));
    
    // Show success message
    showDataManagementSuccess();
    
    // Close modal
    closeDataManagementModal();
}

function closeDataManagementModal() {
    const modal = document.getElementById('dataManagementModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function showDataManagementSuccess() {
    const successNotification = document.createElement('div');
    successNotification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--primary-green);
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: 0 10px 30px rgba(16, 185, 129, 0.3);
        z-index: 1001;
        animation: slideInRight 0.3s ease-out;
    `;
    
    successNotification.innerHTML = `
        <strong>✓ İstatistikler başarıyla güncellendi!</strong><br>
        Tüm sayfalardaki veriler güncellenmiştir.
    `;
    
    document.body.appendChild(successNotification);
    
    setTimeout(() => {
        successNotification.remove();
    }, 5000);
}