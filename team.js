// Team Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Team member card interactions
    const memberCards = document.querySelectorAll('.member-card');
    
    memberCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add hover effect to other cards
            memberCards.forEach(otherCard => {
                if (otherCard !== card) {
                    otherCard.style.opacity = '0.7';
                }
            });
        });
        
        card.addEventListener('mouseleave', function() {
            // Remove hover effect from other cards
            memberCards.forEach(otherCard => {
                otherCard.style.opacity = '1';
            });
        });
        
        // Click to view member details
        card.addEventListener('click', function() {
            const memberName = this.querySelector('.member-name').textContent;
            const memberRole = this.querySelector('.member-role').textContent;
            
            console.log(`Viewing profile for ${memberName} - ${memberRole}`);
            // This would typically open a modal or navigate to a profile page
        });
    });
    
    // Social link interactions
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const linkType = this.textContent;
            console.log(`Opening ${linkType} profile`);
            // This would typically open the actual social media profile
        });
    });
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '50px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, observerOptions);
    
    // Observe team members for scroll animations
    memberCards.forEach(card => {
        observer.observe(card);
    });
    
    // Floating elements animation
    const floatingElements = document.querySelectorAll('.element');
    floatingElements.forEach((element, index) => {
        element.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
            this.style.transform = 'scale(1.2) rotate(15deg)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
            this.style.transform = '';
        });
    });
    
    // Team stats animation (for leadership cards)
    const statNumbers = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStatNumber(entry.target);
            }
        });
    }, observerOptions);
    
    statNumbers.forEach(number => {
        statsObserver.observe(number);
    });
    
    function animateStatNumber(element) {
        const finalText = element.textContent;
        const numericValue = parseInt(finalText.replace(/[^\d]/g, ''));
        const suffix = finalText.replace(/[\d]/g, '');
        
        if (numericValue > 0) {
            const duration = 1500;
            const startTime = Date.now();
            
            function updateNumber() {
                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const currentNumber = Math.floor(numericValue * progress);
                
                element.textContent = currentNumber + suffix;
                
                if (progress < 1) {
                    requestAnimationFrame(updateNumber);
                }
            }
            
            updateNumber();
        }
    }
    
    // Region badge interactions
    const regionBadges = document.querySelectorAll('.region-badge');
    regionBadges.forEach(badge => {
        badge.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
        });
        
        badge.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
});