// Join Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
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
    
    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll('.benefit-item');
    animatedElements.forEach(element => {
        observer.observe(element);
    });
    
    // Add loading animation for iframe
    const iframe = document.querySelector('.form-card iframe');
    if (iframe) {
        iframe.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        // Add loading state
        iframe.style.opacity = '0';
        iframe.style.transition = 'opacity 0.5s ease';
    }
});