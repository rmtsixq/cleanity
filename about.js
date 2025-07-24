// About Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all animatable elements
    const animateOnScroll = document.querySelectorAll('.mission-text-card, .timeline-item, .value-card, .impact-card');
    animateOnScroll.forEach(el => {
        el.classList.add('fade-in-on-scroll');
        observer.observe(el);
    });

    // Add staggered animation to timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.2}s`;
    });

    // Add staggered animation to value cards
    const valueCards = document.querySelectorAll('.value-card');
    valueCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });

    // Add staggered animation to impact cards
    const impactCards = document.querySelectorAll('.impact-card');
    impactCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.15}s`;
    });

    // Animate progress circles when they come into view
    const progressCircles = document.querySelectorAll('.circle-progress');
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const circle = entry.target;
                const progress = circle.getAttribute('data-progress') || 75;
                
                // Animate the conic gradient
                circle.style.background = `conic-gradient(
                    var(--primary-green) 0deg ${progress * 3.6}deg,
                    var(--surface-green) ${progress * 3.6}deg 360deg
                )`;
                
                // Add animation class
                circle.classList.add('animate-progress');
            }
        });
    }, observerOptions);

    progressCircles.forEach(circle => {
        progressObserver.observe(circle);
    });

    // Add CSS for progress animation
    const style = document.createElement('style');
    style.textContent = `
        .animate-progress {
            animation: progressSpin 2s ease-out;
        }
        
        @keyframes progressSpin {
            0% {
                background: conic-gradient(
                    var(--primary-green) 0deg 0deg,
                    var(--surface-green) 0deg 360deg
                ) !important;
            }
        }
    `;
    document.head.appendChild(style);

    // Counter animation for stats
    const counters = document.querySelectorAll('.stat-number, .circle-number');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = counter.textContent;
                const isDecimal = target.includes('.');
                const suffix = target.replace(/[0-9.]/g, '');
                const number = parseFloat(target.replace(/[^0-9.]/g, ''));
                
                if (!counter.classList.contains('animated')) {
                    counter.classList.add('animated');
                    animateCounter(counter, 0, number, 2000, suffix, isDecimal);
                }
            }
        });
    }, observerOptions);

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });

    function animateCounter(element, start, end, duration, suffix = '', isDecimal = false) {
        let current = start;
        const increment = (end - start) / (duration / 16);
        
        const timer = setInterval(() => {
            current += increment;
            
            if (current >= end) {
                current = end;
                clearInterval(timer);
            }
            
            let displayValue = isDecimal ? current.toFixed(1) : Math.floor(current);
            element.textContent = displayValue + suffix;
        }, 16);
    }

    // Smooth scroll for internal links
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Button ripple effect
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = this.querySelector('.btn-ripple');
            if (ripple) {
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = size + 'px';
                ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                
                ripple.classList.remove('animate');
                setTimeout(() => ripple.classList.add('animate'), 10);
            }
        });
    });

    // Add CSS for button ripple animation
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        .btn-ripple.animate {
            animation: ripple 0.6s linear;
        }
    `;
    document.head.appendChild(rippleStyle);

    // Parallax effect for floating orbs
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const orbs = document.querySelectorAll('.floating-orb');
        
        orbs.forEach((orb, index) => {
            const speed = 0.5 + (index * 0.1);
            orb.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // Mobile navigation toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    });
});